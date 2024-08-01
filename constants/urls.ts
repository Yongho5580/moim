interface Routes {
  [key: string]: boolean;
}

export const PUBLIC_URLS: Routes = {};

export const PUBLIC_ONLY_URLS: Routes = {
  // Page URL
  "/": true,
  "/login": true,
  "/login/error": true,
  "/create-account": true,
  // OAuth 2.0
  "/kakao/start": true,
  "/kakao/complete": true,
  "/github/start": true,
  "/github/complete": true,
  "/google/start": true,
  "/google/callback": true,
  "/google/complete": true,
};

export const PRIVATE_ONLY_URLS: Routes = {};
