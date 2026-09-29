/**
 * 统一后端请求服务，封装 uni.request 的地址拼接、超时、响应与错误处理。
 */
import { apiConfig } from '@/config/api';

/** 业务请求选项。 */
export interface ApiRequestOptions<TData = unknown> {
  path: string;
  method?: UniApp.RequestOptions['method'];
  data?: TData;
  header?: UniApp.RequestOptions['header'];
  timeout?: number;
  showErrorToast?: boolean;
}

/** 后端请求失败时抛出的标准错误。 */
export class ApiRequestError extends Error {
  readonly statusCode?: number;
  readonly data?: unknown;

  /**
   * 创建后端请求错误。
   *
   * @param message - 可读的错误信息。
   * @param statusCode - HTTP 状态码。
   * @param data - 后端返回的原始错误数据。
   */
  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * 判断请求路径是否已经是完整 HTTP 地址。
 *
 * @param path - 请求路径或地址。
 * @returns 路径为完整 HTTP(S) 地址时返回 true。
 */
const isAbsoluteUrl = (path: string): boolean => /^https?:\/\//i.test(path);

/**
 * 生成完整请求地址。
 *
 * @param path - API 相对路径或完整地址。
 * @returns 可传递给 uni.request 的完整地址。
 */
const buildRequestUrl = (path: string): string => {
  if (isAbsoluteUrl(path)) return path;
  return `${apiConfig.baseUrl}/${path.replace(/^\/+/, '')}`;
};

/**
 * 从后端错误响应中提取用户可读的信息。
 *
 * @param data - 后端返回的原始数据。
 * @param fallback - 无法提取信息时的回退文案。
 * @returns 用户可读的错误信息。
 */
const extractErrorMessage = (data: unknown, fallback: string): string => {
  if (!data || typeof data !== 'object') return fallback;
  const message = Reflect.get(data, 'message');
  if (Array.isArray(message)) return message.join('；');
  return typeof message === 'string' && message ? message : fallback;
};

/**
 * 在页面上显示请求错误。
 *
 * @param message - 待显示的错误信息。
 * @returns 无返回值。
 */
const showRequestError = (message: string): void => {
  uni.showToast({ title: message, icon: 'none' });
};

/**
 * 向后端发起请求并返回强类型的响应数据。
 *
 * @template TResponse - 成功响应数据类型。
 * @template TData - 请求数据类型。
 * @param options - 请求路径、方法、数据与行为选项。
 * @returns 成功响应数据。
 * @throws 网络失败或 HTTP 非 2xx 响应时抛出 ApiRequestError。
 */
export const request = <TResponse, TData = unknown>(
  options: ApiRequestOptions<TData>,
): Promise<TResponse> => {
  const {
    path,
    method = 'GET',
    data,
    header,
    timeout = apiConfig.timeout,
    showErrorToast = true,
  } = options;

  return new Promise<TResponse>((resolve, reject) => {
    uni.request({
      url: buildRequestUrl(path),
      method,
      data: data as UniApp.RequestOptions['data'],
      header: {
        'content-type': 'application/json',
        ...header,
      },
      timeout,
      success: (response: UniApp.RequestSuccessCallbackResult) => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data as TResponse);
          return;
        }

        const message = extractErrorMessage(response.data, `请求失败 (${response.statusCode})`);
        if (showErrorToast) showRequestError(message);
        reject(new ApiRequestError(message, response.statusCode, response.data));
      },
      fail: (error: UniApp.GeneralCallbackResult) => {
        const message = error.errMsg || '网络请求失败';
        if (showErrorToast) showRequestError(message);
        reject(new ApiRequestError(message));
      },
    });
  });
};
