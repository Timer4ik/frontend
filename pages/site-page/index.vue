<template>
    <BaseHeader hide-go-back :title="`Сео страниц`">
        <!-- <template #actions>
            <UiButton color="primary" @click="useRouter().push('/site-page/add')">Создать сео страницы</UiButton>
        </template> -->
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiRow gap="3">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[title]']" :field="title" />
                </UiCol>
            </UiRow>
            <Table :cols="cols" title="Все сёо страниц" :data="seoFooter" :loading="loading" :meta="meta"
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
    name: "sitePage.getAll",
    params: { limit: 20 },
    filters: filters,
});

const cols = [
    {
        name: "actions",
        renderComponent: (item) => h(TableActions, {
            hideDelete:true,
            onUpdate(id) {
                useRouter().push(`/site-page/${item.path}`)
            },
            id: 1
        }),
        width: 1,
    },
    {
        name: "path",
        title: "url страницы",
        width: 90,
        resizable: true
    },
    {
        name: "title",
        title: "title",
        width: 150,
        resizable: true
    },
    {
        name: "description",
        title: "description",
        width: 150,
        resizable: true
    },
    {
        name: "keywords",
        title: "keywords",
        width: 150,
        resizable: true
    },
    {
        name: "robots",
        title: "robots",
        width: 150,
        resizable: true
    },
   
]
</script>