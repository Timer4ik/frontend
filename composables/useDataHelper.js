/*
компосаблес используется для упрощения получения массива данных и работы с ним 
@api - строка в виде 'tour.getAll' - где tour - название обьекта запроса , getAll - метод запроса
@params - обьект с переменными запроса по типу {id:1}
@requestParams id 
@
@filters - обьект с переменными фильтра, работает только с компосаблесом useFilters (из-за проблем с прокси) - там же и extend
@callback  - функция срабатывает послк получения данных
@popup вывести алерт при ошибке
*/

import _ from "lodash";

import Utils, {
  formatObjectReverse,
  setProperty,
  mergeObjectsData,
} from "~~/utils/base";

const useDataHelper = ({
  api,
  params = {},
  filters = {},
  requestParams = {},
  callback,
  headers = null,
  initialValue = null,
  init = true,
  isWatchQuery = false,
  afterInit = () => {},
  name = null,
  popup = true,
}) => {
  try {
    const { accessToken } = useAuth();
    const { $apis } = useNuxtApp();
    const apis = $apis;
    const route = useRoute();
    const id = _.uniqueId();
    const data = useState(`data-${id}`, () => null);
    const loading = useState(`loading-${id}`, () => true);
    const error = useState(`error-${id}`, () => false);
    const meta = useState(`meta-${id}`, () => []);
    const [apiName, apiMethod] = api?.split(".") ?? [null, null];

    //берем фильтр по имени чтобы не следить за изменениями в адресной строке
    const { currentFilterForm } = useFilters({ name: name });

    const initialData = useState(`initialData-${id}`, () => {
      try {
        if (initialValue?.value && Array?.isArray(initialValue?.value)) {
          let temp = {};
          initialValue.value.map((item) => {
            temp[item.name] = item?.value ?? null;
          });
          return temp;
        }
        if (initialValue && Array?.isArray(initialValue)) {
          let temp = {};
          initialValue.map((item) => {
            temp[item.name] = item?.value ?? null;
          });
          return temp;
        }

        return initialValue ?? data?.value;
      } catch (error) {
        console.error(error);
      }
    });

    const get = _.debounce(async (filter = {}) => {
      try {
        loading.value = true;

        let pre;
        if (!initialData?.value || api) {
          if (apiName) {
            const queryParams =
              isWatchQuery && route.query
                ? route.query
                : name
                ? currentFilterForm.value
                : {};

            const prepareReauestData = {
              params: {
                ...queryParams,
                ...filters?.value,
                ...filter,
              },
            };

            if (headers) {
              prepareReauestData["headers"] = headers;
            }

            prepareReauestData["headers"] = {
              authorization: "Bearer " + accessToken.value,
            };

            pre = await apis[apiName][apiMethod]({
              ...requestParams,
              params: { ...params, ...prepareReauestData },
            }).then((res) => {
              meta.value = res?._meta ? Utils.cloneDeep(res._meta) : [];
              return res;
            });
          }
        } else {
          pre = Utils.cloneDeep(initialData?.value);
        }

        if (pre?.isError) {
          error.value = pre;
          data.value = null;
          if (popup) {
            pre?.popup?.();
          }
        } else {
          pre = pre?.data ?? pre?.result ?? pre;
          pre = callback?.(pre) ?? pre;
          data.value = pre;
          if (!initialValue) {
            initialData.value = Utils.cloneDeep(data?.value);
          }
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.error("get", error);
        Utils?.notify(error);
      }
    }, 0);

    const loader = async (func) => {
      return async function () {
        try {
          loading.value = true;
          const response = await func();
          loading.value = false;
        } catch (error) {
          loading.value = false;
        }
      };
    };

    //функция для редактирования данных
    const set = (field, val, idx) => {
      try {
        if (idx || typeof idx === "number") {
          setProperty(data.value[idx], field, val);
        } else {
          setProperty(data.value, field, val);
        }
      } catch (error) {
        console.error("set", error);
      }
    };

    onMounted(async () => {
      try {
        //нужно ли делать запрос при иницилизации страницы
        if (init) {
          await get({ ...params, ...requestParams });
          afterInit();
        }
      } catch (error) {
        console.error(error);
      }
    });

    //функция для получения измененных данных
    const getClearData = (array = false) => {
      try {
        console.error(initialData?.value);
        return formatObjectReverse(
          mergeObjectsData(initialData?.value, data.value, array),
          array
        );
      } catch (error) {
        console.error(error);
      }
    };

    function setData(initialValue) {
      try {
        initialData.value = initialValue;
      } catch (error) {
        console.error(error);
      }
    }

    //При изменения фильров из вне
    watch(
      [filters],
      async () => {
        await get({ ...params, ...requestParams });
      },
      { deep: true }
    );

    return {
      data,
      loading,
      get,
      set,
      error,
      getClearData,
      setData,
      meta,
      initialData,
      loader,
    };
  } catch (error) {
    console.error(error);
  }
};

export default useDataHelper;
