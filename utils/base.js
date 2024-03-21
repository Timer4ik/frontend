import { useToast } from "vue-toastification";
const toast = useToast();

export const warningPopup = (message = "Упс что то пошло не так!") => {
  try {
    toast.error(message, 2000);
  } catch (error) {
    console.error("warningPopup", error);
  }
};

export function getErrorData(error) {
  try {
    let errorMessage = `${
      error?.data?.errors?.message ??
      error?.message ??
      `Что то пошло не так: ${error}`
    }`;

    if (error?.data?.errors?.messages) {
      for (let message in error?.data?.errors?.messages) {
        errorMessage += ": " + error?.data?.errors?.messages[message];
      }
    }

    const popup = () => {
      toast.error(errorMessage, 2000);
    };

    return {
      error: true,
      isError: true,
      message: errorMessage,
      errorResponse: error,
      popup: popup,
    };
  } catch (error) {
    console.error("notify", error);
  }
}

export const notify = (error) => {
  try {
    let errorMessage = `${
      error?.data?.errors?.message ??
      error?.message ??
      `Что то пошло не так: ${error}`
    }`;
    if (error?.data?.errors?.messages) {
      for (let message in error?.data?.errors?.messages) {
        errorMessage += ": " + error?.data?.errors?.messages[message];
      }
    }
    toast.error(errorMessage);
  } catch (error) {
    console.error("notify", error);
  }
};

export const success = (message = "Данные успешно сохранены") => {
  try {
    toast.success(message, 2000);
  } catch (error) {
    console.error(error);
  }
};

export const checkSaved = (resp, callback, message = null, errorCallback) => {
  try {
    if (
      resp.errors ||
      resp?.error ||
      (resp?.length && (resp[0]?.error || resp[0]?.errors))
    ) {
      if (errorCallback) {
        errorCallback(resp);
      }
      notify(resp);
    } else {
      success(resp?.message ?? message ?? "Данные успешно сохранены");
      typeof callback == "function" ? callback(resp) : null;
    }
  } catch (error) {
    console.error("checkSaved", error);
  }
};

function cloneDeep(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function objNotEmpty(obj) {
  if (typeof obj !== "object" || obj == null) return;
  return !!Object.keys(obj).length;
}

function uniqueId() {
  var idstr = String.fromCharCode(Math.floor(Math.random() * 25 + 65));
  do {
    var ascicode = Math.floor(Math.random() * 42 + 48);
    if (ascicode < 58 || ascicode > 64) {
      idstr += String.fromCharCode(ascicode);
    }
  } while (idstr.length < 32);

  return idstr;
}

const isObject = (obj) => {
  return obj && typeof obj == "object" && !Array?.isArray(obj);
};

const isArray = (obj) => {
  return obj && typeof obj == "object" && Array?.isArray(obj);
};

export const mergeObjectsData = (initialData, data, formatArray) => {
  try {
    let pre = {};
    if (Utils.isObject(initialData)) {
      Object.entries(initialData).forEach(([key, value]) => {
        // console.error(initialData);
        if (Utils.isObject(value)) {
          pre[key] = mergeObjectsData(value, data[key]);
        } else {
          if (JSON.stringify(value) == JSON.stringify(data[key])) {
            pre[key] = { value: value, edit: false };
          } else {
            pre[key] = { value: data[key], edit: true };
          }
        }
      });

      return pre;
    } else if (Array.isArray(initialData) && formatArray) {
      pre = initialData.map((item, idx) => {
        return mergeObjectsData(item, data[idx]);
      });
      return pre;
    } else {
      return initialData.value;
    }
  } catch (error) {
    console.error("formatObject", error);
  }
};

export const formatObject = (data, formatArray) => {
  //**formatArray -нужно ли обрабатывать вложенный массив  */
  try {
    let pre = {};
    if (Utils.isObject(data)) {
      Object.entries(data).forEach(([key, value]) => {
        if (Utils.isObject(value) || Array.isArray(value)) {
          pre[key] = formatObject(value, formatArray);
        } else {
          pre[key] = { value: value, edit: false };
        }
      });
      return pre;
    } else if (Array.isArray(data) && formatArray) {
      pre = data.map((item) => {
        return formatObject(item, formatArray);
      });

      return pre;
    } else {
      return data;
    }
  } catch (error) {
    console.error("formatObject", error);
  }
};

export const formatObjectReverse = (
  data,
  getId = false,
  formatArray = true
) => {
  //**formatArray -нужно ли обрабатывать вложенный массив  */
  try {
    let pre = {};
    if (Utils.isObject(data)) {
      Object.entries(data).forEach(([key, value]) => {
        if (
          Utils.isObject(value) &&
          Object?.keys(value)?.length &&
          !Object?.keys(value)?.includes("edit")
        ) {
          let val = formatObjectReverse(value, getId);
          if (val) {
            pre[key] = val;
            if (getId && data.hasOwnProperty("id")) pre["id"] = data?.id?.value;
          } else {
            return null;
          }
        } else {
          if (value?.edit && value?.value) {
            pre[key] = value?.value;
          }
        }
      });
      if (Utils.objNotEmpty(pre)) return pre;
    } else if (Array.isArray(data) && formatArray) {
      pre = data
        .map((item) => {
          return formatObjectReverse(item, getId);
        })
        .filter((item) => !!item);
      return pre;
    } else {
      return data;
    }
  } catch (error) {
    console.error("formatObjectReverse", error);
  }
};

export const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

export const isArraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

export const goTo = (route) => {
  if (process.client && route) {
    Object.assign(document.createElement("a"), {
      target: "_blank",
      rel: " noreferrer",
      href: route,
    }).click();
  }
};

export function getProperty(obj, path, def) {
  try {
    const names = path.split(".");
    let pre = obj;
    for (var i = 0; i < names.length; i++) {
      pre = pre?.[names[i]];
      if (!pre) def;
    }
    return pre;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function setProperty(obj, path, value) {
  try {
    const r = !!obj?.value;
    const names = path.split(".");

    if (r) {
      for (var i = 0; i < names.length - 1; i++) {
        obj = obj[names[i]];
        if (!obj) return;
      }
      obj.value[names[names.length - 1]] = value;
    } else {
      for (var i = 0; i < names.length - 1; i++) {
        obj = obj[names[i]];
        if (!obj) return;
      }
      obj[names[names.length - 1]] = value;
    }
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export const getByString = (obj, name) => {
  try {
    let pre = obj;
    const names = name.split(".");
    for (let nam in names) {
      pre = pre[names[nam]];
    }
    return pre;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const Utils = {
  debounce,
  isArray,
  isObject,
  uniqueId,
  checkSaved,
  objNotEmpty,
  cloneDeep,
  setProperty,
  getProperty,
  warningPopup,
  getErrorData,
  notify,
  success,
};

export default Utils;
