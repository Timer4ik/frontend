export default defineNuxtRouteMiddleware((to) => {
  const { accessToken } = useAuth();

  const loginPage = "login";

  if (
    !accessToken.value &&
    to?.name !== loginPage &&
    to?.meta?.layout !== "public" &&
    to?.meta?.layout !== "auth"
  ) {
    return navigateTo({ name: loginPage });
  }
});
