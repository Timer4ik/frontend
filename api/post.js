import useFetcher from "../utils/fetch";

const post = {
  get: async ({ id, params }) => useFetcher().get(`/post/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/post/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/post/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/post`, params),
  create: async ({ data }) => useFetcher().post(`/post`, data),
};

export default post;
