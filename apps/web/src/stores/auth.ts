import { User } from '@v6-academy/db';
import { StateCreator } from 'zustand';

export type AuthSlice = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  onAuthSuccess: ({
    accessToken,
    refreshToken,
    user,
  }: {
    accessToken: string;
    refreshToken: string;
    user: User;
  }) => void;
  replaceAccessToken: ({ accessToken }: { accessToken: string }) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  accessToken: null,
  refreshToken: null,
  accessTokenExpiry: null,
  refreshTokenExpiry: null,
  user: null,
  onAuthSuccess: (payload) => {
    set(() => ({ ...payload }));
  },
  replaceAccessToken: (payload) => {
    set(() => ({ ...payload }));
  },
  onLogout: () => {
    set(() => ({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiry: null,
      refreshTokenExpiry: null,
      user: null,
      newEmailRequest: null,
    }));
  },
});
