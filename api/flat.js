import useFetcher from "../utils/fetch";

const flat = {
  get: async ({ id, params }) => useFetcher().get(`/flat/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/flat/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/flat/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/flat`, params),
  create: async ({ data }) => useFetcher().post(`/flat`, data),
};

export default flat;
