import useFetcher from "../utils/fetch";

const sitePage = {
  get: async ({ id, params }) => useFetcher().get(`/site-page/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/site-page/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/site-page/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/site-page`, params),
  create: async ({ data }) => useFetcher().post(`/site-page`, data),
};

export default sitePage;
