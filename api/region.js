import useFetcher from "../utils/fetch";

const region = {
  get: async ({ id, params }) => useFetcher().get(`/region/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/region/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/region/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/region`, params),
  create: async ({ data }) => useFetcher().post(`/region`, data),
};

export default region;
