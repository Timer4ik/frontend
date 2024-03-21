<template>
    <BaseHeader :title="`Создание объявления`">
        <template #actions>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" gap="2">
                    <UiStack flex-direction="column" gap="3">
                        <!-- VFormComponent -->
                        <UiRow gap="1">
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Основная информация
                                </UiTypography>
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="title" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="price" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="object_id" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="type_id" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="building_type" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="building_date" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="residential_complex" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="images" />
                            </UiCol>
                        </UiRow>
                        <UiRow gap="1">
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Местоположение
                                </UiTypography>
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="country_id" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="region_id" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="district_id" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="district_string" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="address" />
                            </UiCol>

                            <UiCol col="2">
                                <VFormComponent :field="longitude" />
                            </UiCol>
                            <UiCol col="2">
                                <VFormComponent :field="latitude" />
                            </UiCol>
                        </UiRow>

                        <UiRow gap="1">
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Цены
                                </UiTypography>
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="currency_id" />
                            </UiCol>
                            <UiCol col="6">
                                <VFormComponent :field="not_show_price" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="price_day" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="price_week" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="price_month" />
                            </UiCol>
                        </UiRow>

                        <UiRow gap="1">
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Дополнительные данные
                                </UiTypography>
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="rooms" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="bedrooms" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="bathrooms" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="square" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="square_land" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="square_land_unit" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="floor" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="total_floor" />
                            </UiCol>
                        </UiRow>

                        <UiRow gap="1">
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Описание
                                </UiTypography>
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="specialtxt" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="filename" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="tour_link" />
                            </UiCol>
                            <UiCol col="12">
                                <VFormComponent :field="description" />
                            </UiCol>
                        </UiRow>

                        <UiRow>
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Характеристики
                                </UiTypography>
                            </UiCol>
                        </UiRow>

                        <UiRow gap="4">
                            <template v-for="(item, idx) in properties" :key="item?.id">

                                <UiCol
                                    v-if="properties?.[idx - 1]?.type && properties?.[idx - 1]?.type !== properties[idx]?.type"
                                    col="12">
                                </UiCol>
                                <UiCol v-if="item?.type == 'checkbox'"
                                    :col="item?.property_values.length <= 3 ? 4 : item?.property_values.length <= 6 ? getColByType(item?.type) : 12">
                                    <UiStack gap="4" flex-direction="column" style="flex-wrap: wrap;">
                                        <UiTypography font-size="5" font-weight="bold">{{ item?.name }}:</UiTypography>
                                        <UiStack flex-wrap="wrap" gap="4">
                                            <UiCheckbox v-for="propertyValue in item?.property_values"
                                                :key="propertyValue?.id" :label="propertyValue.name"
                                                :model-value="item.value?.includes(propertyValue?.id)" @update:model-value="
                                                    handleCheckbox(item, propertyValue)
                                                    " />
                                        </UiStack>
                                    </UiStack>
                                </UiCol>
                                <UiCol v-else-if="item?.type == 'select' || item?.type == 'radio'"
                                    :col="getColByType(item?.type)">

                                    <UiRow>
                                        <UiSelect :label="item?.name" variant="slim" title="name"
                                            :options="item?.property_values" :model-value="item.value" modelValueIsNumber
                                            @update:model-value="(val) => {
                                                handleRadio(idx, val);
                                            }
                                                " />
                                    </UiRow>
                                </UiCol>
                                <UiCol v-else-if="item?.type == 'input'" :col="getColByType(item?.type)">
                                    <UiStack flex-direction="column" gap="3">
                                        <UiTypography font-size="5" font-weight="bold">{{ item?.name }}:</UiTypography>
                                        <UiStack gap="2" flex="same-all">
                                            <UiField v-model="item.value" rules="max:8" variant="outlined" />
                                        </UiStack>
                                    </UiStack>
                                </UiCol>
                            </template>
                        </UiRow>

                        <UiStack>
                            <UiButton @submit="onSubmit"> Сохранить </UiButton>
                        </UiStack>
                    </UiStack>
                </form>
            </UiStack>
        </UiCard>
    </UiStack>
