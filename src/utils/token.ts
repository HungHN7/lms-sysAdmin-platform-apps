export const getIsRemember = () =>
  (localStorage.getItem('isRemember') && JSON.parse(localStorage.getItem('isRemember') ?? '')) ||
  false;

export const getToken = () =>
  getIsRemember() ? localStorage.getItem('access_token') : sessionStorage.getItem('access_token');

export const setToken = (token: string, isRemember?: boolean) => {
  if (isRemember) {
    localStorage.setItem('access_token', token);
  } else {
    sessionStorage.setItem('access_token', token);
  }
};
export const removeItem = () => {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');
};
export const clearToken = () => {
  localStorage.removeItem('access_token');
  sessionStorage.removeItem('access_token');

  localStorage.removeItem('refresh_token');
};
