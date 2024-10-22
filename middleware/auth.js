export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  const isAuthRoute = to?.name.includes("auth");
  const isLoggedIn = authStore.isLoggedIn;

  // If the user is logged in and trying to access authentication-related routes, redirect to the homepage
  if (isLoggedIn && isAuthRoute) {
    abortNavigation();
    return navigateTo("/");
  }

  // If the user is not logged in and trying to access non-auth routes, redirect to login
  if (!isLoggedIn && !isAuthRoute) {
    abortNavigation();
    return navigateTo(`/auth/login?redirected_from=${to.path}`);
  }
});
