<template>
    <BaseHeader hide-go-back :title="`Настройки сайта`">
        <template #actions>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2" style="height: 100%;">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <UiRow gap="2">
                            <UiCol col="6">
                                <VFormComponent :field="title" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="text" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="key" />
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

const selectedTab = ref(0)

const { values, handleSubmit } = useForm()

const formData = ref({
    site_phone: '', site_email: '', site_description: '', site_seo: '', site_footer: '', 123: ''
})
const formModel = useNamedObjects([

    {
        name: "site_phone",
        type: "text",
        col: "6",
        label: "Номер телефона",
        message: "Обязательное*",
        placeholder: "Введите поле ввода",
        rules: "required",
        maska: "+7 ### ### ## ##"
    },

    {
        name: "site_email",
        type: "text",
        col: "6",
        label: "E-mail",
        message: "Обязательное*",
        placeholder: "Введите email",
        rules: "email|required"
    },

    {
        name: "site_description",
        type: "textarea",
        col: "6",
        label: "Описание сайта",
        placeholder: "Введите описание сайта",
    },

    {
        name: "site_seo",
        type: "textarea",
        col: "6",
        label: "Сео сайта",
    },

    {
        name: "site_footer",
        type: "text",
        col: "6",
        label: "Текст футера",
        placeholder: "Введите текст для футера",
    },
])

const title = ref({
    type: "text",
    modelValue: "",
    name: "title",
    rules: "required",

    bind: {
        label: "Название настройки",
        placeholder: "Введите название настройки",
        message: "Обязательное*"
    }
})
const text = ref({
    type: "text",
    modelValue: "",
    name: "text",
    rules: "required",

    bind: {
        label: "Значение настройки",
        placeholder: "Введите значение настройки",
        message: "Обязательное*"
    }
})
const key = ref({
    type: "text",
    modelValue: "",
    name: "key",
    rules: "required",

    bind: {
        label: "Уникальное название настройки",
        placeholder: "Введите уникальное название настройки",
        message: "Обязательное*"
    }
})

const onSubmit = handleSubmit(async (values) => {
    await api.siteInfo.create({
        data: {
            ...values,
        }
    })

    useRouter().push("/settings")

})
</script>
