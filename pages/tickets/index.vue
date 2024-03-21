<template>
    <BaseHeader hide-go-back title="Все заявки">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/tickets/add')">Создать заявку</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiRow gap="3">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[full_name]']" :field="full_name" />
                </UiCol>
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterEQ[status_cid]']" :field="status_cid" />
                </UiCol>
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterEQ[ticket_type_cid]']" :field="ticket_type_cid" />
                </UiCol>
            </UiRow>
            <Table :cols="cols" title="Все заявки" :data="tickets" :loading="loading" :filterForm="filterForm"
                :meta="meta" />
        </UiCard>
    </UiStack>
</template>

<script setup>
import TableActions from '@/components/table/table-actions.vue';
import api from '~/api';

const { filterForm, filters } = useFilters({
    defFilters: [
        {
            name: "filterLIKE[full_name]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterEQ[status_cid]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterEQ[ticket_type_cid]",
            prePareKey: () => '',
            prepare: true
        },
    ],
    extends: "status,ticket_type",
    sort: "created_at",
    page: 1,
});

const {
    data: tickets,
    meta,
    loading,
    get,
} = await useApi({
    name: "tickets.getAll",
    params: { extends: "status,ticket_type", limit: 20 },
    filters: filters,
});

const full_name = ref({
    type: "text",
    name: "full_name",

    bind: {
        label: "Заголовок заявки",
        placeholder: "Введите заголовок заявки",
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
        options: await getTicketStatuses()
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
        options: await getTicketTypes()
    }
})
const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/tickets/${id}`)
            },
            async onDelete(id) {
                await api.tickets.delete({ id })
                await get()
            },
            id: 1
        }),
        width: 1
    },
    {
        name: "id",
        width: 90,
        title: "ID",
    },
    {
        name: "full_name",
        width: 200,
        title: "Фио",
        resizable: true
    },
    {
        name: "created_at",
        width: 150,
        title: "Дата создания",
        convertTo(val) {
            return new Date(val).toLocaleDateString('ru-RU')
        },
        resizable: true
    },
    {
        name: "email",
        width: 150,
        title: "E-mail",
        resizable: true
    },
    {
        name: "phone",
        title: "Телфон",
        width: 150,
        resizable: true
    },
    {
        name: "communiction_method",
        title: "Способ связи",
        width: 150,
        resizable: true
    },
    {
        name: "link_from",
        title: "Перешёл из ссылки",
        width: 150,
        resizable: true
    },
    {
        name: "ticket_type.value",
        title: "Тип заявки",
        width: 150,
        resizable: true
    },
    {
        name: "status.value",
        title: "Статус заявки",
        width: 150,
        resizable: true
    },
]

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