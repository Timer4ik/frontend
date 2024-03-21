<template>
    <BaseHeader hide-go-back :title="`Все объявления`">
        <template #actions>
            <UiButton color="primary" @click="useRouter().push('/flats/add')">Создать объявления</UiButton>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2" style="height: 100%;">
        <UiCard padding="4">
            <UiStack justify-content="space-between">
                <UiRow>
                    <UiCol>
                        <VFormComponent v-model="filterForm['filterLIKE[title]']" :field="title" />
                    </UiCol>
                </UiRow>
            </UiStack>
            <Table :cols="cols" title="Все объявления" :data="flats" :loading="loading" :meta="meta"
                :filter-form="filterForm" />
        </UiCard>
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
        }
    ],
    sort: "created_at",
    page: 1,
});

const {
    data: flats,
    meta,
    loading,
    get,
} = await useApi({
    name: "flat.getAll",
    params: { extends: "user,images.image,object,type,building_type", limit: 20 },
    filters: filters,
});

const title = ref({
    type: "text",
    name: "title",

    bind: {
        label: "Заголовок объявления",
        placeholder: "Введите заголовок объявления",
    }
})
const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/flats/${id}`)
            },
            async onDelete(id) {
                await api.post.delete({ id })
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
        name: "price",
        title: "Цена",
        convertTo(value) {
            return `${(+value).toLocaleString('ru-RU')} руб.`
        },
        width: 150,
        resizable: true
    },
    {
        name: "object.name",
        title: "Тип объекта",

        width: 150,
        resizable: true
    },
    {
        name: "type.name",
        title: "Тип объявления",

        width: 150,
        resizable: true
    },
    {
        name: "building_type.name",
        title: "Тип недвижимости",

        width: 150,
        resizable: true
    },
    {
        name: "address",
        title: "Адрес",

        width: 250,
        resizable: true,
    },
    {
        name: 'user.name',
        title: "Разместил",
        renderComponent: (item) => {
            return h('div', {
                style: "cursor:pointer;color:blue;",
                onClick() {
                    useRouter().push(`/users/${item?.user?.id}`)
                }
            }, item?.user?.name)
        }
    }
]
filterForm.value.limit = 20


</script>