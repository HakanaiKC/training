type UserLogin = {
  userID: string;
  password: string;
};

const TOKEN_KEY = "token";

const isWindow: any = typeof window !== "undefined";

const removeToken = (): void => {
  isWindow && localStorage.removeItem(TOKEN_KEY!);
};

const setToken = (token: string): void => {
  isWindow && localStorage.setItem(TOKEN_KEY!, token);
};

const getToken = (): any => {
  return (isWindow && localStorage.getItem(TOKEN_KEY!)) || null;
};

function isLoggedIn() {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
}

const AuthService = {
  removeToken,
  setToken,
  getToken,
  isLoggedIn
};

export default AuthService;
