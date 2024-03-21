import useFetcher from "../utils/fetch";

const alertUsers = {
  get: async ({ id, params }) => useFetcher().get(`/alert-user/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/alert-user/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/alert-user/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/alert-user`, params),
  create: async ({ data }) => useFetcher().post(`/alert-user`, data),
};

export default alertUsers;
