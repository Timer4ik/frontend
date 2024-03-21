<template>
    <UiStack align-items="center" justify-content="center" class="auth-page">
        <UiCard class="auth-page-modal" padding="5">
            <UiStack margin-top="5" flex-direction="column" gap="4" padding="5">
                <UiTypography font-size="7" font-weight="bold">Авторизация</UiTypography>
                <form @submit="onSubmit">
                    <UiStack flex-direction="column" gap="4">
                        <VFormComponent :field="email" />
                        <VFormComponent :field="password" />
                        <UiButton>
                            Войти
                        </UiButton>
                    </UiStack>
                </form>
            </UiStack>
        </UiCard>
    </UiStack>
</template>

<script setup>
import { useForm } from 'vee-validate';
import api from '~/api';

const { login } = useAuth()
const form = useForm()

definePageMeta({
    layout: ""
})

const email = ref({
    type: "text",
    modelValue: "",
    name: "email",
    rules: "required",

    bind: {
        label: "E-mail",
        placeholder: "Введите e-mail",
        message: "Обязательное*"
    }
})

const password = ref({
    type: "text",
    modelValue: "",
    name: "password",
    rules: "required",

    bind: {
        label: "Пароль",
        placeholder: "Введите пароль",
        message: "Обязательное*"
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    await login(values)
    useRouter().push("/tickets")
});

</script>

<style lang="scss">
.auth-page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &-modal {

        min-width: 600px;

    }
}
</style>