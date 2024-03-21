<template>
    <BaseHeader hide-go-back :title="`Все рубрики`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/rubrics/add')">Создать рубрику</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2" style="height: 100%;">
        <UiCard padding="4" >
            <UiRow gap="3">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[name]']" :field="name" />
                </UiCol>
            </UiRow>
            <Table :cols="cols" title="Все рубрики" :data="rubrics" :loading="loading" :filterForm="filterForm"
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
            name: "filterLIKE[name]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterEQ[rubric_id]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterEQ[district_id]",
            prePareKey: () => '',
            prepare: true
        },
    ],
    page: 1,
});
filterForm.value.limit = 20

const {
    data: rubrics,
    meta,
    loading,
    get,
} = await useApi({
    name: "rubric.getAll",
    params: { limit: 20 },
    filters: filters,
});

const name = ref({
    type: "text",
    name: "name",

    bind: {
        maska: "A",
        maskaTokens: "A:[а-яА-Яa-zA-z ]:multiple",
        label: "Заголовок рубрики",
        placeholder: "Введите заголовок рубрики",
    }
})

const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/rubrics/${id}`)
            },
            async onDelete(id) {
                await api.rubric.delete({ id })
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
        name: "name",
        width: 200,
        title: "Название",
    },
]


</script>