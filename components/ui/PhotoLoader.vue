<template>
    <UiControl :label="label" :invalid="!!errorMessage || invalid" :message="errorMessage || message"
        :rightIcon="rightIcon">
        <UiStack flex="same-all" gap="3">
            <label class="control__photoloader photoloader__block" :class="{ error: errorMessage }">
                <input @change="handleOnFileChange" v-bind="$attrs" class='photoloader__input' type="file" />
                <!-- <img class='photoloader__image' src="/img/icons/upload.svg" alt="" /> -->
                <div class='photoloader__title'>Upload a file or drag and drop</div>
                <div class='photoloader__subtitle'>PNG, JPG, GIF up to 3MB</div>
            </label>
            <img class="photoloader__preview" @click="handleFileRemove" :src="modelValue?.path" alt="">
        </UiStack>
    </UiControl>
</template>
<script setup >
defineComponent({
    inheritAttrs: false
})

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: Array,
        default: []
    },
    upload: {
        type: Function,
        required: true
    },
    invalid: Boolean,
    rightIcon: String,
    message: String,
    label: String,
    placeholder: String,
    maska: String,
    dataMaskaReversed: Boolean,
    maskaTokens: String,
    errorMessage: String,
    onChange: Function,
    deps: [Array, Object, String, Number],
    onDepsChange: {
        type: Function
    },
    forceDeps: Boolean
});

function handleOnFileChange(event) {

    const { upload } = props

    if (!upload) return

    const file = event?.target?.files?.[0]

    if (!file) return emit('update:modelValue', null)

    upload(file).then(data => {
        emit('update:modelValue', data)
    }).catch((err) => {
        useNuxtApp().$toast.error(err.data.errors.image.join("\n"))
    })

    event.target.value = "";
}

function handleFileRemove() {
    emit('update:modelValue', null)
}

</script>

<style lang="scss"></style>