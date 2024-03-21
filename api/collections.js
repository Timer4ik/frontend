import useFetcher from "../utils/fetch";

const collections = {
  get: async ({ id, params }) => useFetcher().get(`/collection/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/collection/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/collection/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/collection`, params),
  create: async ({ data }) => useFetcher().post(`/collection`, data),
};

export default collections;
