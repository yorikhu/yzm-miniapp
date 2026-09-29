/**
 * 小程序导航组合式函数，封装 Tab、普通页面和返回导航。
 */
export const tabRoutes = {
  home: '/pages/home/index',
  mall: '/pages/mall/index',
  practice: '/pages/practice/index',
  cart: '/pages/cart/index',
  profile: '/pages/profile/index',
} as const;

export type TabKey = keyof typeof tabRoutes;

/**
 * 创建页面导航方法集合。
 *
 * @returns 包含 Tab 切换、页面跳转和返回方法的对象。
 */
export function useNavigation() {
  /**
   * 切换到指定的 Tab 页面。
   *
   * @param key - Tab 路由键。
   * @returns uni-app 的 Tab 切换结果。
   */
  const goTab = (key: TabKey) => uni.switchTab({ url: tabRoutes[key] });
  /**
   * 跳转到指定的非 Tab 页面。
   *
   * @param url - 目标页面路径。
   * @returns uni-app 的页面跳转结果。
   */
  const goTo = (url: string) => uni.navigateTo({ url });
  /**
   * 返回上一个页面。
   *
   * @returns uni-app 的返回导航结果。
   */
  const goBack = () => uni.navigateBack();

  return { goTab, goTo, goBack };
}
