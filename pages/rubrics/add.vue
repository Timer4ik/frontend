<template>
    <BaseHeader :title="`Создание рубрики`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/rubrics/add')">Создать рубрику</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2" style="height: 100%;">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <VFormComponent :field="name" />
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

const form = useForm()

const name = ref({
    type: "text",
    modelValue: "",
    name: "name",
    rules: "required|min:6",

    bind: {
        label: "Заголовок",
        placeholder: "Введите заголовок рубрики",
        message: "Обязательное*"
    }
})


const onSubmit = form.handleSubmit(async (values) => {

    await api.rubric.create({
        data: {
            ...values,
        }
    })

    useRouter().push("/rubrics")
});


</script>