<template>
    <BaseHeader title="Новый пользователь" />

    <UiStack flex-direction="column" gap="3" margin-top="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit">
                    <UiStack flex-direction="column" gap="3">
                        <UiTabs>
                            <UiTabsItem v-for="item in [
                                {
                                    id: 0,
                                    name: 'Основная информация'
                                },
                                {
                                    id: 1,
                                    name: 'Дополнительная информация'
                                }
                            ]" :active="item.id == selectedTab" @click="selectedTab = item.id">{{ item.name }}
                            </UiTabsItem>
                        </UiTabs>
                        <VFormComponent :field="isConfirm"
                            :errorMessage="!isConfirm.modelValue ? 'Подтвердите аккаунт, чтобы пользователь получил доступы' : ''" />

                        <UiStack flex-direction="column" gap="3" v-show="selectedTab == 0">
                            <UiRow gap="3">
                                <UiCol col="6">
                                    <VFormComponent :field="name" />
                                </UiCol>
                                <UiCol col="6">
                                    <VFormComponent :field="role" />
                                </UiCol>
                            </UiRow>
                            <VFormComponent :field="image_id" />
                        </UiStack>
                        <UiStack flex-direction="column" gap="3" v-show="selectedTab == 1">
                            <UiRow gap="3">
                                <UiCol col="6">
                                    <VFormComponent :field="staffs" />
                                </UiCol>
                                <UiCol col="6">
                                    <VFormComponent :field="company_id" />
                                </UiCol>
                                <UiCol col="6">
                                    <VFormComponent :field="email" />
                                </UiCol>
                                <UiCol col="6">
                                    <VFormComponent :field="phone" />
                                </UiCol>
                            </UiRow>
                        </UiStack>

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

const selectedTab = ref(0)

const {
    data: user,
    meta,
    loading,
    get,
} = await useApi({
    name: "user.get",
    requestParams: {
        id: useRoute().params.id,
    },
    params: {
        limit: 7,
        extends: "image,company.staffs,company.owner",
    }
});

await get()

const form = useForm()

const name = ref({
    type: "text",
    modelValue: user.value?.name,
    name: "name",
    rules: "required|min:6",

    bind: {
        label: "ФИО",
        placeholder: "Введите ФИО пользователя",
        message: "Обязательное*"
    }
})


const role = ref({
    type: "select",
    modelValue: useCollections().roles.find(i => i.id == user.value?.role),
    name: "role",
    convertTo: (val) => val?.id,
    rules: "required",
    bind: {
        label: "Выберите роль",
        closeAfterSelect: true,
        options: useCollections().roles,
        message: "Обязательное*"
    }
})

const isConfirm = ref({
    type: "checkbox",
    modelValue: user.value?.is_confirm,
    name: "is_confirm",
    bind: {
        label: "Аккаунт подтверждён?",
        message: "Аккаунт подтверждён"
    }
})

const image_id = ref({
    type: "photo-loader",
    name: "image_id",
    convertTo: (image) => image?.id,

    bind: {
        async upload(image) {
            const formData = new FormData()

            formData.append("image", image)

            const { data } = await api.image.create({
                data: formData,
            })

            return { id: data.id, path: data.path }
        },
        hideMessage: true,
        label: "Выберите аватарку профиля",
    }
})

const staffs = ref({
    type: "multiple-select",
    name: "staffs",
    modelValue: user.value?.company?.staffs.map(i => ({
        id: i.id,
        value: i.name,
        item: i
    })),
    convertTo: (values) => values?.map(i => i.id),

    bind: {
        limit: 20,
        debounceMs: 500,
        searchFn: async (_ctx, search, limit, page) => {
            const { data } = await api.user.getAll({
                params: {
                    page,
                    limit,
                    'filterLIKE[name]': search
                }
            })
            return data.map(item => ({ id: item.id, value: item.name, item }))
        },
        label: "Сотрудники",
    }
})

const company_id = ref({
    type: "select",
    name: "company_id",
    modelValue: {
        id: user.value?.company?.owner.id,
        value: user.value?.company?.owner.name
    },

    bind: {
        limit: 20,
        modelValueIsNumber: true,
        debounceMs: 500,
        searchFn: async (_ctx, search, limit, page) => {
            return await getCompanies({
                limit,
                page,
                extends: "owner",
                'filterLIKE[name]': search
            })
        },
        label: "Компании",
    }
})

const phone = ref({
    type: "text",
    name: "phone",
    rules: "required",
    convertTo: (val) => `${clearPhone(val, +7)}`,
    bind: {
        maska: maskaPhone,
        label: "Телефон",
        placeholder: "Введите телефон пользователя",
        message: "Обязательное*"
    }
})


const email = ref({
    type: "text",
    modelValue: user.value?.email,
    name: "email",
    rules: "required|email",
    bind: {
        label: "E-mail",
        placeholder: "Введите e-mail пользователя",
        message: "Обязательное*"
    }
})

const onSubmit = form.handleSubmit(async ({ company_id, staffs, ...values }) => {

    const data = values

    if (data.role.role == 'realtor') {
        data.company_id = company_id
    } else if (['agency', 'builder'].includes(data.role.role)) {
        data.staffs = staffs
    }

    await api.user.update({
        id: useRoute().params.id,
        data: data
    })

    useRouter().push("/users")
});


// Функции для облегчения жизни
async function getCompanies(params) {
    const { data } = await api.company.getAll({
        params: params
    })

    return data.map(item => ({ id: item.id, value: item.owner.name, item }))
}
</script>