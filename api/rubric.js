import useFetcher from "../utils/fetch";

const rubric = {
  get: async ({ id, params }) => useFetcher().get(`/rubric/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/rubric/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/rubric/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/rubric`, params),
  create: async ({ data }) => useFetcher().post(`/rubric`, data),
};

export default rubric;
