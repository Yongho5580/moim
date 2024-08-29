interface Routes {
  [key: string]: boolean;
}
export const PUBLIC_ONLY_URLS: Routes = {
  // Auth
  "/login": true,
  "/login/error": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
  "/google/start": true,
  "/google/callback": true,
  "/google/complete": true,
};
