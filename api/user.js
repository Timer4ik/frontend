import useFetcher from "../utils/fetch";

const user = {
  get: async ({ id, params }) => useFetcher().get(`/user/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/user/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/admin/user/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/user`, params),
  create: async ({ data }) => useFetcher().post(`/user`, data),
  password: async ({ id, data, params }) =>
    useFetcher().patch(`/user-password`, data, params),
};

export default user;
