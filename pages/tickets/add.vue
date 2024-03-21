<template>
    <BaseHeader :title="`Создание заявки`">
        <template #actions>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <UiRow flex-direction="column" gap="3">
                            <UiCol col="6">
                                <VFormComponent :field="full_name" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="email" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="phone" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="communiction_method" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="ticket_type_cid" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="status_cid" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="text" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="purpose" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="link_from" />
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

const full_name = ref({
    type: "text",
    modelValue: "",
    name: "full_name",
    rules: "required|min:6",

    bind: {
        label: "Фио пользователя",
        placeholder: "Введите фио пользователя",
        message: "Обязательное*"
    }
})

const phone = ref({
    type: "text",
    name: "phone",
    rules: "required",
    convertTo: (val) => `${clearPhone(val,+7)}`,
    bind: {
        maska: maskaPhone,
        label: "Телефон",
        placeholder: "Введите телефон пользователя",
        message: "Обязательное*"
    }
})


const email = ref({
    type: "text",
    name: "email",
    rules: "required|email",
    bind: {
        label: "E-mail",
        placeholder: "Введите e-mail пользователя",
        message: "Обязательное*"
    }
})
const purpose = ref({
    type: "text",
    name: "purpose",
    bind: {
        label: "Цель обращения",
        placeholder: "Введите цель обращения",
    }
})

const communiction_method = ref({
    type: "text",
    name: "communiction_method",
    rules: "required",
    bind: {
        label: "Способ связи",
        placeholder: "Введите способ связи",
        message: "Обязательное*"
    }
})
const link_from = ref({
    type: "text",
    name: "link_from",
    rules: "required",
    bind: {
        label: "Заявка создана на странице",
        placeholder: "Введите с какой страницы была создана заявка",
        message: "Обязательное*"
    }
})

const ticket_type_cid = ref({
    type: "select",
    name: "ticket_type_cid",
    bind: {
        label: "Тип заявки",
        modelValueIsNumber: true,
        limit: 10,
        closeAfterSelect: true,
        options: await getTicketTypes(),
        hideMessage: true
    }
})
const status_cid = ref({
    type: "select",
    name: "status_cid",
    bind: {
        label: "Статус заявки",
        modelValueIsNumber: true,
        limit: 10,
        closeAfterSelect: true,
        options: await getTicketStatuses(),
        hideMessage: true
    }
})
const text = ref({
    type: "textarea",
    name: "text",
    bind: {
        label: "Текст заявки",
        modelValueIsNumber: true,
        limit: 10,
        closeAfterSelect: true,
        options: await getTicketStatuses(),
        hideMessage: true
    }
})

const onSubmit = form.handleSubmit(async (values) => {

    await api.tickets.create({
        data: {
            ...values,
        }
    })

    useRouter().push("/tickets")
});


// Функции для облегчения жизни
async function getTicketStatuses() {
    const { data } = await api.collections.getAll({
        params: {
            "filterEQ[type]": 'ticket_statuses'
        }
    })

    return data.map(item => ({ id: item.id, value: item.value, item }))
}

async function getTicketTypes() {
    const { data } = await api.collections.getAll({
        params: {
            "filterEQ[type]": 'ticket_types'
        }
    })

    return data.map(item => ({ id: item.id, value: item.value, item }))
}
</script>