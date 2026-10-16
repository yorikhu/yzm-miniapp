<template>
  <view class="page-shell">
    <AppHeader title="一盏三心" subtitle="茶心 · 正念心 · 冥想心" back centered sticky />
    <view class="page-main">
      <view class="sanzin-quickplay">
        <button
          v-for="item in quickplays"
          :key="item.id"
          class="sanzin-quickplay-item"
          hover-class="sanzin-quickplay-item-pressed"
          @click="onQuickPlay(item)"
        >
          <text class="sanzin-quickplay-item-icon">{{ item.icon }}</text>
          <view class="sanzin-quickplay-item-body">
            <text class="sanzin-quickplay-item-label">{{ item.label }}</text>
            <text class="sanzin-quickplay-item-meta">{{ item.meta }}</text>
          </view>
        </button>
      </view>

      <!-- ══════════ 第一部分：前导课 · 茶仪准备 ══════════ -->
      <view class="page-section">
        <SectionHeading eyebrow="PREPARATION" title="前导课 · 茶仪准备" />
        <YzmCard>
          <view class="sanzin-doc">
            <text class="sanzin-doc-lead">
              hi 大家好呀，我是子芯，非常荣幸可以和你成为人生路上一起修行的伙伴～
            </text>
            <text class="sanzin-doc-text">
              一次「一盏三心」茶仪练习，就是一次小型的正念训练。这个练习先导课主要是给从未接触过呼吸/正念/茶道的小伙伴先提前有个大概的印象。
            </text>
            <text class="sanzin-doc-text">
              正念的好处我就不多说了哈，大家也是认可才会进入到这个训练中来。
            </text>
            <view class="sanzin-doc-keyidea">
              <text class="sanzin-doc-keyidea-mark">心法</text>
              <text class="sanzin-doc-keyidea-text">
                对于「一盏三心」茶仪练习来说，茶只是过程，感知才是核心目的；对于我们整个人生旅程来说，感知是第一步……
              </text>
            </view>

            <view class="sanzin-doc-h3">备器</view>
            <text class="sanzin-doc-text">
              在每次茶仪练习前，让我们先煮上水，开始备器。把洗干净的茶器按照位置和顺序摆放好：
            </text>
            <view class="sanzin-utensils">
              <text v-for="name in utensils" :key="name" class="sanzin-utensils-item">{{
                name
              }}</text>
            </view>
            <view class="sanzin-doc-tip">
              <text class="sanzin-doc-tip-label">礼</text>
              <text class="sanzin-doc-tip-text">
                公道杯杯口一直朝向自己。传统茶礼认为壶嘴/杯嘴如刀刃，指着人含「不敬/逐客」之意，我们这边对着自己就可以。
              </text>
            </view>

            <view class="sanzin-doc-h3">呼吸</view>
            <text class="sanzin-doc-text">
              准备好后，开始播放「一盏三心」的茶仪引导课。从呼吸开始放松我们整个身体和神经，目的是把我们身体的修复系统、刹车系统唤醒。
            </text>
            <view class="sanzin-doc-tip">
              <text class="sanzin-doc-tip-label">息</text>
              <text class="sanzin-doc-tip-text">
                注意使用腹式呼吸法。平时如果感知到自己的状态和情绪不对劲了，闭上眼睛，用腹式呼吸法，深深的吸气，拉长呼气，这样持续三下，状态瞬间脉动回来～
              </text>
            </view>

            <view class="sanzin-doc-h3">四步要领</view>
            <view v-for="step in prepSteps" :key="step.title" class="sanzin-prep">
              <view class="sanzin-prep-head">
                <text class="sanzin-prep-index">{{ step.index }}</text>
                <text class="sanzin-prep-title">{{ step.title }}</text>
              </view>
              <text
                v-for="(p, i) in step.paragraphs"
                :key="i"
                class="sanzin-doc-text"
                :class="{ 'sanzin-doc-text-indent': i === 0 }"
              >
                {{ p }}
              </text>
            </view>

            <view class="sanzin-doc-ending">
              <text class="sanzin-doc-ending-text">
                好啦，接下来可以开始一次完整的「一盏三心」茶仪练习啦。
              </text>
              <text class="sanzin-doc-ending-note">有任何问题请私信子芯，子芯会抽空回复的。</text>
            </view>
          </view>
        </YzmCard>
      </view>

      <!-- ══════════ 第二部分：引导词 · 茶仪练习 ══════════ -->
      <view class="page-section">
        <SectionHeading eyebrow="GUIDANCE" title="引导词 · 茶仪练习" />
        <YzmCard>
          <view class="sanzin-doc">
            <text class="sanzin-doc-lead"
              >这位朋友，我是子芯。现在让我们带着觉知，静静地泡一壶茶。</text
            >
            <view v-for="step in guidanceSteps" :key="step.title" class="sanzin-guide">
              <view class="sanzin-guide-head">
                <text class="sanzin-guide-index">{{ step.index }}</text>
                <text class="sanzin-guide-title">{{ step.title }}</text>
              </view>
              <template v-for="(p, i) in step.paragraphs" :key="i">
                <view v-if="p.type === 'divider'" class="sanzin-guide-divider" />
                <text v-else-if="p.type === 'pause'" class="sanzin-guide-pause">{{ p.text }}</text>
                <text v-else-if="p.type === 'quote'" class="sanzin-guide-quote">{{ p.text }}</text>
                <text v-else class="sanzin-guide-text">{{ p.text }}</text>
              </template>
            </view>
            <view class="sanzin-doc-ending">
              <text class="sanzin-doc-ending-text">
                接下来，我们可以带着专注与觉知，继续泡第二杯茶、第三杯茶……
              </text>
            </view>
          </view>
        </YzmCard>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
