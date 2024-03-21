import useFetcher from "../utils/fetch";

const mainBaner = {
  get: async ({ id, params }) => useFetcher().get(`/main-banner/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/main-banner/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().put(`/main-banner`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/main-banner`, params),
  create: async ({ data }) => useFetcher().post(`/main-banner`, data),
};

export default mainBaner;
