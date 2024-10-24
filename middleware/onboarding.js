export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const isOnboarding = to?.name.includes("onboarding");
  const isLoggedIn = authStore.isLoggedIn;

  if (isLoggedIn) {
    if (
      !isOnboarding &&
      authStore.userInfo.onboardingStage?.toLowerCase() === "signin"
    ) {
      abortNavigation();
      return navigateTo("/onboarding");
    }
  }
});