/**
 * 「一盏三心」专题页，提供茶仪音频/视频快捷入口与前导课、引导词全文。
 */
import AppHeader from '@/components/layout/AppHeader.vue';
import SectionHeading from '@/components/base/SectionHeading.vue';
import YzmCard from '@/components/base/YzmCard.vue';

const quickplays = [
  {
    id: 'audio',
    icon: '♪',
    label: '播放练习音频',
    meta: '茶仪引导 · 跟随练习',
  },
  {
    id: 'video',
    icon: '▶',
    label: '播放练习视频',
    meta: '茶仪示范 · 跟随冲泡',
  },
];

const onQuickPlay = (item: { label: string }) => {
  uni.showToast({ title: item.label, icon: 'none', duration: 1500 });
};

/* ───────── 第一部分：前导课 ───────── */

const utensils = ['水盂', '品茗杯', '公道杯', '盖碗', '茶针', '茶则'];

const prepSteps = [
  {
    index: '壹',
    title: '行礼赏茶',
    paragraphs: [
      '我们先行一个合十礼：掌背微躬，掌心略弯，两掌之间形成空洞，表示真空之理，意即我们要悟入空性。放于心口，怀着感恩的心，恭敬虔诚地行礼。',
      '赏茶的时候，我喜欢取一部分倒入手心赏茶，也可以直接托着茶则赏茶，充分调动我们的视觉与嗅觉。',
    ],
  },
  {
    index: '贰',
    title: '温杯摇香',
    paragraphs: [
      '温杯的时候也用三指法，具体在下一步润茶和泡茶时说。投完茶后，把茶则盖在茶针上。',
      '摇香：双手托住碗沿拿起盖碗，四个手指托住碗底，大拇指扣住盖碗的顶部。摇晃的时候轻轻往自己的方向带一点力，感受茶叶在碗中轻轻翻滚（如果不太行，直上直下晃 3 下效果差不多），主要是觉知自己的动作。',
    ],
  },
  {
    index: '叁',
    title: '润茶泡茶',
    paragraphs: [
      '我们家的茶叶净度都很高，可以不用润茶；考虑到大家用的茶叶不同，且润茶确实可以让茶叶舒展、下一泡口感更好，这边统一润茶，停留 3 秒即可出汤。',
      '引导词是按照我的节奏来的，有时候可能会慢几秒，不用纠结。可以先做完这个步骤，双手放于膝盖等几秒，按照自己的节奏来即可，主要还是感知整个泡茶的过程。',
      '盖碗的出汤手法挺多的，我们选用三指法的出汤手法。',
    ],
  },
  {
    index: '肆',
    title: '品茗',
    paragraphs: ['品茗一定要慢慢喝，一小口一小口地抿，不要烫到了。'],
  },
];

/* ───────── 第二部分：引导词 ───────── */

type Para = { text?: string; type?: 'p' | 'pause' | 'quote' | 'divider' };

