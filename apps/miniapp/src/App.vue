<script setup lang="ts">
/**
 * 小程序根组件，负责注册全局生命周期与样式入口。
 */
import { onLaunch } from '@dcloudio/uni-app';

/**
 * 处理小程序启动。
 *
 * @returns 无返回值。
 */
const initializeApp = () => undefined;

onLaunch(initializeApp);
</script>

<style>
@import './styles/global.css';
</style>
