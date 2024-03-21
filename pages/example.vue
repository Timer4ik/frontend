<template>
    <div>
        <form @submit="onSubmit" gap="2">
            <UiStack flex-direction="column" gap="2">
                <VFormComponent :field="name" />
                <VFormComponent :field="phone" />
                <UiStack flex="same-all" gap="2">
                    <VFormComponent :field="country" />
                    <VFormComponent :field="city" />
                </UiStack>
                <VFormComponent :field="date" />
                <VFormComponent :field="isNeedAge" />
                <VFormComponent :field="comment" />
                <VFormComponent :field="documents" />

                <VFormComponent :field="photo" />

                <VFormComponent :field="tagsSelect" />

                <UiButton>Сохранить</UiButton>
            </UiStack>
        </form>
        <div style="position: fixed;left: 0;top: 0;bottom: 0;z-index: 1000000;background-color: white;width:300px;
                display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <UiTypography font-weight="bold" font-size="7">
                Значения внутри формы с конвертом
            </UiTypography>
            <pre>{{ form.values }}</pre>
            <UiTypography font-weight="bold" font-size="7">
                Значения снаружи формы без конверта
            </UiTypography>
            <pre>{{ doNotConvertedForm }}</pre>
            <UiButton @click="name.modelValue = Date.now()">Можно изменить значение</UiButton>
        </div>
    </div>
</template>
<script setup>
import { useForm } from 'vee-validate';

const selectedCountry = {
    id: 1,
    value: "Россия",
    item: {
        id: 1,
        name: "Россия",
    }
}
const countries = [
    {
        id: 1,
        name: "Россия",
    },
    {
        id: 2,
        name: "Германия",
    },
    {
        id: 3,
        name: "США",
    },
    {
        id: 4,
        name: "Китай",
    },
]
for (let i = 5; i < 100; i++) {
    countries.push({
        id: i,
        name: "Страна" + i,
    })
}
const selectedCity = {
    id: 1,
    value: "kazan",
    item: {
        id: 1,
        name: "kazan",
        country_id: 1
    }
}
const cities = [
    {
        id: 1,
        name: "kazan",
        country_id: 1,
    },
]
const tags = [
    {
        id: 1,
        value: 'Красный',
        item: {
            id: 1,
            value: 'Красный',
        }
    },
    {
        id: 2,
        value: 'Зелёный',
        item: {
            id: 2,
            value: 'Зелёный',
        }
    },
    {
        id: 3,
        value: 'Синий',
        item: {
            id: 3,
            value: 'Синий',
        }
    },
]

// Форма
const name = ref({
    type: "text",
    modelValue: "123213",
    name: "name",
    rules: "required",

    bind: {
        label: "Введите имя пользователя",
    }
})
const phone = ref({
    type: "text",
    modelValue: "3123231",
    name: "phone",
    rules: "required",
    convertTo:(v) => clearPhone(v),
    bind: {
        maska:"+7 ### ### ## ##",
        label: "Введите номер телефона",
    }
})
const country = ref({
    type: "select",
    modelValue: selectedCountry.id,
    name: "country",
    rules: "required",

    bind: {
        label: "Выберите страну",
        modelValueIsNumber: true,
        limit: 20,
        debounceMs: 500,
        searchFn: (_ctx, search, limit) => {
            return countries.filter(i => i.name.indexOf(search) !== -1)
                .slice(0, limit)
                .map(item => ({ id: item.id, value: item.name, item }))
        }
    }
})
const city = ref({
    type: "select",
    modelValue: selectedCity,
    name: "city",
    rules: "required",
    convertTo: (city) => city?.id,
    bind: {
        label: "Выберите город",

        searchFn: () => {
            return cities.filter(item => item.country_id === country.value.modelValue)
                .map(item => ({ id: item.id, value: item.name, item }))
        },
        deps: computed(() => country.value),
        onDepsChange(ctx) {
            ctx.updateModelValue(null);
            ctx.handleSearch();
        }
    }
})

const date = ref({
    type: "date",
    modelValue: Date.now(),
    name: "date",
    rules: "required",
    convertTo: (value) => new Date(value).toLocaleDateString('ru-RU'),

    bind: {
        label: "Дата выхода",
    }
})

const isNeedAge = ref({
    type: "checkbox",
    name: "isNeedAge",
    modelValue: false,
    rules: "required",
    convertTo: (value) => value,

    bind: {
        label: "Есть 16 лет",
    }
})

const comment = ref({
    type: "textarea",
    name: "comment",
    modelValue: "",
    rules: "required",

    bind: {
        label: "Комментарий",
    }
})

const documents = ref({
    type: "file-loader",
    name: "documents",
    rules: "required",

    bind: {
        label: "Документы",
    }
})

const photo = ref({
    type: "photo-loader",
    name: "photo",
    rules: "required",

    bind: {
        label: "Выберите фото профиля",
    }
})

const tagsSelect = ref({
    type: "multiple-select",
    name: "tags",
    rules: "required",
    convertTo: (values) => values?.map(i => i.id),

    bind: {
        options: tags,
        label: "Тэги",
    }
})

const doNotConvertedForm = computed(() => {
    return {
        name: name.value.modelValue,
        phone: phone.value.modelValue,
        country: country.value.modelValue,
        city:city.value.modelValue,
        date: date.value.modelValue,
        isNeedAge: isNeedAge.value.modelValue,
        comment: comment.value.modelValue,
        documents: documents.value.modelValue,
        photo: photo.value.modelValue,
        tagsSelect: tagsSelect.value.modelValue,
    }
})
const form = useForm()
const onSubmit = form.handleSubmit((values) => {
    console.log(values);
});
</script>