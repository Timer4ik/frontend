import useFetcher from "../utils/fetch";

const recruitment = {
  get: async ({ id, params }) => useFetcher().get(`/recruitment/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/recruitment/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/recruitment/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/recruitment`, params),
  create: async ({ data }) => useFetcher().recruitment(`/recruitment`, data),
};

export default recruitment;
