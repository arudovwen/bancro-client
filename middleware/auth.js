export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Redirect to homepage if the user is already logged in and trying to access authentication-related routes
  if (authStore.isLoggedIn && to?.name.includes("auth")) {
    abortNavigation();
    return navigateTo("/");
  }

  // Redirect to login if the user is not logged in and trying to access routes other than authentication-related routes
  if (!authStore.isLoggedIn && !to?.name.includes("auth")) {
    abortNavigation();
    return navigateTo(`/auth/login?redirected_from=${to.path}`);
  }
  if (authStore.isLoggedIn && !to.meta?.roles?.includes(authStore.userRole.toLowerCase())) {
    abortNavigation();
    return navigateTo(`/`);
  }
});
