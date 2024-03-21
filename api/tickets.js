import useFetcher from "../utils/fetch";

const tickets = {
  get: async ({ id, params }) => useFetcher().get(`/ticket/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/ticket/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/ticket/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/ticket`, params),
  create: async ({ data }) => useFetcher().post(`/ticket`, data),
};

export default tickets;
