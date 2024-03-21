import useFetcher from "../utils/fetch";

const siteSeo = {
  get: async ({ id, params }) => useFetcher().get(`/site-seo/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/site-seo/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/site-seo/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/site-seo`, params),
  create: async ({ data }) => useFetcher().post(`/site-seo`, data),
};

export default siteSeo;
