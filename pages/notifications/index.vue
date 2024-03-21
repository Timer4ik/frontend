<template>
    <BaseHeader hide-go-back :title="`Уведомления`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/notifications/add')">Создать уведомление</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiRow gap="3">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[title]']" :field="title" />
                </UiCol>
            </UiRow>
            <Table :cols="cols" title="Все уведомления" :data="alerts" :loading="loading" :meta="meta"
                :filter-form="filterForm" />
        </UiCard>
    </UiStack>
</template>

<script setup>
import TableActions from '@/components/table/table-actions.vue';
import api from '~/api';

const title = ref({
    type: "text",
    name: "title",

    bind: {
        label: "Заголовок заявки",
        placeholder: "Введите заголовок заявки",
    }
})

const { filterForm, filters } = useFilters({
    defFilters: [
        {
            name: "filterLIKE[title]",
            prePareKey: () => '',
            prepare: true
        }
    ],
    sort: "created_at",
    page: 1,
});

const {
    data: alerts,
    meta,
    loading,
    get,
} = await useApi({
    name: "alert.getAll",
    params: { limit: 20, extends: "user" },
    filters: filters,
});

const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/notifications/${id}`)
            },
            async onDelete(id) {
                await api.alert.delete({ id })
                await get()
            },
            id: 1
        }),
        width: 1,
    },
    {
        name: "id",
        width: 90,
        title: "ID",
        resizable: true
    },
    {
        name: "title",
        title: "Заголовок",
        width: 150,
        resizable: true
    },
    {
        name: "description",
        title: "Описание",
        width: 250,
        resizable: true
    },
    {
        name: "role",
        title: "Роль",
        width: 150,
        resizable: true
    },
    {
        name: "type",
        title: "Тип",
        width: 150,
        resizable: true
    },
    {
        name: "status",
        title: "Статус",
        width: 150,
        resizable: true
    },
    {
        name: "user.name",
        title: "Пользователь",
        width: 150,
        resizable: true
    },
]
</script>