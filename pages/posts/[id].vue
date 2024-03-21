<template>
    <BaseHeader :title="`Новость: №${post?.id} ${post?.title}`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/posts/add')">Создать новость</UiButton>
        </template>
    </BaseHeader>


    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <VFormComponent :field="title" />
                        <VFormComponent :field="content" />
                        <VFormComponent :field="rubric_id" />
                        <VFormComponent :field="district_id" />
                        <VFormComponent :field="main_image_id" />
                        <!-- <VFormComponent :field="images" /> -->
                        <VFormComponent :field="source" />
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
    data: post,
    meta,
    loading,
    get,
} = await useApi({
    name: "post.get",
    requestParams: {
        id: useRoute().params.id,
    },
    params: {
        limit: 7,
        extends: "user,images.image,main_image,rubric,district",
    }
});

await get()

const form = useForm()

const title = ref({
    type: "text",
    modelValue: post.value.title,
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
    modelValue: post.value.content,
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
    modelValue: post.value.rubric_id,
    name: "rubric_id",
    rules: "required",
    bind: {
        hideMessage: true,
        label: "Выберите рубрику",
        modelValueIsNumber: true,
        limit: 10,
        closeAfterSelect: true,
        options: await getRubricsOptions()
    }
})

const district_id = ref({
    type: "select",
    modelValue: { id: post.value.district?.id, value: post.value.district?.name },
    name: "district_id",
    rules: "required",
    convertTo: (d) => d?.id,
    bind: {
        hideMessage: true,
        label: "Выберите город",
        debounceMs: 100,
        limit: 20,
        searchFn: async (_ctx, search, limit, page) => {
            return await getDistrictsOptions({
                limit,
                page,
                'filterLIKE[name]': search
            })
        }
    }
})

const main_image_id = ref({
    type: "photo-loader",
    name: "main_image_id",
    modelValue: post.value.main_image_id ? { id: post.value.main_image.id, path: post.value.main_image.path }:null,
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

const source = ref({
    type: "text",
    modelValue: post.value.source,
    name: "source",
    rules: "required",

    bind: {
        label: "Ссылка на источник",
        placeholder: "Введите ссылку на источник",
        message: "Обязательное*"
    }
})

const onSubmit = form.handleSubmit(async ({ ...values }) => {

    await api.post.update({
        id: useRoute().params.id,
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