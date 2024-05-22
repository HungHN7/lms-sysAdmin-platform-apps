export const phoneNumberRegex = /^[\d()+-]{9,15}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
export const fieldRegex = /^[A-Za-z0-9_.-]*$/;
export const nameRegex = /^[a-zA-Z0-9\s]*$/;
// Map Regex with Back End
export const EMAIL_REGEX =
  /^[_A-Za-z0-9-+']+(\.['_A-Za-z0-9-+]+)*@[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*(\.[A-Za-z]{2,100})$/;
export const USERNAME_REGEX = /^[A-Za-z0-9_.-]+$/;
export const PASSWORD_REGEX = /^(?! )(?!.* $)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s ]).{8,50}$/;
export const SUBDOMAIN_REGEX = /^[a-zA-Z0-9_-]+$/;
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
