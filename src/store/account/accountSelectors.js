export const accountSelectors = {
  getAccount: state => ({
    userId: state.account.userId,
    username: state.account.username,
    createdAt: state.account.createdAt,
  }),
  isLoading: state => state.account.isLoading,
};