</template>

<script setup>
import { useImage } from '#imports';
import { useForm } from 'vee-validate';
import api from '~/api';

const form = useForm()

const { properties, setProperties } = useFilterData();
await useApi({
    name: "property.getAll",
    params: { limit: 1000, extends: "property_values", sort: "type" },
    callback: (data) => {
        console.log(data);
        useFilterData().setProperties(data);
    },
});

const handleCheckbox = (item, value) => {
    if (!Array.isArray(item.value)) {
        item.value = [];
    }

    const hasInArray = item.value?.find((i) => i === value?.id);

    if (hasInArray) {
        item.value = item.value?.filter((i) => i !== value?.id);
    } else {
        item.value.push(value?.id);
    }
};

const handleRadio = (item, value) => {
    properties.value[item].value = value;
};

const title = ref({
    type: "text",
    name: "title",
    rules: "required|max:255",

    bind: {
        variant: "outlined",
        label: "Введите название объявления",
    }
})

const price = ref({
    type: "text",
    name: "price",
    rules: "required|max:10",
    
    bind: {
        variant: "outlined",
        label: "Введите цену",
        maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const object_id = ref({
    type: "select",
    name: "object_id",
    rules: "required",

    bind: {
        label: "Тип объекта",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        title: "name",
        options: useCollections().objects,
    }
})

const type_id = ref({
    type: "select",
    name: "type_id",
    rules: "required",

    bind: {
        label: "Тип объявления",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        title: "name",
        options: useCollections().types,
    }
})

const building_type = ref({
    type: "select",
    name: "building_type",
    rules: "required",

    bind: {
        label: "Тип недвижимости",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        title: "name",
        options: useCollections().building_types,
    }
})

const country_id = ref({
    type: "select",
    name: "country_id",
    rules: "required",

    bind: {
        debounceMs: 800,
        title: "name",
        label: "Выберите страну",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        searchFn: fetchCountries
    }
})

const region_id = ref({
    type: "select",
    name: "region_id",
    rules: "required",
    convertTo: (item) => item?.id,
    bind: {
        label: "Выберите город",
        modelValueIsNumber: true,

        debounceMs: 800,
        title: "name",
        searchFn: fetchRegions,
        deps: computed(() => country_id.value),
        onDepsChange(ctx) {
            ctx.updateModelValue(null);
            ctx.handleSearch();
        }
    }
})

const district_id = ref({
    type: "select",
    name: "district_id",
    rules: "required",
    convertTo: (item) => item?.id,
    bind: {
        label: "Выберите город",
        modelValueIsNumber: true,

        debounceMs: 800,
        title: "name",
        searchFn: fetchDistricts,
        deps: computed(() => region_id.value),
        onDepsChange(ctx) {
            ctx.updateModelValue(null);
            ctx.handleSearch();
        }
    }
})

const district_string = ref({
    type: "text",
    name: "district_string",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Город",
    }
})

const address = ref({
    type: "text",
    name: "address",
    rules: "max:255|required",

    bind: {
        variant: "outlined",
        label: "Адрес",
    }
})

const latitude = ref({
    type: "text",
    name: "latitude",

    bind: {
        maska:"#S.#S",
        maskaTokens:"S:[0-9]:multiple",
        variant: "outlined",
        label: "Широта",
    }
})

const longitude = ref({
    type: "text",
    name: "longitude",

    bind: {
        maska:"#S.#S",
        maskaTokens:"S:[0-9]:multiple",
        variant: "outlined",
        label: "Долгота",
    }
})

const residential_complex = ref({
    type: "text",
    name: "residential_complex",

    bind: {
        variant: "outlined",
        label: "Жилой комплекс",
    }
})

const currency_id = ref({
    type: "select",
    name: "currency_id",
    rules: "required",

    bind: {
        debounceMs: 800,
        title: "name",
        label: "Выберите валюту",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        options: useCollections().currenciesText
    }
})

const not_show_price = ref({
    type: "checkbox",
    name: "not_show_price",

    bind: {
        label: "Не показывать цену?",
    }
})

const price_day = ref({
    type: "text",
    name: "price_day",
    rules: "required|max:7",

    bind: {
        variant: "outlined",
        label: "Цена за день",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const price_week = ref({
    type: "text",
    name: "price_week",
    rules: "required|max:7",

    bind: {
        variant: "outlined",
        label: "Цена за неделю",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const price_month = ref({
    type: "text",
    name: "price_month",
    rules: "max:7",

    bind: {
        variant: "outlined",
        label: "Цена за месяц",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const rooms = ref({
    type: "text",
    name: "rooms",
    rules: "required|max:3",

    bind: {
        variant: "outlined",
        label: "Количество комнат",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const bedrooms = ref({
    type: "text",
    name: "bedrooms",
    rules: "required|max:3",

    bind: {
        variant: "outlined",
        label: "Количество спален",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const bathrooms = ref({
    type: "text",
    name: "bathrooms",
    rules: "required|max:3",

    bind: {
        variant: "outlined",
        label: "Количество санузлов",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const square = ref({
    type: "text",
    name: "square",
    rules: "required|max:5",

    bind: {
        variant: "outlined",
        label: "Площадь квартиры",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const square_land = ref({
    type: "text",
    name: "square_land",
    rules: "max:6",

    bind: {
        variant: "outlined",
        label: "Площадь земельного участка",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const square_land_unit = ref({
    type: "select",
    name: "square_land_unit",
    rules: "required",

    bind: {
        debounceMs: 800,
        title: "name",
        label: "Выберите ед. измерения площади",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        options: useCollections().square_land_units
    }
})

const floor = ref({
    type: "text",
    name: "floor",
    rules: "required|max:3",

    bind: {
        variant: "outlined",
        label: "Этаж",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const total_floor = ref({
    type: "text",
    name: "total_floor",
    rules: "required|max:3",

    bind: {
        variant: "outlined",
        label: "Этажность",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const images = ref({
    type: "multiple-photo-loader",
    name: "images",
    convertTo: (images) => images?.map?.(i => i.id)?.join?.(),
    bind: {
        async upload(image) {
            const formData = new FormData()

            formData.append("image", image)

            const { data } = await api.image.create({
                data: formData,
            })

            return { id: data.id, path: data.path }
        },
        label: "Загрузите фото",
    }
})

const building_date = ref({
    type: "date",
    name: "building_date",

    bind: {
        label: "Дата постройки",
    }
})

const specialtxt = ref({
    type: "text",
    name: "specialtxt",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Специальный текст",
    }
})

const filename = ref({
    type: "text",
    name: "filename",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Ссылка на видео",
    }
})

const tour_link = ref({
    type: "text",
    name: "tour_link",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Ссылка на онлайн тур",
    }
})

const description = ref({
    type: "text",
    name: "description",
    rules: "max:65536",

    bind: {
        variant: "outlined",
        label: "Описание объекта",
    }
})

async function fetchCountries(_, searchString, limit, page) {
    return await api.country.getAll({
        params: {
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

async function fetchRegions(_, searchString, limit, page) {
    return await api.region.getAll({
        params: {
            "filterEQ[country_id]": country_id.value.modelValue,
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

async function fetchDistricts(_, searchString, limit, page) {
    return await api.district.getAll({
        params: {
            "filterEQ[region_id]": region_id.value.modelValue,
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

const onSubmit = form.handleSubmit(async ({ ...values }) => {

    await api.flat.create({
        data: {
            ...values,
        }
    })

    useRouter().push("/flats")
});

const getColByType = (type) => {

    switch (type) {
        case "checkbox":
            return '6'
        case "select":
        case "radio":
            return '6'
        case "input":
            return '6'
    }

}

</script>