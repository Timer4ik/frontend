import useFetcher from "../utils/fetch";

const favorite = {
  get: async ({ id, params }) => useFetcher().get(`/favorite/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/favorite/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/favorite/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/favorite`, params),
  create: async (data) => useFetcher().post(`/favorite`, data),
};

export default favorite;
