<template>
    <BaseHeader :title="`Создание уведомления`">
        <template #actions>
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
                            <UiButton @click="validate">Сохранить</UiButton>
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

const form = useForm()
const validate = () => {
    return form.validate()
}

const isSendingToOneUser = ref(false)


const title = ref({
    type: "text",
    name: "title",
    rules: "required|max:255",

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
const recipient_id = ref({
    type: "select",
    name: "recipient_id",
    rules: "required",
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
const role = ref({
    type: "select",
    name: "role",
    rules: "required",
    convertTo: (item) => item?.id,

    bind: {
        title: "name",
        label: "Выберите роль",
        options: [{ id: null, value: "Всем ролям" }, ...useCollections().roles].filter(item => item.id !== 'admin'),
        message: "Обязательное*"
    }
})
const type = ref({
    type: "select",
    name: "type",
    rules: "required",
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
    convertTo: (item) => item?.id,

    bind: {
        title: "name",
        label: "Выберите статус уведомления",
        options: useCollections().alertStatuses,
        message: "Обязательное*"
    }
})

async function fetchCountries(_, searchString, limit, page) {
    return await api.country.getAll({
        params: {
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => [{ id: null, value: "Всем странам" }, ...resp.data])
}

async function fetchUsers(_, searchString, limit, page) {
    return await api.user.getAll({
        params: {
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

const onSubmit = form.handleSubmit(async ({recipient_id,...values}) => {

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

    await api.alert.create({
        data: data
    })

    useRouter().push("/notifications")
});


</script>