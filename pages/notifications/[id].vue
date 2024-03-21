<template>
    <BaseHeader :title="`Уведомление #${alert.id}`">
        <template #actions>
            <UiStack gap="3" class="header-btns">
                <UiButton :style="alert.status=='sended'?`opacity:0.5`:''" :disabled="alert.status=='sended'" color="danger" @click="sendNotifications">Отправить уведомления</UiButton>
            </UiStack>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <UiRow flex-direction="column" gap="3">
                            <UiCol col="4">
                                <VFormComponent :field="title" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="type" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="status" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="description" />
                            </UiCol>
                            <UiCol col="12">
                                <UiCheckbox label="Конкретному пользователю?" v-model="isSendingToOneUser" />
                            </UiCol>

                            <template v-if="!isSendingToOneUser" col="12">
                                <UiCol col="6">
                                    <VFormComponent v-if="!isSendingToAllRoles" :field="role" />
                                </UiCol>
                                <UiCol col="6">
                                    <VFormComponent v-if="!isSendingToAllCountry" :field="country_id" />
                                </UiCol>
                            </template>
                            <UiCol v-else col="12">
                                <VFormComponent :field="recipient_id" />
                            </UiCol>
                        </UiRow>
                        <UiStack>
                            <UiButton>Сохранить</UiButton>
                        </UiStack>
                    </UiStack>
                </form>
            </UiStack>
        </UiCard>
    </UiStack>
</template>

<script setup>
import { useForm } from 'vee-validate';
import api from '~/api';

const {
    data: alert,
    meta,
    loading,
    get,
} = await useApi({
    name: "alert.get",
    params: { extends: "country,recipient" },
    requestParams: {
        id: useRoute().params.id,
    },
});
await get()

const form = useForm()

const isSendingToOneUser = ref(!!alert.value?.recipient_id)


const title = ref({
    type: "text",
    name: "title",
    rules: "required|max:255",
    modelValue: alert.value?.title,
    bind: {
        label: "Заголовок",
        placeholder: "Введите заголовок",
        message: "Обязательное*"
    }
})

const description = ref({
    type: "textarea",
    name: "description",
    rules: "required|max:255",
    modelValue: alert.value?.description,
    bind: {
        label: "Текст уведомления",
        placeholder: "Введите текст уведомления",
        message: "Обязательное*"
    }
})
const country_id = ref({
    type: "select",
    name: "country_id",
    rules: "required",
    modelValue: {
        id: alert.value?.country?.id ?? null,
        value: alert.value?.country?.name ?? 'Всем странам',
        item: alert.value?.country
    },
    convertTo: (item) => item?.id,

    bind: {
        debounceMs: 800,
        title: "name",
        label: "Выберите страну",
        limit: 20,
        debounceMs: 500,
        searchFn: fetchCountries,
        message: "Обязательное*"
    }
})
const role = ref({
    type: "select",
    name: "role",
    rules: "required",
    modelValue: [{ id: null, value: "Всем ролям" }, ...useCollections().roles].find(item => item.id == alert.value?.role),
    convertTo: (item) => item?.id,

    bind: {
        title: "name",
        label: "Выберите роль",
        options: [{ id: null, value: "Всем ролям" }, ...useCollections().roles].filter(item => item.id !== 'admin'),
        message: "Обязательное*"
    }
})
const recipient_id = ref({
    type: "select",
    name: "recipient_id",
    rules: "required",
    modelValue: {
        id: alert.value?.recipient?.id,
        value: alert.value?.recipient?.name,
        item: alert.value?.recipient
    },
    convertTo: (item) => item?.id,

    bind: {
        title: "name",
        label: "Выберите пользователя",
        searchFn: fetchUsers,
        message: "Обязательное*",
        debounceMs: 800,
        limit: 20,
        debounceMs: 500,
    }
})
const type = ref({
    type: "select",
    name: "type",
    rules: "required",
    modelValue: useCollections().alertTypes.find(item => item.id == alert.value?.type),
    convertTo: (item) => item?.id,

    bind: {
        title: "name",
        label: "Выберите тип уведомления",
        options: useCollections().alertTypes,
        message: "Обязательное*"
    }
})
const status = ref({
    type: "select",
    name: "status",
    rules: "required",
    modelValue: useCollections().alertStatuses.find(item => item.id == alert.value?.status),
    convertTo: (item) => item?.id,

    bind: {
        title: "name",
        label: "Выберите статус уведомления",
        options: useCollections().alertStatuses,
        message: "Обязательное*"
    }
})

async function fetchUsers(_, searchString, limit, page) {
    return await api.user.getAll({
        params: {
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

async function fetchCountries(_, searchString, limit, page) {
    return await api.country.getAll({
        params: {
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => [{ id: null, value: "Всем странам" }, ...resp.data])
}

const onSubmit = form.handleSubmit(async ({ role, country_id, recipient_id, ...values }) => {

    const data = { ...values }
    if (!isSendingToOneUser.value) {
        data.country_id = (country_id?.value ? country_id?.id : country_id)
        data.role = (role?.value ? role?.id : role)
    }
    if (!recipient_id) {
        data.recipient_id = null
    }
    else {
        data.recipient_id = recipient_id
    }

    
    await api.alert.update({
        id: useRoute().params.id,
        data: data
    })
    

    useRouter().push("/notifications")
});

const sendNotifications = async () => {

    const savedAlert = await api.alert.get({
        id: alert.value.id
    })

    await api.alertUsers.create({
        data: {
            alert_id: savedAlert.data.id,
            ...savedAlert.data
        }
    })
    await api.alert.update({
        id: useRoute().params.id,
        data: {
            ...savedAlert.data,
            status:'sended'
        }
    })

    await get()
};

</script>