// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/styles/null.scss", "~/assets/styles/style.scss"],
  build: { transpile: ["vue-toastification"] },
  runtimeConfig: {
    public: {
      HOST: process.env.HOST,
      API_URL: `${process.env.API_URL}`,
    },
  },
})
