interface Routes {
  [key: string]: boolean;
}

export const PUBLIC_URLS: Routes = {};

export const PUBLIC_ONLY_URLS: Routes = {
  // Auth
  "/login": true,
  "/api/upload": true,
  "/login/error": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
  "/google/start": true,
  "/google/callback": true,
  "/google/complete": true,
};

export const PRIVATE_ONLY_URLS: Routes = {};
