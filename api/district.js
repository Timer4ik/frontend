import useFetcher from "../utils/fetch";

const district = {
  get: async ({ id, params }) => useFetcher().get(`/district/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/district/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/district/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/district`, params),
  create: async ({ data }) => useFetcher().post(`/district`, data),
};

export default district;
