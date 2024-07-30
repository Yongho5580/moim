interface Routes {
  [key: string]: boolean;
}

export const PUBLIC_URLS: Routes = {};

export const PUBLIC_ONLY_URLS: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
};

export const PRIVATE_ONLY_URLS: Routes = {};
