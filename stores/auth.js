import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const loggedUser = ref("");

    const isLoggedIn = computed(() => !!loggedUser.value);
    const refresh_token = computed(() => loggedUser?.value?.token.refreshToken);
    const access_token = computed(() => loggedUser?.value?.token?.token);
    const tenantId = computed(() => loggedUser?.value?.tenantId);
    const userRole = computed(() => loggedUser?.value?.userRole);
    const userId = computed(() => loggedUser?.value?.id);
    const userInfo = computed(() => loggedUser?.value);
    const fullName = computed(
      () => `${loggedUser?.value?.firstName} ${loggedUser?.value?.lastName}`
    );
    const companyName = computed(() => `${loggedUser?.value?.companyName}`);
    const email = computed(() => `${loggedUser?.value?.email}`);

    function setLoggedUser(data) {
      loggedUser.value = data;
      // setAccessToken(data?.token?.token || null);
      // setRefreshToken(data?.token?.refreshToken || null);
    }

    function setAccessToken(value) {
      let userInfo = { ...loggedUser?.value, access_token: value };
      setLoggedUser(userInfo);
    }
    function setRefreshToken(value) {
      let userInfo = { ...loggedUser?.value, refresh_token: value };
      setLoggedUser(userInfo);
    }
    function updateUser(value) {
      let userInfo = { ...loggedUser?.value, fullName: value };
      setLoggedUser(userInfo);
    }
    function updateAccountType(value) {
      let userInfo = { ...loggedUser?.value, accountType: value };

      setLoggedUser(userInfo);
    }
    function updateUserInfo(data) {
      let userInfo = { ...loggedUser?.value, ...data };
      setLoggedUser(userInfo);
    }

    const logOut = () => {
      localStorage.clear();
      setLoggedUser(null);
      navigateTo("/auth/login");
    };
    return {
      updateUser,
      isLoggedIn,
      refresh_token,
      access_token,
      userId,
      userInfo,
      setRefreshToken,
      setAccessToken,
      updateAccountType,
      updateUserInfo,
      setLoggedUser,
      logOut,
      loggedUser,
      tenantId,
      userRole,
      fullName,
      companyName,
      email,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
