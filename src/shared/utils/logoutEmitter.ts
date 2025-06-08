let logoutFn: (() => Promise<void>) | null = null;

const setLogoutFn = (callback: () => Promise<void>) => {
  logoutFn = callback;
};

const triggerLogout = async () => {
  if (logoutFn) {
    await logoutFn();
  }
};

export { setLogoutFn, triggerLogout };
