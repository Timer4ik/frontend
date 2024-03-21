<template>
    <BaseHeader hide-go-back :title="`Баннеры`"/>

    <UiStack style="height: 100%;" flex-direction="column" gap="2">
        <UiCard style="height: 100%;" padding="4">
            <UiStack flex-direction="column" gap="2">
                <UiStack flex-direction="column" gap="2">
                    <form @submit="onSubmit" gap="2">
                        <UiStack flex-direction="column" gap="3">
                            <VFormComponent :field="images" />
                            <UiStack>
                                <UiButton>Сохранить</UiButton>
                            </UiStack>
                        </UiStack>
                    </form>
                </UiStack>
            </UiStack>
        </UiCard>
    </UiStack>
</template>

<script setup>
import { useForm } from 'vee-validate';
import api from '~/api';


const {
    data: banner, get
} = await useApi({
    name: "banner.getAll",
    params: {
        extends: "image"
    }

});
await get()
const form = useForm()

const images = ref({
    type: "multiple-photo-loader",
    name: "images",
    modelValue: banner.value.map(i => ({ id: i.image.id, path: i.image.path })),
    convertTo: (images) => images.map(i => i.id).join(),
    bind: {
        async upload(image) {
            const formData = new FormData()

            formData.append("image", image)

            const { data } = await api.image.create({
                data: formData,
            })

            return { id: data.id, path: data.path }
        },
        label: "Выберите фотографии для баннеров",
    }
})

const { $toast } = useNuxtApp()

const onSubmit = form.handleSubmit(async (values) => {
    try {
        await api.banner.update({
            data: values
        })

        useRouter().push("/posts")
    } catch (error) {
        $toast.error(error.data)
    }
});

</script>