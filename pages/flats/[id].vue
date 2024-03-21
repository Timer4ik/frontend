<template>
    <BaseHeader :title="`Объявление ${flat?.title} #${flat?.id}`">
        <template #actions>
        </template>
    </BaseHeader>

    <UiStack flex-direction="column" gap="2">
        <UiCard padding="4">
            <UiStack flex-direction="column" gap="2">
                <form @submit="onSubmit" v-if="flat">
                    <UiStack flex-direction="column" gap="3">
                        <UiRow gap="1">
                            <UiCol col="12">
                                <UiTypography font-size="7" font-weight="bold">
                                    Основная информация
                                </UiTypography>
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="title" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="price" />
                            </UiCol>
                            <UiCol col="4">
                                <VFormComponent :field="price_per_meter" />
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

                        <UiCol col="12">
                            <UiTypography font-size="7" font-weight="bold">
                                Характеристики
                            </UiTypography>
                        </UiCol>
                        <UiRow gap="4">
                            <template v-for="(item, idx) in properties" :key="item?.id">
                                <UiCol
                                    v-if="properties?.[idx - 1]?.type && properties?.[idx - 1]?.type !== properties[idx]?.type"
                                    col="12"></UiCol>
                                <UiCol v-if="item?.type == 'checkbox'"
                                    :col="item?.property_values.length <= 3 ? 4 : item?.property_values.length <= 6 ? getColByType(item?.type) : 12">
                                    <UiStack gap="4" flex-direction="column">
                                        <UiTypography font-size="5" font-weight="bold">{{ item?.name }}:
                                        </UiTypography>
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
                                            :options="item?.property_values" :model-value="item?.value" modelValueIsNumber
                                            @update:model-value="(val) => {
                                                handleRadio(idx, val);
                                            }
                                                " />
                                    </UiRow>
                                </UiCol>
                                <UiCol v-else-if="item?.type == 'input'" :col="getColByType(item?.type)">
                                    <UiStack flex-direction="column" gap="3">
                                        <UiTypography font-size="5" font-weight="bold">{{ item?.name }}:
                                        </UiTypography>
                                        <UiStack gap="2" flex="same-all">
                                            <UiField label="От" v-model="item.value" variant="outlined" />
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
import { Form, useForm } from "vee-validate";
import api from "~/api";

const form = useForm()

const { data: flat, get } = await useApi({
    name: "flat.get",
    params: {
        extends: "images.image,currency,flat_properties.property_value.property,district.region,country",
    },
    requestParams: { id: useRoute().params?.id },
});
await get()

