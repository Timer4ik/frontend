<template>
    <BaseHeader hide-go-back :title="`Сео футера`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/site-seo/add')">Создать сео текст</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiRow gap="3">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[title]']" :field="title" />
                </UiCol>
            </UiRow>
            <Table :cols="cols" title="Всё сео" :data="seoFooter" :loading="loading" :meta="meta"
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
    data: seoFooter,
    meta,
    loading,
    get,
} = await useApi({
    name: "siteSeo.getAll",
    params: { limit: 20 },
    filters: filters,
});

const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/site-seo/${id}`)
            },
            async onDelete(id) {
                await api.siteSeo.delete({ id })
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
        name: "text",
        title: "Текст",
        width: 650,
        resizable: true
    },
]
</script>