const guidanceSteps: { index: string; title: string; paragraphs: Para[] }[] = [
  {
    index: '〇',
    title: '调整呼吸',
    paragraphs: [
      { text: '请闭上眼睛……让我们从有意识地调整身体姿势开始。' },
      { text: '现在，请保持脊柱自然直立：背部挺直，两肩放松，胸部打开，头顶向上延伸。' },
      { text: '现在让我们进行深长缓慢的腹式呼吸。' },
      { text: '将注意力集中于小腹的运动，体会吸气时肚皮轻微的拉伸，以及呼气时肚皮轻微的收缩。' },
      { text: '让意识温和停留在呼吸上，体会整个吸气、吐气的过程。' },
      { text: '有意识地把吐气拉长，激活我们的副交感神经（负责「休息、消化、修复」）。' },
      {
        text: '以呼吸为锚，安住在此时此刻。（停顿）如果发现分心了，就温和地把注意力带回到呼吸上来。',
      },
      { text: '在觉察呼吸的同时，体会身体姿势、面部表情、整个身体的感觉。' },
      {
        text: '如果感觉到任何不适、紧张或者阻抗，可以温和地把气息吸入这些部位，然后在呼气时从这些部位离开。',
      },
      { text: '也许在呼气时，能够感受到软化和流动。顺其自然地觉察所有的感觉。' },
      { text: '现在，带着这种扩展的、开放的觉察，进入到接下来的「一盏三心」茶仪中～～' },
    ],
  },
  {
    index: '壹',
    title: '行礼赏茶',
    paragraphs: [
      { text: '带着感恩、恭敬的心，再调整一下我们的坐姿。' },
      { text: '缓缓抬双手，于胸前合十。' },
      { text: '觉知手掌边缘的接触，手指和手指的触碰。' },
      { text: '行礼时，知道自己在行礼；觉知行礼时身体的倾斜和念头变化。' },
      { text: '双手自然放回于膝盖，缓缓睁眼。' },
      { text: '让我们把视线投向茶则的位置。' },
      { text: '拿起茶则，把干茶倒入手心。' },
      { text: '先观察颜色——金黄色？褐红？或者其他什么颜色。' },
      { text: '再观察形状——纤细？弯曲？直立？或者其他什么形状。' },
      { text: '用另一只手的指腹轻轻触碰干茶，感受它的干燥程度，感受它的锋芒。' },
      { text: '最后把干茶靠近鼻尖，轻轻吸一口气——' },
      { text: '这气味，可能是阳光，可能是土壤，可能是花果。' },
      { text: '最后让我们把茶叶慢慢放回茶则。' },
    ],
  },
  {
    index: '贰',
    title: '温杯摇香',
    paragraphs: [
      { text: '右手揭盖，拿起水壶，将温热的水倒入盖碗中，觉知整个倒水的过程。' },
      { text: '现在，把这盏热水——全部倒入公道杯。' },
      { type: 'pause', text: '（停 3s）' },
      { text: '再将公道杯中一部分水倒入品茗杯，公道杯中剩余的水倒入水盂。' },
      { type: 'pause', text: '（停 3s）' },
      { text: '整个过程保持觉知，时刻观察自己的动作，觉知手指与杯身的接触。' },
      { type: 'divider' },
      { text: '拿起茶则、茶针投茶，专注缓慢地把茶叶分三次拨入盖碗中，茶针轻轻拨动。' },
      { text: '观察这几片叶子——缓缓落入碗中的状态和声音。' },
      { text: '盖住盖碗，双手端起盖碗，两个大拇指放于盖碗的顶部。' },
      { text: '体会手腕上下晃动的感觉，摇晃三下。' },
      { text: '感受茶叶与盖碗内壁轻轻摩擦，让香气醒一醒。' },
      { text: '轻轻向旁侧吐出一口气，右手微打开盖碗。' },
      { text: '闭眼，轻吸一口气，让茶香进入身体。带着觉知，不加入任何评判。' },
      { text: '双手托住碗沿，将盖碗放回碗托。' },
    ],
  },
  {
    index: '叁',
    title: '润茶泡茶',
    paragraphs: [
      { text: '右手揭盖，提壶注水，让水流沿着碗壁缓缓地注入盖碗。' },
      { text: '盖上盖碗后停留 3 秒，快速出汤至水盂，让茶叶轻轻舒展。' },
      { type: 'divider' },
      { text: '再次提壶注水，让我们专注于整个泡茶的过程。' },
      { text: '注水时，注意手腕的感觉；根据不同茶叶的冲泡手法，觉知水壶的高低、水流下落的位置。' },
      {
        text: '盖上盖碗，停留时间根据每款茶叶的不同。我用的是金丝滇红，泡 3-5s 后快速出汤至公道杯。',
      },
      { text: '出汤的时候保持肩膀、手臂的放松。' },
      { text: '现在把品茗杯中的水倒入水盂中。' },
      { text: '双手转动公道杯：左手握公道杯，右手托于左腕之下，将茶水缓缓倒入品茗杯。' },
      { text: '让我们全程保持观察——' },
      {
        type: 'quote',
        text: '印度哲学家克里希那穆提说过：不带评论的观察是人类智慧的最高形式。',
      },
      { text: '不带评论的观察有助于我们深入觉知真相。' },
      { text: '当我们摒弃评论，全神贯注于观察时，我们能够更加客观地看待事物，避免误解和冲突。' },
      {
        text: '同时，这种观察方式也有助于我们更好地理解自己和他人的需求和感受，有助于建立更加和谐的人际关系。',
      },
    ],
  },
  {
    index: '肆',
    title: '品茗',
    paragraphs: [
      { text: '双手缓缓端起品茗杯，觉知手指和杯身的接触，感受这杯茶的温度、重量。' },
      { text: '喝之前，先闻一下——' },
      { text: '每一杯分 3-5 口慢慢喝下，让茶汤在口中停留片刻后再下咽。' },
      { text: '觉知茶汤在身体内的流动。对闻到的香、尝到的滋味，保持觉知，不加入任何评论和判断。' },
      {
        type: 'quote',
        text: '一盏三心，三心指的是：茶心、正念心、冥想心。从对茶的觉知，到对自己动作的觉知，到对自我的觉知。把这份觉知带到生活的每个当下，从穿衣吃饭、走路到待人接物，觉知到各种念头和情绪的诞生和消失，做自己生命的观察者。',
      },
    ],
  },
];
</script>

