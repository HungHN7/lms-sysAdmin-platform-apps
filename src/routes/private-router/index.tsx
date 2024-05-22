import React from 'react';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { LoadingPage } from 'src/components';
import { useStoreDispatch } from 'src/hooks/useStoreDispatch';
import { useStoreSelector } from 'src/hooks/useStoreSelector';
import { logout, saveUser } from 'src/redux/slices/user-slice';
import { useLazyGetUserSettingsQuery } from 'src/services';
import { getToken } from 'src/utils/token';

const PrivateRoute = () => {
  const [searchParams] = useSearchParams();
  const { user } = useStoreSelector((state) => state.userSlice);
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const [getUserSetting, { isFetching }] = useLazyGetUserSettingsQuery();

  const token = getToken();

  const actionLogout = () => {
    dispatch(logout());
    navigate('/login', {
      state: {
        from: `${location.pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`,
      },
    });
  };

  React.useEffect(() => {
    if (token && !user) {
      getUserSetting({})
        .unwrap()
        .then((data) => {
          if (data.data) {
            localStorage.setItem('roles', data?.data?.roles);
            dispatch(saveUser(data.data));
          } else {
            actionLogout();
          }
        })
        .catch(() => {
          actionLogout();
        });
    }
  }, [token, user]);

  if (!token) {
    return (
      <Navigate
        to='/login'
        state={{
          from: `${location.pathname}${
            searchParams.toString() ? '?' + searchParams.toString() : ''
          }`,
        }}
        replace
      />
    );
  }

  return (
    <LoadingPage isLoading={isFetching}>
      <Outlet />
    </LoadingPage>
  );
};

export default PrivateRoute;
