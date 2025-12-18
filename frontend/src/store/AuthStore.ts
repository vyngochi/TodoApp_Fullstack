import { Store } from "@tanstack/store";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}
export const authStore = new Store<AuthState>({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
});

export const setLoginSuccess = (loginInfo: AuthState) => {
  authStore.setState((state) => {
    return {
      ...state,
      accessToken: loginInfo.accessToken,
      refreshToken: loginInfo.refreshToken,
      isAuthenticated: loginInfo.isAuthenticated,
    };
  });
};

export const logout = () => {
  authStore.setState((state) => {
    localStorage.removeItem("accessToken");
    return {
      ...state,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
  });
};
