<template>
    <BaseHeader hide-go-back :title="`Все компании`">
    </BaseHeader>
    <UiCard padding="4">
        <UiStack flex-direction="column" gap="2">
            <UiRow gap="2">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[owner.name]']" :field="name" />
                </UiCol>
                <UiCol col="4">
                    <VFormComponent :model-value="filterForm['filterIN[owner.role]']"
                        @update:model-value="filterForm['filterIN[owner.role]'] = $event.join()" :field="role" />
                </UiCol>
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterEQ[owner.is_confirm]']" :field="isConfirm" />
                </UiCol>
            </UiRow>
            <Table title="Все пользователи" :meta="meta" :filterForm="filterForm" :cols="cols" :data="data"
                :loading="loading" />

        </UiStack>
    </UiCard>
</template>

<script setup>
import TableActions from '@/components/table/table-actions.vue';
import api from '~/api';

const { filterForm, filters } = useFilters({
    defFilters: [
        {
            name: "filterLIKE[owner.name]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterIN[owner.role]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterEQ[owner.is_confirm]",
            prePareKey: () => '',
            prepare: true
        },
    ],
    extends: "user,images.image,rubric,owner",
    sort: "created_at",
    page: 1,
});

const {
    data,
    meta,
    loading,
    get,
} = await useApi({
    name: "company.getAll",
    params: { extends: "owner", limit: 20 },
    filters: filters,
});

const name = ref({
    type: "text",
    name: "name",
    bind: {
        hideMessage: true,
        label: "Имя",
        placeholder: "Введите имя пользователя",
    }
})

const role = ref({
    type: "select",
    name: "role",
    convertTo: (val) => val?.id,

    bind: {
        hideMessage: true,
        modelValueIsNumber: true,
        label: "Тип компании",
        closeAfterSelect: true,
        options: useCollections().roles,
    }
})

const isConfirm = ref({
    type: "checkbox",
    name: "is_confirm",
    modelValue: 1,

    bind: {
        hideMessage: true,
        innerConvertTo: (val) => val ? 1 : 0,
        label: "Компания подтверждена?",
    }
})

const cols = [
    {
        name: "actions",
        renderComponent: () => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/companies/${id}`)
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
        name: "created_at",
        width: 150,
        title: "Дата создания",
        convertTo(val) {
            return new Date(val).toLocaleDateString('ru-RU')
        },
        resizable: true
    },
    {
        name: "owner.name",
        title: "Название компании",
        width: 150,
        resizable: true
    },
    {
        name: "owner",
        title: "Владелец",
        width: 150,
        resizable: true,
        renderComponent: (item) => {
            return h('div', {
                style: "cursor:pointer;color:blue;",
                onClick() {
                    useRouter().push(`/users/${item.id}`)
                }
            }, item.name)
        }
    },
    {
        name: "owner.email",
        title: "E-mail",
        width: 150,
        resizable: true
    },
    {
        name: "owner.role",
        title: "Тип компании",
        width: 150,
        resizable: true,
        convertTo(value) {
            return useCollections().roles.find(i => i.id === value).value
        }
    },

    {
        name: "owner.is_confirm",
        title: "Подтверждена?",
        width: 150,
        resizable: true,
        convertTo(value) {
            return value ? 'Да' : "Нет"
        }
    },
    {
        name: "owner.phone",
        title: "Телефон",
        width: 150,
        resizable: true
    },
]

</script>