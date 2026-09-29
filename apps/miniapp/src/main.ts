/**
 * uni-app 前端应用入口。
 */
import { createSSRApp } from 'vue';
import App from './App.vue';

/**
 * 创建并返回 Vue SSR 应用实例。
 *
 * @returns 包含根应用实例的 uni-app 启动对象。
 */
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
