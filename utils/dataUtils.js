export const convertToFormData = (data) => {

    const dataKeys = Object.keys(data)

    const formData = new FormData()

    dataKeys.forEach((key) => {
        formData.append(key, data[key])
    })

    return formData
}

// Устанавливает в массив вида [ {name:'title'},{name:'content'} ] данные из объекта {title:'hello',name:'hello'}
export const fieldsWithData = (model, data) => {
    if (!data) return []

    const { ..._data } = data

    return model.map((item) => {
        if (item.name && _data && !item._value) {
            return {
                ...item,
                _value: _data[item.name]
            }
        }
        return item;
    });
}