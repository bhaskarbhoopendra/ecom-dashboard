import { Routes, RouterModule } from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: 'content-layout',
    loadChildren: () => import('../../pages/content-layout-page/content-pages.module').then(m => m.ContentPagesModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../../pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'otpverify',
    loadChildren: () => import('../../otp-verify/otp-verify.module').then(m => m.OtpVerifyModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('../../reset-password/reset-password.module').then(m => m.resetPassModule)

  },
  {
    path: 'register',
    loadChildren: () => import('../../pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('../../pages/forgot-password/forgot-password.module').then(m => m.ForgotpasswordModule)
  }
];
