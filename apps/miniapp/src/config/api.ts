/**
 * API 运行时配置，根据环境变量选择本地或远程服务器。
 */

/** API 服务器目标。 */
export type ApiTarget = 'local' | 'remote';

/** API 运行时配置。 */
export interface ApiConfig {
  target: ApiTarget;
  baseUrl: string;
  timeout: number;
}

const defaultLocalBaseUrl = 'http://127.0.0.1:3000/api';
const defaultTimeout = 10000;

/**
 * 移除 API 根地址末尾多余的斜杠。
 *
 * @param url - 待标准化的 API 根地址。
 * @returns 末尾不含斜杠的地址。
 */
const normalizeBaseUrl = (url: string): string => url.replace(/\/+$/, '');

/**
 * 解析当前 API 服务器目标。
 *
 * @returns local 或 remote。
 */
const resolveTarget = (): ApiTarget => {
  const configuredTarget = import.meta.env.VITE_API_TARGET;
  if (configuredTarget === 'local' || configuredTarget === 'remote') return configuredTarget;
  return import.meta.env.DEV ? 'local' : 'remote';
};

/**
 * 根据服务器目标解析 API 根地址。
 *
 * @param target - API 服务器目标。
 * @returns 标准化后的 API 根地址。
 * @throws 远程模式未配置服务器地址时抛出错误。
 */
const resolveBaseUrl = (target: ApiTarget): string => {
  if (target === 'local') {
    return normalizeBaseUrl(import.meta.env.VITE_API_LOCAL_BASE_URL || defaultLocalBaseUrl);
  }

  const remoteBaseUrl = import.meta.env.VITE_API_REMOTE_BASE_URL;
  if (!remoteBaseUrl) {
    throw new Error('VITE_API_REMOTE_BASE_URL is required when VITE_API_TARGET=remote');
  }
  return normalizeBaseUrl(remoteBaseUrl);
};

/**
 * 解析请求超时时间，非正数配置回退到默认值。
 *
 * @returns 毫秒单位的请求超时时间。
 */
const resolveTimeout = (): number => {
  const timeout = Number(import.meta.env.VITE_API_TIMEOUT);
  return Number.isFinite(timeout) && timeout > 0 ? timeout : defaultTimeout;
};

const target = resolveTarget();

/** 当前构建环境使用的 API 配置。 */
export const apiConfig: Readonly<ApiConfig> = Object.freeze({
  target,
  baseUrl: resolveBaseUrl(target),
  timeout: resolveTimeout(),
});
