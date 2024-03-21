export function useComponents() {
  return {
    text: () => resolveComponent("UiField"),
    select: () => resolveComponent("UiMultiSelect"),
    selectMultiple: () => resolveComponent("UiMultiMSelect"),
    textarea: () => resolveComponent("UiTextarea"),
    checkbox: () => resolveComponent("UiCheckbox"),
    date: () => resolveComponent("UiDatePicker"),
    fileLoader: () => resolveComponent("UiFileLoader"),
    photoLoader: () => resolveComponent("UiPhotoLoader"),
    photoLoaderMultiple: () => resolveComponent("UiMPhotoLoader"),
  };
}

export function useNamedObjects(model) {
  return model.reduce((prev, item) => {
    prev[item.name] = {
      ...item,
    };
    return prev;
  }, {});
}
