<template>
  <view class="page-section">
    <SectionHeading eyebrow="FOUNDER" title="主理人 · 子芯" />
    <YzmCard>
      <view class="founder">
        <image class="founder__image" src="/static/founder-placeholder.svg" mode="aspectFill" />
        <view class="founder__content">
          <text class="founder__quote">“人性本恶，但我选善。”</text>
          <text class="founder__text">
            我想做一处不催促人的茶空间。你可以在这里喝一杯好茶，也可以暂时放下外界的声音，重新听见自己。
          </text>
          <text class="founder__signature">— 子芯，韵盏茗主理人</text>
        </view>
      </view>
    </YzmCard>
  </view>
</template>

<script setup lang="ts">
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

.founder__image {
  width: 100%;
  height: 420rpx;
  border-radius: 18rpx;
}

.founder__content {
  display: flex;
  min-width: 0;
  padding: 12rpx 14rpx 20rpx;
  flex-direction: column;
  justify-content: center;
}

.founder__quote,
.founder__text,
.founder__signature {
  display: block;
}

.founder__quote {
  color: var(--yzm-gold);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 1.5;
}

.founder__text {
  margin-top: 20rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  line-height: 1.9;
}

.founder__signature {
  margin-top: 24rpx;
  color: var(--yzm-muted);
  font-size: 19rpx;
}

@media (min-width: 600px) {
  .founder {
    grid-template-columns: minmax(240rpx, 0.72fr) 1fr;
  }

  .founder__image {
    height: 400rpx;
  }
}
</style>
