import { createRoute } from "./utils";

export const SIGN_IN = "/auth/sign-in";
export const SIGN_UP = '/auth/register';
export const RESET_PASSWORD = '/auth/reset-password';
export const RESET_PASSWORD_SIGN_IN = '/auth/reset-password/sign-in';
export const RESET_PASSWORD_OTP = '/auth/reset-password/otp';


export const APP_DEFAULT_PAGE = () => '/dashboard';
// export const DASHBOARD = (id: string) => createRoute([id, 'dashboard']);

export const SUBMISSIONS = '/submissions'
export const SCHOOL_CONFIG = `/school-configuration`;


// export const DASHBOARD = `/dashboard`;

//Query Parameter
export const APP_DRAWER = 'drawer'
export const APP_CANCEL_DIALOG = 'cancel_dialog'
export const APP_ERP_SETTINGS_DIALOG = 'ces_dialog' 
export const APP_IMPORT_DIALOG = 'imp_dialog' 