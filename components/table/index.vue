<template>
    <UiTable v-if="cols?.length" style="margin-bottom: 150px;">
        <template #header>
            <UiStack justify-content="space-between" align-items="center">
                {{ title }}
                <UiStack gap="4" align-items="center">
                    <UiDropdownMenu :is-show="false">
                        <template #drop>
                            <UiStack flex-direction="column" justify-content="space-between">
                                <div v-for="col in cols.filter(a => a.name != 'actions').sort((a, b) => a.order - b.order)">
                                    <UiCheckbox style="padding: 0;" :model-value="!col.is_hidden" :label="col.title"
                                        @update:model-value="col.is_hidden = !col.is_hidden" />
                                </div>
                            </UiStack>
                        </template>
                        <template #body>

                            <div class="p-4" style="width: 300px;">Выбрать колонки</div>

                        </template>
                    </UiDropdownMenu>
                </UiStack>
            </UiStack>
        </template>
        <template #table v-if="!loading && data?.length">
            <table class='table__block'>
                <thead>
                    <tr>
                        <template v-for="col in cols.sort((a, b) => a.order - b.order)" :key="col.id" :id="col.field">
                            <th v-if="!col.is_hidden" :style="[{
                                minWidth: `${col.width ? col.width + 'px' : '200px'
                                    }`,
                            }, {
                                width: `${col.width ? col.width + 'px' : '200px'
                                    }`
                            }]" class="resizable">
                                <UiStack gap="1">
                                    <div
                                        style="position: absolute;top: -32px;left:0;right:0;z-index: -100;margin: 0 auto;height: 35px;background-color: rgb(239, 239, 239);" />


                                    <template
                                        v-if="col.name.split('.').length <= 1 && !col?.can_not_sort && col.name != 'actions'">
                                        <div style="cursor: pointer;"
                                            v-if="filterForm?.sort == col.name && filterForm?.sort && filterForm?.sort[0] != '-'"
                                            @click="changeSort?.('-' + col.name)">
                                            {{ col.title }}
                                            <button>
                                                <div class="table-sort-btn table-sort-btn_bottom">
                                                </div>
                                            </button>
                                        </div>
                                        <div style="cursor: pointer;"
                                            v-else-if="filterForm?.sort?.slice?.(1) == col.name && filterForm?.sort && filterForm?.sort[0] == '-'"
                                            @click="changeSort?.('')">

                                            {{ col.title }}
                                            <button>
                                                <div class="table-sort-btn table-sort-btn_top">
                                                </div>
                                            </button>
                                        </div>
                                        <div style="cursor: pointer;" v-else @click="changeSort?.(col.name)">
                                            {{ col.title }}
                                            <button>
                                                <div class="table-sort-btn">
                                                </div>
                                            </button>
                                        </div>
                                    </template>
                                    <div v-else>{{ col.title }}</div>
                                    <!-- <button style="position: absolute;top: -32px;right: 0; font-size: 25px;"
                                        @click="changeOrder(col.id, +1)">
                                        &#8594;
                                    </button> -->
                                    <div class="reziser-wrapper" v-if="col?.resizable"
                                        @mousedown="mouseDownHandler($event, col)">
                                        <div class="resizer">
                                        </div>
                                    </div>
                                </UiStack>
                            </th>
                        </template>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in data" :key="item.id">
                        <template v-for="col in cols" :key="col.name">
                            <td v-if="!col.is_hidden">
                                <component v-if="col.renderComponent"
                                    :is="col?.renderComponent?.(item)" :id="item.id" />
                                <template v-else-if="col?.convertTo">{{ col.convertTo(getValueByName(item, col.name))
                                }}</template>
                                <template v-else>{{ getValueByName(item, col.name) }}</template>
                            </td>
                        </template>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </template>
        <template #table v-else-if="loading">
            <table class='table__block'>
                <thead>
                    <tr>
                        <th v-for="col in cols">
                            <UiStack gap="1">
                                <div>{{ col.title }}</div>

                                <template
                                    v-if="col.name.split('.').length <= 1 && !col?.can_not_sort && col.name != 'actions'">
                                    <button
                                        v-if="filterForm?.sort == col.name && filterForm?.sort && filterForm?.sort[0] != '-'"
                                        @click="changeSort?.('-' + col.name)">
                                        <div class="table-sort-btn table-sort-btn_bottom">
                                        </div>
                                    </button>
                                    <button
                                        v-else-if="filterForm?.sort?.slice?.(1) == col.name && filterForm?.sort && filterForm?.sort[0] == '-'"
                                        @click="changeSort?.('')">
                                        <div class="table-sort-btn table-sort-btn_top">
                                        </div>
                                    </button>

                                </template>
                                <div class="reziser-wrapper" @mousedown="mouseDownHandler($event, col)">
                                    <div v-if="col?.resizable" class="resizer">
                                    </div>
                                </div>
                            </UiStack>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td v-for="col in cols" :key="col.name">
                            <component v-if="col.template" :is="col.template" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <UiLoader />
        </template>
        <template #table v-else>
            <table class='table__block'>
                <thead>
                    <tr>
                        <th v-for="col in cols">
                            <UiStack gap="1">
                                <div>{{ col.title }}</div>
                                <template
                                    v-if="col.name.split('.').length <= 1 && !col?.can_not_sort && col.name != 'actions'">
                                    <button
                                        v-if="filterForm?.sort == col.name && filterForm?.sort && filterForm?.sort[0] != '-'"
                                        @click="changeSort?.('-' + col.name)">
                                        <div class="table-sort-btn table-sort-btn_bottom">
                                        </div>
                                    </button>
                                    <button
                                        v-else-if="filterForm?.sort?.slice?.(1) == col.name && filterForm?.sort && filterForm?.sort[0] == '-'"
                                        @click="changeSort?.('')">
                                        <div class="table-sort-btn table-sort-btn_top">
                                        </div>
                                    </button>
                                    <button v-else @click="changeSort?.(col.name)">
                                        <div class="table-sort-btn">
                                        </div>
                                    </button>
                                </template>
                                <div class="reziser-wrapper" @mousedown="mouseDownHandler($event, col)">
                                    <div v-if="col?.resizable" class="resizer">
                                    </div>
                                </div>
                            </UiStack>
                        </th>
                    </tr>
                </thead>
            </table>
            <UiStack align-items="center" padding="2" margin-x="5">
                <UiTypography font-size="3" font-weight="medium">
                    Ничего не найдено
                </UiTypography>
            </UiStack>
        </template>

        <template #footer>
            <slot name="footer">
                <UiRow justify-content="space-between" align-items="center">
                    <UiCol col="3">
                        <div>Итого записей: {{ meta?.total ?? 0 }}</div>
                    </UiCol>
                    <UiCol col="6">
                        <BasePagination :total="meta?.total" :limit="meta?.per_page" v-if="filterForm"
                            v-model:current-page="filterForm.page" />
                    </UiCol>
                    <UiCol col="3">
                        <UiSelect hideMessage  style="margin-left: auto; ;width: 100%;" v-if="filterForm"
                            v-model="filterForm.limit" model-value-is-number :options="[
                                {
                                    id: 20,
                                    value: 20,
                                },
                                {
                                    id: 50,
                                    value: 50,
                                },
                                {
                                    id: 100,
                                    value: 100,
                                },
                            ]" />
                    </UiCol>
                </UiRow>
            </slot>

        </template>
    </UiTable>
