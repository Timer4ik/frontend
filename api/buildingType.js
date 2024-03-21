import useFetcher from "../utils/fetch";

const buildingType = {
  get: async ({ id, params }) =>
    useFetcher().get(`/building-type/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/building-type/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/building-type/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/building-type`, params),
  create: async ({ data }) => useFetcher().post(`/building-type`, data),
};

export default buildingType;
