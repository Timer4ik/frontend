<template>
    <BaseHeader hide-go-back :title="`Все настройки`">
        <!-- <template #actions>
            <UiButton color="primary" @click="useRouter().push('/settings/add')">Создать настройку</UiButton>
        </template> -->
    </BaseHeader>

    <UiStack flex-direction="column" gap="2" style="height: 100%;">
        <UiCard padding="4" >
            <UiRow gap="3">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[name]']" :field="name" />
                </UiCol>
            </UiRow>
            <Table :cols="cols" title="Все настройки" :data="siteInfos" :loading="loading" :filterForm="filterForm"
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
    ],
    page: 1,
});
filterForm.value.limit = 20

const {
    data: siteInfos,
    meta,
    loading,
    get,
} = await useApi({
    name: "siteInfo.getAll",
    params: { limit: 20 },
    filters: filters,
});

const name = ref({
    type: "text",
    name: "name",

    bind: {
        maska: "A",
        maskaTokens: "A:[а-яА-Яa-zA-z ]:multiple",
        label: "Заголовок настройки",
        placeholder: "Поиск по заголовоку настройки",
    }
})

const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/settings/${id}`)
            },
            async onDelete(id) {
                await api.siteInfo.delete({ id })
                await get()
            },
            hideDelete:true,
            id: 1
        }),
        width: 1
    },
    {
        name: "title",
        width: 200,
        title: "Название настройки",
        resizable:true
    },
    {
        name: "text",
        width: 200,
        title: "Значение",
        resizable:true
    },
    {
        name: "key",
        width: 200,
        title: "Уникальное имя",
        resizable:true
    },
]


</script>