/**
 * 前端演示数据，提供茶品、练习、日记、会员与订单模拟内容。
 */
import Chance from 'chance';
import type { JournalEntry, Product, Technique, UserProfile } from '@/types';

const mock = new Chance();

const productSeeds: Omit<Product, 'id' | 'sales'>[] = [
  {
    name: '景迈功夫红',
    subtitle: '蜜香温润，回甘悠长',
    category: '功夫红茶',
    origin: '云南景迈山',
    coreBenefit: '古树鲜叶 · 传统揉捻 · 低温慢焙',
    price: 128,
    originalPrice: 158,
    latitude: '北纬 22.2°',
    tone: 'amber',
    detail:
      '取景迈山古茶林鲜叶，经萎凋、揉捻、发酵与低温慢焙，茶汤红亮，入口带花蜜香，适合午后与朋友慢慢分享。',
    skus: [
      { id: 'red-50', name: '随行罐', spec: '50g', price: 128 },
      { id: 'red-100', name: '分享装', spec: '100g', price: 228 },
    ],
  },
  {
    name: '月光白',
    subtitle: '清甜柔软，如月色入杯',
    category: '白茶',
    origin: '云南澜沧',
    coreBenefit: '自然萎凋 · 毫香清甜 · 久泡不涩',
    price: 168,
    latitude: '北纬 22.6°',
    tone: 'mist',
    detail: '芽叶披毫，借山风自然萎凋。茶汤柔软清甜，适合夜晚独处、阅读或静坐时饮用。',
    skus: [
      { id: 'white-50', name: '月白罐', spec: '50g', price: 168 },
      { id: 'white-gift', name: '双罐礼盒', spec: '100g', price: 298 },
    ],
  },
  {
    name: '兰香晒青',
    subtitle: '山野兰香，鲜活明亮',
    category: '晒青茶',
    origin: '云南景迈山',
    coreBenefit: '高山生态 · 日光干燥 · 清香耐泡',
    price: 118,
    latitude: '北纬 22.1°',
    tone: 'jade',
    detail: '日光带走水分，留下山野气息。汤感鲜活，兰香清晰，适合清晨唤醒身体。',
    skus: [
      { id: 'green-50', name: '山野罐', spec: '50g', price: 118 },
      { id: 'green-100', name: '常饮装', spec: '100g', price: 208 },
    ],
  },
  {
    name: '古树熟茶',
    subtitle: '醇厚顺滑，温暖日常',
    category: '熟茶',
    origin: '云南勐海',
    coreBenefit: '古树原料 · 干仓陈放 · 糯香顺滑',
    price: 198,
    latitude: '北纬 21.9°',
    tone: 'earth',
    detail: '经过时间沉淀，茶汤醇厚温润，糯香自然，饭后饮用轻松无负担。',
    skus: [
      { id: 'ripe-100', name: '日常装', spec: '100g', price: 198 },
      { id: 'ripe-200', name: '家庭装', spec: '200g', price: 358 },
    ],
  },
  {
    name: '玫香红韵',
    subtitle: '花果甜香，轻盈自在',
    category: '调香红茶',
    origin: '云南临沧',
    coreBenefit: '自然窨香 · 花果调性 · 冷泡友好',
    price: 138,
    latitude: '北纬 23.8°',
    tone: 'rose',
    detail: '红茶的甜与花香相遇，热泡温柔，冷泡清爽，是忙碌日常里轻松的一杯。',
    skus: [
      { id: 'rose-50', name: '花香罐', spec: '50g', price: 138 },
      { id: 'rose-bag', name: '便携茶包', spec: '12袋', price: 98 },
    ],
  },
];

export const mockProducts: Product[] = productSeeds.map((product) => ({
  ...product,
  id: mock.guid(),
  sales: mock.integer({ min: 86, max: 920 }),
}));

export const mockTechniques: Technique[] = [
  {
    id: mock.guid(),
    eyebrow: '一盏三心 · 茶心',
    title: '七分钟闻香练习',
    description: '从温杯、闻香到入口，把注意力带回当下的一盏茶。',
    format: '音频',
    duration: '07:20',
    tone: 'amber',
  },
  {
    id: mock.guid(),
    eyebrow: '一盏三心 · 正念心',
    title: '茶熏护眼休息法',
    description: '离开屏幕，让温热水汽与缓慢呼吸帮助双眼休息。',
    format: '视频',
    duration: '05:40',
    tone: 'jade',
  },
  {
    id: mock.guid(),
    eyebrow: '一盏三心 · 冥想心',
    title: '跟随茶汤的身体扫描',
    description: '感受温度从口腔到身体的细微变化，松开紧绷。',
    format: '文章',
    duration: '6 分钟阅读',
    tone: 'mist',
  },
  {
    id: mock.guid(),
    eyebrow: '元气练习',
    title: '晨间能量唤醒',
    description: '用呼吸与伸展开启清醒而柔和的一天。',
    format: '音频',
    duration: '09:10',
    tone: 'rose',
  },
];

export const mockJournalEntries: JournalEntry[] = [
  {
    id: mock.guid(),
    author: '山雀 07',
    content: '今天的会议比预想中更长。我注意到自己一直握紧杯子，松开手后，呼吸也慢了下来。',
    time: '今天 09:42',
    likes: mock.integer({ min: 3, max: 18 }),
  },
  {
    id: mock.guid(),
    author: '白鹿 12',
    content: '雨落在窗台上。我没有判断它是否打乱计划，只听了一会儿声音，然后继续手里的事情。',
    time: '昨天 21:16',
    likes: mock.integer({ min: 8, max: 30 }),
  },
];

export const mockProfile: UserProfile = {
  name: '茗主',
  level: '山茶雅客',
  points: mock.integer({ min: 1200, max: 1800 }),
  coupons: mock.integer({ min: 2, max: 6 }),
};

/**
 * 生成包含当前日期和四位随机数的模拟订单号。
 *
 * @returns 以 YZM 开头的订单号。
 */
export const mockOrderNumber = () =>
  `YZM${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${mock.string({
    pool: '0123456789',
    length: 4,
  })}`;
