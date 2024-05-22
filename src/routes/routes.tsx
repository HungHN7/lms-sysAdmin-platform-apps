import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from 'src/components/layout';
import {
  AuthorApp,
  CurriculumApp,
  ErrorPage,
  ForgotPassword,
  Home,
  IntegrationApp,
  Login,
  NotFound,
  ProfilePage,
  ResetPassword,
  ResetPasswordHasReset,
  TenantApp,
  TenantUserRegistration,
} from 'src/pages';
import TenantRegistration from 'src/pages/tenant-registration';
import globalRouter from './globalRouter';
import PrivateRoute from './private-router';
import { SITE_MAP } from './site-map';
import CheckEmail from 'src/pages/check-email';
import VerificationEmail from 'src/pages/verification-email';
import LandingPage from 'src/pages/langding-page';

const Router = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route
          path='/'
          element={<Layout />}
        >
          {/* <Route
            index
            element={
              <Navigate
                to={SITE_MAP.CURRICULUM.path}
                replace
              />
            }
          /> */}
          <Route
            path={SITE_MAP.SYS_ADMIN.path}
            element={<CurriculumApp />}
          />
          <Route
            path={SITE_MAP.TENANT.path}
            element={<TenantApp />}
          />
          <Route
            path={SITE_MAP.ERROR.path}
            element={<ErrorPage />}
          />
          <Route
            path={SITE_MAP.INTEGRATION.path}
            element={<IntegrationApp />}
          />
          <Route
            path={SITE_MAP.PROFILE.path}
            element={<ProfilePage />}
          />
          <Route
            index
            path={SITE_MAP.COMPONENT.path}
            element={<Home />}
          />
        </Route>

        <Route
          path={SITE_MAP.AUTHOR.path}
          element={<AuthorApp />}
        />
      </Route>

      <Route
        path={SITE_MAP.AUTH.LOGIN.path}
        element={<Login />}
      />
      <Route
        path={SITE_MAP.TENANT_REGISTRATION.path}
        element={<TenantRegistration />}
      />

      <Route
        path={SITE_MAP.ADMINISTRATOR.path}
        element={<Login />}
      />

      <Route
        path={SITE_MAP.AUTH.FORGOT_PASSWORD.path}
        element={<ForgotPassword />}
      />

      <Route
        path={SITE_MAP.NOT_FOUND.path}
        element={<NotFound />}
      />
      <Route
        path='*'
        element={<NotFound />}
      />

      <Route
        path={SITE_MAP.TENANT_USER_REGISTRATION.path}
        element={<TenantUserRegistration />}
      />

      <Route
        path={SITE_MAP.AUTH.RESET_PASSWORD.path}
        element={<ResetPassword />}
      />
      <Route
        path={SITE_MAP.CHECK_EMAIL.path}
        element={<CheckEmail />}
      />
      <Route
        path={SITE_MAP.VERIFICATION_STATUS.path}
        element={<VerificationEmail />}
      />
      <Route
        path={SITE_MAP.LANDING_PAGE.path}
        element={<LandingPage />}
      />
      <Route
        path={SITE_MAP.VERIFY_TENANT.path}
        element={<VerificationEmail />}
      />
      <Route
        path={SITE_MAP.VERIFY_USER.path}
        element={<VerificationEmail />}
      />
      <Route
        path={SITE_MAP.AUTH.RESET_PASSWORD_HAS_RESET.path}
        element={<ResetPasswordHasReset />}
      />
    </Routes>
  );
};

export default Router;