</template>

<script setup>

const emits = defineEmits(["update:activeId"])

const props = defineProps({
    loading: Boolean,
    title: String,
    data: Object,
    cols: Array,
    meta: Object,
    filterForm: [Object, String, Array]
})

watch(() => props.cols, () => {
    restore(props.cols)
})

const { cols, restore, mouseDownHandler } = useDynamicTh(props.cols, {
    resizeCallback: async (colId, val) => {
        // try {
        //     console.log(colId, val);
        //     // props.debounceUpdateCol(colId, val)

        // } catch (error) {
        //     console.error(error);
        // }
    }
})

const changeSort = (sort) => {
    props.filterForm.sort = sort
}

const getValueByName = (item, name) => {

    if (!item || !name) {
        return null
    }

    const splittedName = name.match(/[^\]|.|\[]+/gm) || [];

    let finalData = item;

    for (let i = 0; i < splittedName.length; i++) {
        try {
            if (!finalData[splittedName[i]]) {
                return null;
            }
            finalData = finalData[splittedName[i]];
        } catch (error) {
            return null;
        }
    }

    return finalData;
};


</script>

<style lang="scss">
.reziser-wrapper {
    position: absolute;
    height: 100%;

    padding: 0 10px;
    margin-right: -10px;
    top: 0;
    right: 0;
    cursor: col-resize;

    z-index: 10000;
}

.resizer {

    height: 100%;
    width: 3px;
    user-select: none;
    // margin-right: -10px;
    color: white;
    background: rgba(49, 80, 183, 0.03);
}

.reziser-wrapper:hover {
    .resizer {
        background: rgba(49, 81, 183, 0.216);
        // height: 100%;
        cursor: col-resize;
    }
}

.resizable:not(:last-child) {
    position: relative;
    height: 100%;

    // width: 200px;
    // min-width: 200px;
}


.table-sort-btn {
    height: 12px;
    width: 15px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -20px;
    background-image: url("assets/img/table-sort.svg");
}

.table-sort-btn_bottom {
    height: 12px;
    background-image: url("assets/img/table-sort-bottom.svg");
}

.table-sort-btn_top {
    width: 15px;
    background-image: url("assets/img/table-sort-top.svg");
}

.table-sort-btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: right center;
    padding-right: 12px;
}

.table-sort-btn__text {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #545e7d;
    white-space: nowrap;
}
</style>