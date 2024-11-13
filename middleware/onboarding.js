export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const isOnboarding = to?.name?.includes("onboarding");
  const isLoggedIn = authStore.isLoggedIn;
  const hasPin = authStore.isPinSet;
  const hasBVN = authStore.isBVNSet;

  if (isLoggedIn) {
    // If logged in but no PIN and not on onboarding
    if (!isOnboarding && (!hasPin)) {
      return navigateTo("/onboarding");
    }
    // If logged in and already on onboarding, redirect to home
    if (isOnboarding  && hasPin) {
      return navigateTo("/");
    }
  } else {
    // Optionally handle redirects for not logged in users
    // For example, if you want to redirect them to a login page
    // if (!to.name.includes('login')) {
    //   return navigateTo('/login');
    // }
  }
});
