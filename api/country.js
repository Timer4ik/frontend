import useFetcher from "../utils/fetch";

const country = {
  get: async ({ id, params }) => useFetcher().get(`/country/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/country/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/country/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/country`, params),
  create: async ({ data }) => useFetcher().post(`/country`, data),
};

export default country;
