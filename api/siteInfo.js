import useFetcher from "../utils/fetch";

const siteInfo = {
  get: async ({ id, params }) => useFetcher().get(`/site-info/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/site-info/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/site-info/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/site-info`, params),
  create: async ({ data }) => useFetcher().post(`/site-info`, data),
};

export default siteInfo;
