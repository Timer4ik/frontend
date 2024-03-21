<template>
    <BaseHeader hide-go-back :title="`Все новости`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/posts/add')">Создать новость</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2" padding="5">
        <UiRow gap="3">
            <UiCol col="4">
                <VFormComponent v-model="filterForm['filterLIKE[title]']" :field="title" />
            </UiCol>
            <UiCol col="4">
                <VFormComponent v-model="filterForm['filterEQ[rubric_id]']" :field="rubric_id" />
            </UiCol>
            <UiCol col="4">
                <VFormComponent v-model="filterForm['filterEQ[district_id]']" :field="district_id" />
            </UiCol>
        </UiRow>
        <Table :cols="cols" title="Все новости" :data="posts" :loading="loading" :filterForm="filterForm" :meta="meta" />
    </UiStack>
</template>

<script setup>
import TableActions from '@/components/table/table-actions.vue';
import api from '~/api';

const { filterForm, filters } = useFilters({
    defFilters: [
        {
            name: "filterLIKE[title]",
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
    extends: "user,images.image,rubric",
    sort: "created_at",
    page: 1,
});

const {
    data: posts,
    meta,
    loading,
    get,
} = await useApi({
    name: "post.getAll",
    params: { extends: "user,images.image,rubric,district   ", limit: 20 },
    filters: filters,
});

const title = ref({
    type: "text",
    name: "title",

    bind: {
        // maska: "A",
        // maskaTokens: "A:[а-яА-Яa-zA-z]:multiple",
        label: "Заголовок статьи",
        placeholder: "Введите заголовок новости",
    }
})
const rubric_id = ref({
    type: "select",
    name: "rubric_id",
    bind: {
        label: "Рубрика",
        modelValueIsNumber: true,
        limit: 10,
        closeAfterSelect: true,
        options: await getRubricsOptions()
    }
})

const district_id = ref({
    type: "select",
    name: "district_id",
    bind: {
        label: "Выберите город",
        modelValueIsNumber: true,
        debounceMs: 100,
        limit: 20,
        searchFn: async (_ctx, search, limit, page) => {
            return await getDistrictsOptions({
                limit,
                page,
                'filterLIKE[name]': search
            })
        }
    }
})
const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/posts/${id}`)
            },
            async onDelete(id) {
                await api.post.delete({ id })
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
        name: "title",
        width: 200,
        title: "Название",
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
        name: "rubric.name",
        width: 150,
        title: "Рубрика",
        resizable: true
    },
    {
        name: "district.name",
        title: "Город",
        width: 150,
        resizable: true
    },
    {
        name: "source",
        title: "Ресурс",
        width: 300,
        renderComponent: (item) => h('a', {
            href: item.source,
            target: "_blanc"
        }, item.source)
    },
]

// Функции для облегчения жизни
async function getRubricsOptions(params) {
    const { data } = await api.rubric.getAll({
        params: params
    })

    return data.map(item => ({ id: item.id, value: item.name, item }))
}
async function getDistrictsOptions(params) {
    const { data } = await api.district.getAll({
        params: params
    })

    return data.map(item => ({ id: item.id, value: item.name, item }))
}
</script>