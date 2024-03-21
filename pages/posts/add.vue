<template>
    <BaseHeader :title="`Создание новости`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/posts/add')">Создать новость</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiRow flex-direction="column" gap="3">
                        <UiCol col="6">
                            <VFormComponent :field="title" />
                        </UiCol>
                        <UiCol col="6">
                            <VFormComponent :field="rubric_id" />
                        </UiCol>
                        <UiCol col="6">
                            <VFormComponent :field="district_id" />
                        </UiCol>
                        <UiCol col="6">
                            <VFormComponent :field="source" />
                        </UiCol>
                        <UiCol col="12">
                            <VFormComponent :field="main_image_id" />
                        </UiCol>
                        <UiCol col="12">
                            <VFormComponent :field="content" />
                        </UiCol>
                        <UiCol>
                            <UiButton>Сохранить</UiButton>
                        </UiCol>
                    </UiRow>
                </form>
            </UiStack>
        </UiCard>
    </UiStack>
</template>

<script setup>
import { useImage } from '#imports';
import { useForm } from 'vee-validate';
import api from '~/api';

const form = useForm()

const title = ref({
    type: "text",
    modelValue: "",
    name: "title",
    rules: "required|min:6",

    bind: {
        label: "Заголовок",
        placeholder: "Введите заголовок новости",
        message: "Обязательное*"
    }
})

const content = ref({
    type: "textarea",
    modelValue: "",
    name: "content",
    rules: "required|min:100",

    bind: {
        label: "Текст статьи",
        placeholder: "Введите текст статьи",
        message: "Обязательное*"
    }
})

const rubric_id = ref({
    type: "select",
    modelValue: null,
    name: "rubric_id",
    rules: "required",
    bind: {
        label: "Выберите рубрику",
        modelValueIsNumber: true,
        limit: 10,
        closeAfterSelect: true,
        options: await getRubricsOptions()
    }
})

const district_id = ref({
    type: "select",
    modelValue: null,
    name: "district_id",
    rules: "required",
    bind: {
        label: "Выберите город",
        modelValueIsNumber: true,
        debounceMs: 200,
        limit: 20,
        searchFn: async (_ctx, search, limit, page) => {
            return await getDistrictsOptions({
                limit,
                page,
                'filterLIKE[name]': search,
            })
        }
    }
})

const main_image_id = ref({
    type: "photo-loader",
    name: "main_image_id",
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
        label: "Выберите фото статьи",
    }
})

const images = ref({
    type: "multiple-photo-loader",
    name: "images",

    bind: {
        label: "Выберите фото статьи",
    }
})

const source = ref({
    type: "text",
    name: "source",
    rules: "required",

    bind: {
        label: "Ссылка на источник",
        placeholder: "Введите ссылку на источник",
        message: "Обязательное*"
    }
})

const onSubmit = form.handleSubmit(async ({ ...values }) => {


    await api.post.create({
        data: {
            ...values,
        }
    })

    useRouter().push("/posts")
});


// Функции для облегчения жизни
async function getRubricsOptions(params) {
    const { data } = await api.rubric.getAll({
        params: params
    })

    return data.map(item => ({ id: item.id, value: item.name, item }))
}
async function getDistrictsOptions(params) {
    const { data } = await api.district.getAll({
        params: params
    })

    return data.map(item => ({ id: item.id, value: item.name, item }))
}
</script>