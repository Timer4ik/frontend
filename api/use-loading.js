import Utils from "~/utils/base";

const useLoading = () => {
  const id = Utils.uniqueId();
  const loading = useState(`selected-${id}`, () => false);

  const loadingOn = (e) => {
    loading.value = true;
  };

  const loadingOff = (e) => {
    loading.value = false;
  };

  return { loading, loadingOff, loadingOn };
};

export default useLoading;
