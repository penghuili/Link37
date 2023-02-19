export const authSelectors = {
  isCheckingRefreshToken: state => state.auth.isCheckingRefreshToken,
  isLoggedIn: state => state.auth.isLoggedIn,
  isLoading: state => state.auth.isLoading,
  getErrorMessage: state => state.auth.errorMessage,
};
