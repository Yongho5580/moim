interface Routes {
  [key: string]: boolean;
}

export const PUBLIC_ONLY_URLS: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export const PRIVATE_URLS = {};
