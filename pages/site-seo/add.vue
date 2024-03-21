<template>
    <BaseHeader :title="`Создание seo`">
        <template #actions>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <UiRow flex-direction="column" gap="3">
                            <UiCol col="12">
                                <VFormComponent :field="title" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="text" />
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

const form = useForm()

const title = ref({
    type: "text",
    name: "title",
    rules: "required",
    
    bind: {
        label: "Заголовок",
        placeholder: "Введите заголовок",
        message: "Обязательное*"
    }
})

const text = ref({
    type: "textarea",
    name: "text",
    rules: "required",

    bind: {
        label: "Текст",
        modelValueIsNumber: true,
        limit: 10,
    }
})

const onSubmit = form.handleSubmit(async (values) => {

    await api.siteSeo.create({
        id: useRoute().params.id,
        data: {
            ...values,
        }
    })

    useRouter().push("/site-seo")
});


</script>