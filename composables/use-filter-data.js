export default () => {
  const properties = useState("properties");
  const editedProperties = useState("editedProperties");

  const setProperties = (_properties) => {
    const pre = [];
    _properties?.length &&
      _properties?.forEach((item, idx) => {
        let initialValue = item.value ? [item.value]:[];;
        switch (item.type) {
          case "input":
            initialValue = item.value ? item.value:'';
            break;
          default:
            break;
        }
        pre.push({ ...item, sort: idx, name: item.name, value: initialValue });
      });
    properties.value = pre;
    console.log(pre.map(i => ({name:i.name,value:i.value})));
    editedProperties.value = pre;
  };

  return {
    properties,
    editedProperties,
    setProperties,
  };
};
