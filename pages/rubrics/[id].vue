<template>
    <BaseHeader :title="`Рубрика: №${rubric?.id} ${rubric?.name}`">
        <template #actions>
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

const {
    data: rubric,
    meta,
    loading,
    get,
} = await useApi({
    name: "rubric.get",
    requestParams: {
        id: useRoute().params.id,
    },
});

await get()

const form = useForm()

const name = ref({
    type: "text",
    modelValue: rubric.value.name,
    name: "name",
    rules: "required|min:6",

    bind: {
        label: "Заголовок",
        placeholder: "Введите заголовок новости",
        message: "Обязательное*"
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    await api.rubric.update({
        id: useRoute().params.id,
        data: {
            ...values,
        }
    })

    useRouter().push("/rubrics")
});

</script>