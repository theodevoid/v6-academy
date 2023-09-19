import { get } from 'env-var';

import { loadEnv } from './env';

loadEnv();

export const getRequired = (env: string) => get(env).required();

export const config = {
  get jwtSecret() {
    return getRequired('JWT_SECRET').asString();
  },
  get bcryptSaltRounds() {
    return getRequired('BCRYPT_SALT_ROUNDS').asInt();
  },
  get supabaseUrl() {
    return getRequired('SUPABASE_URL').asString();
  },
  get supabaseKey() {
    return getRequired('SUPABASE_KEY').asString();
  },
  get githubOauthSecret() {
    return getRequired('GITHUB_OAUTH_SECRET').asString();
  },
  get githubOauthClient() {
    return getRequired('GITHUB_OAUTH_CLIENT').asString();
  },
};
