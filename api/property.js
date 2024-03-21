import useFetcher from "../utils/fetch";

const property = {
  get: async ({ id, params }) => useFetcher().get(`/property/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/property/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/property/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/property`, params),
  create: async ({ data }) => useFetcher().post(`/property`, data),
};

export default property;
