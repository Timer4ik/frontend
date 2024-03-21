
<template>
    <UiControl :invalid="!!errorMessage" :message="errorMessage || message">
        <label class='control__checkbox checkbox'>
            <input v-bind="$attrs" class='checkbox__input' type="checkbox" :checked="modelValue" @input="handleChange" />
            <div class='checkbox__label' v-if="label">
                {{ label }}
            </div>
        </label>
    </UiControl>
</template>
<script setup>
defineComponent({
    inheritAttrs: false
})

const emits = defineEmits(["update:modelValue"])

const props = defineProps({
    label: String,
    modelValue: [Boolean, Number, String],
    message: String,
    placeholder: String,
    errorMessage: String,
    onChange: Function,
    deps: [Array, Object, String, Number],
    onDepsChange: {
        type: Function
    },
    forceDeps: Boolean,
    innerConvertTo:Function
})

function handleChange(event) {
    emits('update:modelValue', props?.innerConvertTo?.(event.target.checked) ?? event.target.checked)
    props?.onChange?.(event)
}



const ctx = computed(() => ({
    modelValue: props.modelValue,
    handleChange, handleChange,
    updateModelValue: (value) => emits('update:modelValue', value)
}))

watch(() => props.deps, (cur, prev) => {
    if (Array.isArray(prev) ? prev.find(item => item !== undefined) : prev !== undefined) {
        props?.onDepsChange?.(ctx.value)
    }
}, {
    deep: true,
    immediate: props.forceDeps
})
</script>

<style lang="scss"></style>