<style scoped>
/* ── 顶部快捷按钮 ── */
.sanzin-quickplay {
  display: grid;
  margin-top: 8rpx;
  grid-template-columns: 1fr 1fr;
  gap: 16rpx;
}

.sanzin-quickplay-item {
  display: flex;
  align-items: center;
  padding: 24rpx 22rpx;
  border: 1rpx solid rgba(21, 94, 80, 0.12);
  border-radius: 22rpx;
  background: linear-gradient(135deg, #fffdf8 0%, #f5efe2 100%);
  box-shadow: 0 8rpx 24rpx rgba(32, 66, 57, 0.04);
  text-align: left;
}

.sanzin-quickplay-item-pressed {
  background: linear-gradient(135deg, #f0eadc 0%, #e6dcc6 100%);
}

.sanzin-quickplay-item-icon {
  flex: 0 0 56rpx;
  width: 56rpx;
  height: 56rpx;
  margin-right: 16rpx;
  border-radius: 50%;
  color: #fffdf5;
  background: linear-gradient(135deg, #2e6052, #466b5c);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 56rpx;
  text-align: center;
}

.sanzin-quickplay-item:nth-child(2) .sanzin-quickplay-item-icon {
  background: linear-gradient(135deg, #5f6e4d, #8a9472);
}

.sanzin-quickplay-item-body {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
}

.sanzin-quickplay-item-label,
.sanzin-quickplay-item-meta {
  display: block;
}

.sanzin-quickplay-item-label {
  color: var(--yzm-ink);
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.4;
}

.sanzin-quickplay-item-meta {
  margin-top: 6rpx;
  color: var(--yzm-muted);
  font-size: 18rpx;
  line-height: 1.4;
}

/* ── 文章排版 ── */
.sanzin-doc {
  padding: 30rpx 28rpx 34rpx;
}

.sanzin-doc-lead {
  display: block;
  color: var(--yzm-ink);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 26rpx;
  font-weight: 600;
  line-height: 1.9;
}

.sanzin-doc-text {
  display: block;
  margin-top: 18rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  line-height: 1.9;
}

.sanzin-doc-text-indent {
  text-indent: 2em;
}

.sanzin-doc-h3 {
  margin: 34rpx 0 6rpx;
  color: var(--yzm-jade-dark);
  font-size: 26rpx;
  font-weight: 650;
  letter-spacing: 3rpx;
}

/* 心法块 */
.sanzin-doc-keyidea {
  display: flex;
  margin-top: 24rpx;
  padding: 22rpx 24rpx;
  border: 1rpx solid rgba(169, 111, 43, 0.25);
  border-radius: 16rpx;
  background: rgba(169, 111, 43, 0.06);
  align-items: flex-start;
  gap: 16rpx;
}

.sanzin-doc-keyidea-mark {
  flex-shrink: 0;
  color: var(--yzm-gold);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.7;
}

.sanzin-doc-keyidea-text {
  color: var(--yzm-ink);
  font-size: 23rpx;
  font-weight: 500;
  line-height: 1.9;
}

/* 器物 chips */
.sanzin-utensils {
  display: flex;
  margin-top: 18rpx;
  flex-wrap: wrap;
  gap: 12rpx;
}

.sanzin-utensils-item {
  padding: 10rpx 22rpx;
  border-radius: 999rpx;
  color: var(--yzm-jade-dark);
  background: rgba(23, 107, 89, 0.08);
  font-size: 21rpx;
  letter-spacing: 2rpx;
}

/* 提示块（礼/息） */
.sanzin-doc-tip {
  display: flex;
  margin-top: 18rpx;
  padding: 20rpx 22rpx;
  border-left: 4rpx solid rgba(21, 94, 80, 0.4);
  border-radius: 0 14rpx 14rpx 0;
  background: rgba(21, 94, 80, 0.05);
  align-items: flex-start;
  gap: 16rpx;
}

.sanzin-doc-tip-label {
  flex-shrink: 0;
  color: var(--yzm-jade-dark);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.8;
}

.sanzin-doc-tip-text {
  color: var(--yzm-ink-soft);
  font-size: 22rpx;
  line-height: 1.8;
}

/* 前导课四步 */
.sanzin-prep {
  margin-top: 26rpx;
}

.sanzin-prep-head {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.sanzin-prep-index {
  color: var(--yzm-gold);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 24rpx;
}

.sanzin-prep-title {
  color: var(--yzm-ink);
  font-size: 25rpx;
  font-weight: 650;
  letter-spacing: 2rpx;
}

.sanzin-prep .sanzin-doc-text {
  margin-top: 14rpx;
}

/* 结尾 */
.sanzin-doc-ending {
  margin-top: 34rpx;
  padding-top: 26rpx;
  border-top: 1rpx solid rgba(21, 94, 80, 0.12);
}

.sanzin-doc-ending-text {
  display: block;
  color: var(--yzm-ink);
  font-size: 24rpx;
  font-weight: 600;
  line-height: 1.9;
  text-align: center;
}

.sanzin-doc-ending-note {
  display: block;
  margin-top: 14rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  text-align: center;
}

/* ── 引导词排版 ── */
.sanzin-guide {
  margin-top: 30rpx;
}

.sanzin-guide-head {
  display: flex;
  align-items: center;
  padding: 16rpx 20rpx;
  border-radius: 14rpx;
  background: linear-gradient(90deg, rgba(21, 94, 80, 0.1), rgba(21, 94, 80, 0.02));
  gap: 14rpx;
}

.sanzin-guide-index {
  color: var(--yzm-gold);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 26rpx;
}

.sanzin-guide-title {
  color: var(--yzm-ink);
  font-size: 27rpx;
  font-weight: 650;
  letter-spacing: 3rpx;
}

.sanzin-guide-text {
  display: block;
  margin-top: 18rpx;
  color: var(--yzm-ink-soft);
  font-size: 23rpx;
  line-height: 2;
}

.sanzin-guide-pause {
  display: block;
  margin-top: 10rpx;
  color: var(--yzm-muted);
  font-size: 20rpx;
  letter-spacing: 2rpx;
}

.sanzin-guide-quote {
  display: block;
  margin: 20rpx 10rpx;
  padding: 18rpx 22rpx;
  border: 1rpx solid rgba(169, 111, 43, 0.22);
  border-radius: 14rpx;
  background: rgba(169, 111, 43, 0.05);
  color: var(--yzm-ink);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 23rpx;
  font-style: italic;
  line-height: 1.9;
}

.sanzin-guide-divider {
  margin: 26rpx auto;
  width: 120rpx;
  height: 1rpx;
  background: linear-gradient(90deg, transparent, rgba(21, 94, 80, 0.3), transparent);
}
</style>
