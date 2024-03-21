<template>
    <BaseHeader hide-go-back title="Все пользователи" />
    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiRow gap="2">
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterLIKE[name]']" :field="name" />
                </UiCol>
                <UiCol col="4">
                    <VFormComponent :model-value="filterForm['filterIN[role]']"
                        @update:model-value="filterForm['filterIN[role]'] = $event.join()" :field="role" />
                </UiCol>
                <UiCol col="4">
                    <VFormComponent v-model="filterForm['filterEQ[is_confirm]']" :field="isConfirm" />
                </UiCol>
            </UiRow>
            <Table title="Все пользователи" :cols="cols" :data="users" :loading="loading" :meta="meta"
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
            name: "filterLIKE[name]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterIN[role]",
            prePareKey: () => '',
            prepare: true
        },
        {
            name: "filterEQ[is_confirm]",
            prePareKey: () => '',
            prepare: true
        },
    ],
    extends: "user,images.image,rubric,company.owner",
    sort: "created_at",
    page: 1,
});

const {
    data: users,
    meta,
    loading,
    get,
} = await useApi({
    name: "user.getAll",
    params: { extends: "company.owner", limit: 20 },
    filters: filters,
});

const name = ref({
    type: "text",
    name: "name",
    bind: {
        label: "Имя",
        placeholder: "Введите имя пользователя",
    }
})

const role = ref({
    type: "multiple-select",
    name: "role",

    bind: {
        modelValueIsNumber: true,
        label: "Выберите роль",
        closeAfterSelect: true,
        options: useCollections().roles,
    }
})

const isConfirm = ref({
    type: "checkbox",
    name: "is_confirm",
    modelValue: 1,

    bind: {
        innerConvertTo: (val) => val ? 1 : 0,
        label: "Аккаунт подтверждён?",
    }
})

const cols = [
    {
        name: "actions",
        renderComponent: (item) => h(TableActions, {
            onUpdate(id) {
                useRouter().push(`/users/${id}`)
            },
            // async onDelete(id) {
            //     await api.user.delete({ id })
            //     await get()
            // },
            hideDelete:true,
            id: 1
        }),
        width: 1
    },
    {
        name: "id",
        width: 90,
        title: "ID",
        resizable: true
    },

    {
        name: "name",
        title: "Имя",
        width: 150,
        resizable: true
    },
    {
        name: "email",
        title: "E-mail",
        width: 150,
        resizable: true
    },
    {
        name: "role",
        title: "Роль",
        width: 150,
        resizable: true,
        convertTo(value) {
            return useCollections().roles.find(i => i.id === value).value
        }
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
        name: "is_confirm",
        title: "Одобрено?",
        width: 150,
        resizable: true
    },
    {
        name: "company.owner",
        title: "Компания",
        width: 150,
        resizable: true,
        renderComponent: (item) => {
            return item ? h('div', {
                style: "cursor:pointer;color:blue",
                onClick() {
                    useRouter().push(`/users/${item.company?.owner.id}`)
                }
            }, item.company?.owner?.name) : ''
        }
    },
    {
        name: "phone",
        title: "Телефон",
        width: 150,
        resizable: true
    },
]

</script>