import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { env } from '~/env.mjs';
import { useStore } from '~/stores';

export class AxiosManager {
  public readonly axios: AxiosInstance;
  public readonly axiosWithAuth: AxiosInstance;
  private readonly refreshTokenAxios: AxiosInstance;

  constructor() {
    this.axios = Axios.create({
      baseURL: env.NEXT_PUBLIC_API_URL,
    });
    this.axiosWithAuth = Axios.create({
      baseURL: env.NEXT_PUBLIC_API_URL,
    });
    this.refreshTokenAxios = Axios.create({
      baseURL: env.NEXT_PUBLIC_API_URL,
    });
    this.axios.interceptors.response.use(
      this.fulfilledResponseInterceptor,
      this.unauthenticatedRejectResponseInterceptor.bind(this),
    );

    this.axiosWithAuth.interceptors.request.use(this.authRequestInterceptor);
    this.axiosWithAuth.interceptors.response.use(
      this.fulfilledResponseInterceptor,
      this.rejectResponseInterceptor.bind(this),
    );

    this.refreshTokenAxios.interceptors.request.use(
      this.refreshTokenRequestInterceptor,
    );
    this.refreshTokenAxios.interceptors.response.use(
      this.fulfilledResponseInterceptor,
      this.refreshTokenRejectResponseInterceptor,
    );
  }

  private async authRequestInterceptor(
    axiosConfig: InternalAxiosRequestConfig,
  ) {
    const token = useStore.getState().accessToken;
    if (axiosConfig.headers) {
      if (token) {
        axiosConfig.headers.authorization = `Bearer ${token}`;
      }
      axiosConfig.headers.Accept = 'application/json';
    }

    return axiosConfig;
  }

  private async refreshTokenRequestInterceptor(
    axiosConfig: InternalAxiosRequestConfig,
  ) {
    const refreshToken = useStore.getState().refreshToken;
    if (axiosConfig.headers) {
      if (refreshToken) {
        axiosConfig.headers.authorization = `Bearer ${refreshToken}`;
      }
      axiosConfig.headers.Accept = 'application/json';
    }

    return axiosConfig;
  }

  private async fulfilledResponseInterceptor(response: AxiosResponse) {
    return response;
  }

  private async refreshTokenRejectResponseInterceptor(
    error: AxiosError<{ errors: string[] }>,
  ) {
    if (
      error.response?.status === 401 &&
      (error.response?.data?.errors.includes('refresh token is invalid') ||
        error.response?.data?.errors.includes('refresh token is expired'))
    ) {
      useStore.setState({ accessToken: null, refreshToken: null, user: null });
      return;
    }
  }

  private async unauthenticatedRejectResponseInterceptor(
    error: AxiosError<{ errors: string[] }>,
  ) {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }
    if (
      error.response?.status === 401 &&
      error.response?.data?.errors.includes('access token is invalid')
    ) {
      console.warn(
        `Are you sure you use axiosWithToken for ${originalRequest.method?.toUpperCase()} /${
          originalRequest.url
        } ? This is a restricted endpoint.`,
      );
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }

  private async rejectResponseInterceptor(
    error: AxiosError<{ errors: string[] }>,
  ) {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      (error.response?.data?.errors.includes('access token is expired') ||
        error.response?.data?.errors.includes('access token is invalid'))
    ) {
      await this.refreshAccessToken();
      return await this.axiosWithAuth.request(originalRequest);
    }

    return Promise.reject(error);
  }

  private async refreshAccessToken() {
    // const {
    //   data: { access_token },
    // } = await this.refreshTokenAxios.post<{ access_token: string }>(
    //   'auth/refresh',
    // );
    // useStore.setState({ accessToken: access_token });
    // this.axiosWithAuth.defaults.headers.common.Authorization =
    //   'Bearer ' + access_token;
  }
}
