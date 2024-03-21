import useFetcher from "../utils/fetch";

const user = {
  get: async ({ id, params }) => useFetcher().get(`/company/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/company/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/company/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/company`, params),
  create: async ({ data }) => useFetcher().post(`/company`, data),
};

export default user;
