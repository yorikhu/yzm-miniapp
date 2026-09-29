<template>
  <YzmCard>
    <view class="composer">
      <view class="composer-intro">
        <view class="composer-animal" :class="{ 'composer-animal-moving': sending }">雀</view>
        <view>
          <text class="composer-title">写一封观察日记</text>
          <text class="composer-hint">描述发生的事情，不评判情绪，让事实自己说话。</text>
        </view>
      </view>

      <textarea
        v-model="content"
        class="composer-input"
        maxlength="300"
        placeholder="此刻发生了什么？你观察到了什么？"
      />

      <view v-if="suggestion" class="composer-suggestion">
        <text class="composer-suggestion-label">内容建议</text>
        <text>{{ suggestion }}</text>
      </view>

      <view class="composer-actions">
        <button class="composer-voice" @click="startVoice">◎ 语音输入</button>
        <text class="composer-count">{{ content.length }}/300</text>
        <YzmButton :disabled="content.length < 8 || sending" @click="submit">
          {{ sending ? '小雀送信中…' : '交给小雀' }}
        </YzmButton>
      </view>
    </view>
  </YzmCard>
</template>

<script setup lang="ts">
/**
 * 观察日记编辑组件，提供文本输入、表达建议、语音入口与提交状态。
 */
import { ref, watch } from 'vue';
import YzmButton from '@/components/base/YzmButton.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const emit = defineEmits<{ published: [content: string] }>();
const content = ref('');
const suggestion = ref('');
const sending = ref(false);

/**
 * 根据日记内容长度和情绪词生成表达建议。
 *
 * @param value - 当前日记文本。
 * @returns 无返回值。
 */
const updateSuggestion = (value: string) => {
  if (value.length < 18) suggestion.value = '';
  else if (/很烦|讨厌|崩溃|气死/.test(value))
    suggestion.value = '试着去掉评价词，只写下你看见、听见和身体感受到的事实。';
  else suggestion.value = '描述清晰、具体，已经很好地把观察与判断分开了。';
};

watch(content, updateSuggestion);

/**
 * 提示用户语音能力需要真机授权。
 *
 * @returns 无返回值。
 */
const startVoice = () => {
  uni.showToast({ title: '语音能力将在真机授权后启用', icon: 'none' });
};

/**
 * 完成日记发布，清理编辑状态并向父组件发出内容。
 *
 * @returns 无返回值。
 */
const completeSubmission = () => {
  emit('published', content.value);
  content.value = '';
  suggestion.value = '';
  sending.value = false;
  uni.showToast({ title: '小雀已出发，审核后公开', icon: 'none' });
};

/**
 * 校验日记内容并启动模拟发布流程。
 *
 * @returns 无返回值。
 */
const submit = () => {
  if (content.value.length < 8 || sending.value) return;
  sending.value = true;
  setTimeout(completeSubmission, 900);
};
</script>

<style scoped>
.composer {
  padding: 28rpx;
}

.composer-intro {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.composer-animal {
  display: flex;
  flex: 0 0 76rpx;
  height: 76rpx;
  align-items: center;
  justify-content: center;
  border-radius: 50% 50% 46% 54%;
  color: #fff;
  background: var(--yzm-jade);
  box-shadow: 10rpx 12rpx 0 rgba(184, 120, 46, 0.14);
  font-size: 27rpx;
}

.composer-animal-moving {
  animation: courier 0.7s ease-in-out infinite alternate;
}

.composer-title,
.composer-hint {
  display: block;
}

.composer-title {
  font-size: 30rpx;
  font-weight: 650;
}

.composer-hint {
  margin-top: 6rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  line-height: 1.5;
}

.composer-input {
  width: 100%;
  height: 230rpx;
  margin-top: 24rpx;
  padding: 22rpx;
  border: 1rpx solid var(--yzm-line);
  border-radius: 22rpx;
  background: rgba(245, 240, 230, 0.64);
  font-size: 25rpx;
  line-height: 1.7;
}

.composer-suggestion {
  margin-top: 16rpx;
  padding: 18rpx 20rpx;
  border-left: 5rpx solid var(--yzm-gold);
  border-radius: 10rpx;
  color: var(--yzm-ink-soft);
  background: rgba(184, 120, 46, 0.08);
  font-size: 21rpx;
  line-height: 1.6;
}

.composer-suggestion-label {
  margin-right: 12rpx;
  color: var(--yzm-gold);
  font-weight: 650;
}

.composer-actions {
  display: flex;
  margin-top: 20rpx;
  align-items: center;
  gap: 14rpx;
}

.composer-voice {
  margin: 0;
  padding: 0;
  color: var(--yzm-jade);
  background: transparent;
  font-size: 23rpx;
  line-height: 70rpx;
}

.composer-count {
  flex: 1;
  color: var(--yzm-muted);
  font-size: 19rpx;
  text-align: right;
}

.composer-actions :deep(.yzm-button) {
  min-height: 72rpx;
  padding: 0 26rpx;
  font-size: 23rpx;
}

@keyframes courier {
  from {
    transform: translateX(0) rotate(-4deg);
  }
  to {
    transform: translateX(18rpx) rotate(5deg);
  }
}
</style>
