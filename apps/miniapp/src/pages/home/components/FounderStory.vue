<template>
  <view class="page-section">
    <SectionHeading eyebrow="FOUNDER" title="主理人 · 子芯" />
    <YzmCard>
      <view class="founder">
        <image class="founder-image" src="/static/founder-placeholder.svg" mode="aspectFill" />
        <view class="founder-content">
          <text class="founder-quote">“人性本恶，但我选善。”</text>
          <text class="founder-text">
            我想做一处不催促人的茶空间。你可以在这里喝一杯好茶，也可以暂时放下外界的声音，重新听见自己。
          </text>
          <text class="founder-signature">— 子芯，韵盏茗主理人</text>
        </view>
      </view>
    </YzmCard>
  </view>
</template>

<script setup lang="ts">
/**
 * 主理人故事组件，展示品牌创办者与初心介绍。
 */
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';
</script>

<style scoped>
.founder {
  display: grid;
  padding: 18rpx;
  grid-template-columns: 1fr;
  gap: 26rpx;
}

.founder-image {
  width: 100%;
  height: 420rpx;
  border-radius: 18rpx;
  background: #dedfdb;
}

.founder-content {
  display: flex;
  min-width: 0;
  padding: 12rpx 14rpx 20rpx;
  flex-direction: column;
  justify-content: center;
}

.founder-quote,
.founder-text,
.founder-signature {
  display: block;
}

.founder-quote {
  color: var(--yzm-gold);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 1.5;
}

.founder-text {
  margin-top: 20rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  line-height: 1.9;
}

.founder-signature {
  margin-top: 24rpx;
  color: var(--yzm-muted);
  font-size: 19rpx;
  text-align: right;
}

@media (min-width: 600px) {
  .founder {
    grid-template-columns: minmax(240rpx, 0.72fr) 1fr;
  }

  .founder-image {
    height: 400rpx;
  }
}
</style>