const { properties } = useFilterData();
await useApi({
    name: "property.getAll",
    params: { limit: 10000, extends: "property_values", sort: "type" },
    callback: (data) => {

        const selectedPropertyValues = flat.value.flat_properties

        data?.forEach((item) => {
            const prop = selectedPropertyValues.find(i => {
                i.property_id = i.property_id || i?.property_value?.property_id
                return i.property_id == item.id
            })
            if (prop?.property_value_id) {
                item.value = prop.property_value_id
            } else if (prop?.value) {
                item.value = prop.value
            }
        })

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
    modelValue: flat?.value?.title,

    bind: {
        variant: "outlined",
        label: "Введите название объявления",
    }
})

const price = ref({
    type: "text",
    name: "price",
    rules: "required|max:10",
    modelValue: +flat?.value?.price,

    bind: {
        variant: "outlined",
        label: "Введите цену",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})
const price_per_meter = ref({
    type: "text",
    name: "price_per_meter",
    rules: "required|max:10",
    modelValue: +flat?.value?.price_per_meter,

    bind: {
        variant: "outlined",
        label: "Введите цену за м(2)",
         maska: maskaOnlyNumber.mask,
        maskaTokens: maskaOnlyNumber.tokens,
    }
})

const object_id = ref({
    modelValue: flat.value?.object_id,
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
    modelValue: flat.value?.type_id,
    type: "select",
    name: "type_id",
    rules: "required",

    bind: {
        label: "Тип объявления",
        modelValueIsNumber: true,
        debounceMs: 500,
        limit: 20,
        title: "name",
        options: useCollections().types,
    }
})

const building_type = ref({
    modelValue: flat.value?.building_type,
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
    modelValue: {
        id: flat.value?.country.id,
        value: flat.value?.country.name,
        item: flat.value?.country
    },
    convertTo: (item) => item?.id,

    bind: {
        debounceMs: 800,
        title: "name",
        label: "Выберите страну",
        limit: 20,
        debounceMs: 500,
        searchFn: fetchCountries
    }
})

const region_id = ref({
    modelValue: { id: flat.value?.district.region.id, value: flat.value?.district.region.name, item: flat.value?.district.region },
    type: "select",
    name: "region_id",
    rules: "required",
    convertTo: (item) => item?.id,
    bind: {
        label: "Выберите регион",

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
    modelValue: { id: flat.value?.district.id, value: flat.value?.district.name, item: flat.value?.district.id },
    type: "select",
    name: "district_id",
    rules: "required",
    convertTo: (item) => item?.id,
    bind: {
        label: "Выберите город",
        // modelValueIsNumber: true,

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
    modelValue: flat.value?.district_string,
    type: "text",
    name: "district_string",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Город",
    }
})

const address = ref({
    modelValue: flat.value?.address,
    type: "text",
    name: "address",
    rules: "required|max:255",

    bind: {
        variant: "outlined",
        label: "Адрес",
    }
})

const latitude = ref({
    modelValue: flat.value?.latitude,
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
    modelValue: flat.value?.longitude,
    type: "text",
    name: "longitude",
    
    bind: {
        maska:"#S.#S",
        maskaTokens:"S:[0-9]:multiple",
        variant: "outlined",
        label: "Долгота",
    }
})

const currency_id = ref({
    modelValue: flat.value?.currency_id,
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
    modelValue: flat.value?.not_show_price,
    type: "checkbox",
    name: "not_show_price",

    bind: {
        label: "Не показывать цену?",
    }
})

const price_day = ref({
    modelValue: +flat.value?.price_day,
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
    modelValue: +flat.value?.price_week,
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
    modelValue: +flat.value?.price_month,
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
    modelValue: flat.value?.rooms,
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
    modelValue: flat.value?.bedrooms,
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
    modelValue: flat.value?.bathrooms,
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
    modelValue: flat.value?.square,
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
    modelValue: flat.value?.square_land,
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

const residential_complex = ref({
    modelValue: flat.value?.residential_complex,
    type: "text",
    name: "residential_complex",

    bind: {
        variant: "outlined",
        label: "Жилой комплекс",
    }
})

const square_land_unit = ref({
    modelValue: flat.value?.square_land_unit,
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
    modelValue: flat.value?.floor,
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
    modelValue: flat.value?.total_floor,
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
    modelValue: flat.value?.images?.map(i => ({ id: i?.image?.id, path: i?.image?.path })),
    convertTo: (images) => images.map(i => i.id).join(),
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
    modelValue: flat.value?.building_date,
    type: "date",
    name: "building_date",

    bind: {
        label: "Дата постройки",
    }
})

const specialtxt = ref({
    modelValue: flat.value?.specialtxt,
    type: "text",
    name: "specialtxt",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Специальный текст",
    }
})

const filename = ref({
    modelValue: flat.value?.filename,
    type: "text",
    name: "filename",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Ссылка на видео",
    }
})

const tour_link = ref({
    modelValue: flat.value?.tour_link,
    type: "text",
    name: "tour_link",
    rules: "max:255",

    bind: {
        variant: "outlined",
        label: "Ссылка на онлайн тур",
    }
})

const description = ref({
    modelValue: flat.value?.description,
    type: "textarea",
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
            "filterEQ[country_id]": country_id.value.modelValue.id,
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

async function fetchDistricts(_, searchString, limit, page) {
    return await api.district.getAll({
        params: {
            "filterEQ[region_id]": region_id.value.modelValue.id,
            "filterLIKE[name]": searchString,
            limit, page
        }
    }).then(resp => resp.data)
}

async function onInvalidSubmit({ values, errors, results }) {
    warningPopup("Проверьте красные поля");
}

const onSubmit = form.handleSubmit(async ({ ...values }) => {
    try {
        // return console.log(values);
        const ppa = [];

        properties.value.forEach((element) => {
            if (typeof element?.value === 'number' || element?.value?.length) {
                console.log(element);

                if (element.type == 'input') {
                    ppa.push({
                        property_id: element?.id,
                        value: element?.value,
                    });
                } else {
                    ppa.push({
                        property_id: element?.id,
                        property_value_id: element?.value?.[0] ?? element?.value,
                    });
                }
            }
        });

        await api.flat.update({
            id: useRoute().params?.id,
            data: {
                ...values,
                properties_values: JSON.stringify(ppa),
            }
        });

        nextTick(() => {
            navigateTo({
                name: 'flats'
            });
        });
    } catch (error) {
        console.error(error);
    }
}, onInvalidSubmit);

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

<style lang="scss">
.creation-product-page {
    width: 100%;
    display: flex;
    padding-top: 70px;

    .creation {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 40px;

        &__title {
            color: #152242;
            font-family: Roboto;
            font-size: 42px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        &__inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;

            .form__title {
                color: #121212;
                font-family: Roboto;
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }

        &__check {
            display: flex;
            gap: 40px;

            .flex-wrap {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                gap: 40px;
            }
        }

        .actions-button {
            position: static;
            max-width: 200px;
            width: 100%;
            margin-left: 50vh;
        }

        .check__name {
            color: #121212;
            font-family: Roboto;
            font-size: 22px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            margin-right: 20px;
        }

        &__three {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;

            .form__title {
                color: #121212;
                font-family: Roboto;
                font-size: 18px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }

        &__enter {
            display: flex;

            .form-wrap {
                display: grid;
                grid-template-columns: 1fr 1fr;
                width: 100%;
                gap: 20px;
            }
        }

        &__download {
            display: flex;
            align-items: flex-start;
            padding-top: 22px;
            padding-bottom: 17px;
            gap: 20px;

            .download__button {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 720px;
                height: 450px;
                flex-shrink: 0;
                padding: 28px 61px;
                text-align: center;
                justify-content: center;

                border-radius: 20px;
                background: #fff;

                .download__desc {
                    color: #000;
                    text-align: center;
                    font-family: Roboto;
                    font-size: 24px;
                    font-style: normal;
                    font-weight: 300;
                    line-height: 24px;
                    width: 344.4px;
                    opacity: 0.5;
                    padding-top: 40px;
                }

                .download__size {
                    color: #000;
                    font-family: Roboto;
                    font-size: 19px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: 24px;
                    opacity: 0.8;
                    padding-top: 14px;
                }
            }

            .download__pre {
                display: flex;
                padding-top: 28px;

                .pre__image {
                    position: relative;
                    display: flex;

                    svg {
                        border-radius: 10px;
                        width: 150px;
                        height: 150px;
                    }

                    .pre__delete {
                        width: 36px;
                        height: 36px;
                        position: absolute;
                        display: flex;
                        right: -6px;
                        bottom: -6px;
                    }
                }
            }
        }
    }
}

.check {
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 10px 16px;
    /* padding: 16px, 26px, 16px, 26px; */
    align-items: center;
    border-radius: 10px;
    border: 1px solid #eee;
    font-size: 14px;
    background: white;
    height: 40px;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.actives {
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 10px 16px;
    /* padding: 16px, 26px, 16px, 26px; */
    align-items: center;
    border-radius: 10px;
    border: 1px solid #007bfb;
    background-color: #f1f5ff;
    color: #007bfb;

    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>F
