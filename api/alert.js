import useFetcher from "../utils/fetch";

const alert = {
  get: async ({ id, params }) => useFetcher().get(`/alert/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/alert/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/alert/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/alert`, params),
  create: async ({ data }) => useFetcher().post(`/alert`, data),
};

export default alert;
