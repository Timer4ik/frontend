import useFetcher from "../utils/fetch";

const file = {
  get: async ({ id, params }) => useFetcher().get(`/file/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/file/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/file/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/file`, params),
  create: async (image) => {
    const formData = new FormData();

    formData.append("image", image);

    return useFetcher().post(`/file`, formData);
  },
};

export default file;
