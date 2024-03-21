<template>
    <BaseHeader :title="`Seo страницы /${sitePage?.path}`">

    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiTypography font-size="7" font-weight="bold"></UiTypography>
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <UiRow flex-direction="column" gap="3">
                            <UiCol col="6">
                                <VFormComponent :field="title" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="robots" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="description" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="keywords" />
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
    data: sitePage,
    meta,
    loading,
    get,
} = await useApi({
    name: "sitePage.get",
    requestParams: {
        id: useRoute().params.id,
    },
});

await get()

const form = useForm()

const title = ref({
    type: "text",
    modelValue: sitePage.value?.title,
    name: "title",

    convertTo: (v) => v ?? '',
    bind: {
        label: "title",
        placeholder: "Введите title",
        message: "Обязательное*"
    }
})

const description = ref({
    type: "textarea",
    name: "description",
    modelValue: sitePage.value?.description,
    convertTo: (v) => v ?? '',
    bind: {
        label: "description",
        limit: 10,
    }
})

const keywords = ref({
    type: "textarea",
    name: "keywords",
    modelValue: sitePage.value?.keywords,
    convertTo: (v) => v ?? '',
    bind: {
        label: "keywords",
        limit: 10,
    }
})
const robots = ref({
    type: "text",
    name: "robots",
    modelValue: sitePage.value?.robots,
    convertTo: (v) => v ?? '',
    bind: {
        label: "robots",
        limit: 10,
    }
})

const onSubmit = form.handleSubmit(async (values) => {

    await api.sitePage.update({
        id: useRoute().params.id,
        data: {
            ...values,
        }
    })

    useRouter().push("/site-page")
});


</script>