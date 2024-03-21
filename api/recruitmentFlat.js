import useFetcher from "../utils/fetch";

const recruitmentFlat = {
  get: async ({ id, params }) =>
    useFetcher().get(`/recruitment-flat/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/recruitment-flat/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/recruitment-flat/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/recruitment-flat`, params),
  create: async ({ data }) =>
    useFetcher().recruitment(`/recruitment-flat`, data),
};

export default recruitmentFlat;
