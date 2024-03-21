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
                                <VFormComponent :field="key" />
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

const selectedTab = ref(0)

const { values, handleSubmit } = useForm()

const {
    data: siteInfo,
    meta,
    loading,
    get,
} = await useApi({
    name: "siteInfo.get",
    requestParams: {
        id: useRoute().params.id,
    },
});
await get()

function getSiteInfoType(type) {
    if (type == 'checkbox')
        return "checkbox"

    return 'text'
}
function getSiteInfoValueByType(type,value) {
    if (type == 'checkbox') {
        return value == 'true' ? true: false
    }

    return value
}

const title = ref({
    type: "text",
    modelValue: siteInfo.value.title,
    name: "title",
    rules: "required",

    bind: {
        style:"opacity:0.8;",
        disabled:true,
        label: "Название настройки",
    }
})
const text = ref({
    type: getSiteInfoType(siteInfo.value.type),
    modelValue: getSiteInfoValueByType(siteInfo.value.type,siteInfo.value.text),
    name: "text",

    bind: {
        label: "Значение настройки",
        placeholder: "Введите значение настройки",
        message: "Обязательное*"
    }
})
const key = ref({
    type: "text",
    modelValue: siteInfo.value.key,
    name: "key",
    rules: "required",

    bind: {
        style:"opacity:0.8;",
        disabled:true,
        label: "Уникальное название настройки",
    }
})

const onSubmit = handleSubmit(async (values) => {
    await api.siteInfo.update({
        id: useRoute().params.id,
        data: {
            ...values,
            text: String(values.text)
        }
    })

    useRouter().push("/settings")

})
</script>
