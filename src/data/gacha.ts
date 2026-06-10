import type { MemoryCard, GachaPrize, ExchangeReward } from '@/types';

const MEMORY_CARD_SERIES = {
  snack: '童年零食系列',
  toy: '经典玩具系列',
  stationery: '复古文具系列',
  seasonal: '季节回忆系列',
};

const makeCardIllustration = (emoji: string, bg: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 420' width='300' height='420'>
      <defs>
        <linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'>
          <stop offset='0%25' stop-color='%23${bg}' stop-opacity='0.6'/>
          <stop offset='100%25' stop-color='%23FFF8E1'/>
        </linearGradient>
      </defs>
      <rect width='300' height='420' fill='url(%23g)' rx='14' stroke='%238D6E63' stroke-width='4'/>
      <rect x='14' y='14' width='272' height='392' rx='10' fill='none' stroke='%23D7CCC8' stroke-width='2' stroke-dasharray='6 4'/>
      <rect x='24' y='24' width='252' height='200' rx='8' fill='%23FFF8E1' stroke='%238D6E63' stroke-width='3'/>
      <text x='150' y='140' font-size='140' text-anchor='middle' dominant-baseline='middle'>${emoji}</text>
      <rect x='24' y='240' width='252' height='40' rx='6' fill='%23FFECB3' stroke='%238D6E63' stroke-width='2'/>
    </svg>`
  )}`;

export const memoryCards: MemoryCard[] = [
  { id: 'c1', name: '麦丽素', emoji: '🍫', category: 'snack', era: '90s',
    illustration: makeCardIllustration('🍫', 'FFCCBC'),
    funFact: '麦丽素诞生于1936年，美国玛氏公司发明，因形状像丹药被戏称「影视万能仙丹」。',
    rarity: 'common', series: MEMORY_CARD_SERIES.snack },
  { id: 'c2', name: '卫龙辣条', emoji: '🌶️', category: 'snack', era: '90s',
    illustration: makeCardIllustration('🌶️', 'FFAB91'),
    funFact: '辣条由湖南平江人发明，2003年卫龙注册品牌，如今已走向世界。',
    rarity: 'common', series: MEMORY_CARD_SERIES.snack },
  { id: 'c3', name: '大白兔奶糖', emoji: '🍬', category: 'snack', era: '80s',
    illustration: makeCardIllustration('🍬', 'F8BBD0'),
    funFact: '大白兔诞生于1959年，最初叫「米老鼠糖」，2004年开始出口海外。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.snack },
  { id: 'c4', name: '咪咪虾条', emoji: '🥨', category: 'snack', era: '90s',
    illustration: makeCardIllustration('🥨', 'FFE082'),
    funFact: '正宗的咪咪虾条其实是马来西亚品牌，由新星食品工业出品。',
    rarity: 'common', series: MEMORY_CARD_SERIES.snack },
  { id: 'c5', name: '跳跳糖', emoji: '💥', category: 'snack', era: '90s',
    illustration: makeCardIllustration('💥', 'B39DDB'),
    funFact: '跳跳糖由美国通用食品1975年注册专利，因碳酸遇水释放气体导致弹跳感。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.snack },
  { id: 'c6', name: '大大卷', emoji: '🫧', category: 'snack', era: '90s',
    illustration: makeCardIllustration('🫧', 'CE93D8'),
    funFact: '「大大泡泡糖」1989年进入中国，广告语「大大超人，越吹越大」家喻户晓。',
    rarity: 'common', series: MEMORY_CARD_SERIES.snack },
  { id: 'c7', name: '小浣熊干脆面', emoji: '🦝', category: 'snack', era: '90s',
    illustration: makeCardIllustration('🦝', 'FFCC80'),
    funFact: '1995年推出水浒卡系列，集卡风潮席卷全国小学生。',
    rarity: 'epic', series: MEMORY_CARD_SERIES.snack },
  { id: 'c8', name: 'AD钙奶', emoji: '🥛', category: 'snack', era: '90s',
    illustration: makeCardIllustration('🥛', 'E1BEE7'),
    funFact: '娃哈哈AD钙奶1996年上市，陪伴90后的童年回忆之一。',
    rarity: 'common', series: MEMORY_CARD_SERIES.snack },
  { id: 'c9', name: '橘子汽水', emoji: '🥤', category: 'snack', era: '80s',
    illustration: makeCardIllustration('🥤', 'FFD54F'),
    funFact: '橘子汽水是80年代夏日标配，玻璃瓶2毛5一瓶，喝完要退瓶。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.snack },
  { id: 'c10', name: '果丹皮', emoji: '🍎', category: 'snack', era: '80s',
    illustration: makeCardIllustration('🍎', 'EF9A9A'),
    funFact: '果丹皮以山楂、白糖、明矾制成，中医认为有助消化。',
    rarity: 'common', series: MEMORY_CARD_SERIES.snack },
  { id: 'c11', name: '铁皮青蛙', emoji: '🐸', category: 'toy', era: '80s',
    illustration: makeCardIllustration('🐸', '81C784'),
    funFact: '发条铁皮青蛙是80年代的标配玩具，一拧发条就向前跳。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.toy },
  { id: 'c12', name: '水中套圈', emoji: '🎯', category: 'toy', era: '90s',
    illustration: makeCardIllustration('🎯', '4FC3F7'),
    funFact: '水中套圈游戏机是90年代最火的掌上玩具，没有电池，靠按压套圈。',
    rarity: 'common', series: MEMORY_CARD_SERIES.toy },
  { id: 'c13', name: '溜溜球', emoji: '🪀', category: 'toy', era: '90s',
    illustration: makeCardIllustration('🪀', '4DD0E1'),
    funFact: '溜溜球起源于古希腊，1990年代在国内掀起热潮，出现了众多花式玩法。',
    rarity: 'common', series: MEMORY_CARD_SERIES.toy },
  { id: 'c14', name: '陀螺', emoji: '🥎', category: 'toy', era: '90s',
    illustration: makeCardIllustration('🥎', 'FFB74D'),
    funFact: '抽陀螺是中国传统民间游戏，古称「千千」，最早出现于后唐时期。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.toy },
  { id: 'c15', name: '翻花绳', emoji: '🧵', category: 'toy', era: '80s',
    illustration: makeCardIllustration('🧵', 'BA68C8'),
    funFact: '翻花绳是80后女生课间最爱，「面条」「大桥」「五角星」各种花样。',
    rarity: 'common', series: MEMORY_CARD_SERIES.toy },
  { id: 'c16', name: '小霸王游戏机', emoji: '🎮', category: 'toy', era: '90s',
    illustration: makeCardIllustration('🎮', 'F06292'),
    funFact: '1987年成立的小霸王学习机，其实是FC红白机兼容机，超级玛丽魂斗罗陪伴了多少童年。',
    rarity: 'epic', series: MEMORY_CARD_SERIES.toy },
  { id: 'c17', name: '弹珠', emoji: '🔮', category: 'toy', era: '90s',
    illustration: makeCardIllustration('🔮', '64B5F6'),
    funFact: '玻璃弹珠游戏花样百出，「老虎洞」「弹珠台」，校门口小卖部5毛一包。',
    rarity: 'common', series: MEMORY_CARD_SERIES.toy },
  { id: 'c18', name: '竹蜻蜓', emoji: '🎋', category: 'toy', era: '80s',
    illustration: makeCardIllustration('🎋', 'AED581'),
    funFact: '竹蜻蜓是中国传统儿童玩具，用双手一搓就能飞上天空，哆啦A梦的道具灵感来源。',
    rarity: 'common', series: MEMORY_CARD_SERIES.toy },
  { id: 'c19', name: '弹弓', emoji: '🏹', category: 'toy', era: '80s',
    illustration: makeCardIllustration('🏹', 'A1887F'),
    funFact: '80年代男孩自制弹弓，树杈+橡皮筋，打鸟打瓶盖是童年日常。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.toy },
  { id: 'c20', name: '华容道', emoji: '🧩', category: 'toy', era: '80s',
    illustration: makeCardIllustration('🧩', '9575CD'),
    funFact: '华容道是古老的中国民间益智游戏，与七巧板、九连环并称「中国古代智力游戏三绝」。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.toy },
  { id: 'c21', name: '铁皮铅笔盒', emoji: '📦', category: 'stationery', era: '90s',
    illustration: makeCardIllustration('📦', 'FFD180'),
    funFact: '印着黑猫警长、变形金刚图案的铁皮铅笔盒，打开还有乘法口诀表。',
    rarity: 'epic', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c22', name: '水果橡皮', emoji: '🍓', category: 'stationery', era: '90s',
    illustration: makeCardIllustration('🍓', 'F48FB1'),
    funFact: '草莓西瓜苹果造型，各种水果香，总是舍不得用的漂亮橡皮。',
    rarity: 'common', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c23', name: '改正纸', emoji: '📝', category: 'stationery', era: '90s',
    illustration: makeCardIllustration('📝', 'CE93D8'),
    funFact: '涂改液的前身，一贴一张撕掉旧时光，写错字必备神器。',
    rarity: 'common', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c24', name: '香珠笔', emoji: '🖊️', category: 'stationery', era: '00s',
    illustration: makeCardIllustration('🖊️', '90CAF9'),
    funFact: '笔尾有香味，各种水果花香，下课了拿起来闻一下的小确幸。',
    rarity: 'common', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c25', name: '田字格本子', emoji: '📒', category: 'stationery', era: '90s',
    illustration: makeCardIllustration('📒', 'FFE0B2'),
    funFact: '16开32开，语文作业必须用田字格练字本，老师的红勾最让人心跳。',
    rarity: 'common', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c26', name: '干脆面水浒卡', emoji: '🃏', category: 'stationery', era: '90s',
    illustration: makeCardIllustration('🃏', 'FF8A65'),
    funFact: '108将英雄卡，集齐一套能换一辆自行车（传说）。',
    rarity: 'legendary', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c27', name: '贴纸', emoji: '🎴', category: 'stationery', era: '90s',
    illustration: makeCardIllustration('🎴', '81D4FA'),
    funFact: '还珠格格、流星花园、仙剑奇侠传的贴纸，贴满歌词本铅笔盒。',
    rarity: 'common', series: MEMORY_CARD_SERIES.stationery },
  { id: 'c28', name: '泡泡胶', emoji: '🎈', category: 'seasonal', era: '90s',
    illustration: makeCardIllustration('🎈', 'B39DDB'),
    funFact: '用嘴吹的泡泡胶，5毛钱一支，能吹好大一个不炸。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.seasonal },
  { id: 'c29', name: '冰袋', emoji: '🧊', category: 'seasonal', era: '90s',
    illustration: makeCardIllustration('🧊', 'B2EBF2'),
    funFact: '1块钱一袋的冰袋，冻成冰块啃着吃，夏日降温神器。',
    rarity: 'rare', series: MEMORY_CARD_SERIES.seasonal },
  { id: 'c30', name: '新年鞭炮', emoji: '🧨', category: 'seasonal', era: '80s',
    illustration: makeCardIllustration('🧨', 'EF5350'),
    funFact: '8090后的过年标配，拆了单个小鞭炮，点着就扔的刺激感。',
    rarity: 'legendary', series: MEMORY_CARD_SERIES.seasonal },
];

export const gachaPrizePool: GachaPrize[] = [
  {
    tier: 'special', tierName: '特等奖',
    type: 'giftpack', name: '童年大礼包',
    description: '价值20种怀旧零食+玩具，装满童年回忆的豪华大礼包',
    emoji: '🎁', color: 'text-amber-600', bgColor: 'from-amber-200',
    probability: 0.01,
  },
  {
    tier: 'first', tierName: '一等奖',
    type: 'coupon', name: '满99减30优惠券',
    description: '满99元减30元优惠券',
    emoji: '🏆', color: 'text-purple-600', bgColor: 'from-purple-200',
    probability: 0.05,
    couponId: 'gacha_first',
  },
  {
    tier: 'second', tierName: '二等奖',
    type: 'coupon', name: '满50减10优惠券',
    description: '满50元减10元优惠券',
    emoji: '🥈', color: 'text-blue-600', bgColor: 'from-blue-200',
    probability: 0.10,
    couponId: 'gacha_second',
  },
  {
    tier: 'third', tierName: '三等奖',
    type: 'snack', name: '随机怀旧零食',
    description: '随机赠送童年零食一包（随下次订单发出）',
    emoji: '🥉', color: 'text-orange-600', bgColor: 'from-orange-200',
    probability: 0.15,
    snackId: 'p3',
  },
  {
    tier: 'fourth', tierName: '四等奖',
    type: 'coupon', name: '5元无门槛券',
    description: '全场通用5元无门槛优惠券',
    emoji: '🎫', color: 'text-green-600', bgColor: 'from-green-200',
    probability: 0.25,
    couponId: 'gacha_fourth',
  },
  {
    tier: 'fifth', tierName: '五等奖',
    type: 'cardpiece', name: '童年记忆卡碎片',
    description: '获得1张随机童年记忆卡碎片',
    emoji: '🃏', color: 'text-pink-600', bgColor: 'from-pink-200',
    probability: 0.30,
  },
  {
    tier: 'participation', tierName: '参与奖',
    type: 'coupon', name: '3元无门槛券',
    description: '全场通用3元无门槛优惠券',
    emoji: '🧧', color: 'text-red-500', bgColor: 'from-red-200',
    probability: 0.14,
    couponId: 'gacha_participation',
  },
];

export const exchangeRewards: ExchangeReward[] = [
  {
    id: 'e1',
    name: '限定铁皮文具盒',
    description: '复古80年代铁皮文具盒，童年的味道',
    emoji: '📦',
    requiredCards: 10,
    rewardType: 'physical',
    value: 58,
  },
  {
    id: 'e2',
    name: '怀旧零食大礼包',
    description: '12款精选童年怀旧零食组合包',
    emoji: '🎁',
    requiredCards: 20,
    rewardType: 'physical',
    value: 199,
  },
  {
    id: 'e3',
    name: '超级童年百宝箱',
    description: '价值500元实物组合+童年收藏家电子证书',
    emoji: '💎',
    requiredCards: 30,
    rewardType: 'physical',
    value: 500,
  },
];

export function drawPrizeByTen(): GachaPrize {
  const r = Math.random();
  let acc = 0;
  for (const p of gachaPrizePool) {
    acc += p.probability;
    if (r <= acc) return p;
  }
  return gachaPrizePool[gachaPrizePool.length - 1];
}

export function drawPrizeWithPity(pityCount: number): { prize: GachaPrize; usedPity: boolean } {
  if (pityCount >= 9) {
    const rarePrizes = gachaPrizePool.filter(p => ['special', 'first', 'second', 'third'].includes(p.tier));
    const idx = Math.floor(Math.random() * rarePrizes.length);
    return { prize: rarePrizes[idx], usedPity: true };
  }
  return { prize: drawPrizeByTen(), usedPity: false };
}

export function getRandomCard(): MemoryCard {
  return memoryCards[Math.floor(Math.random() * memoryCards.length)];
}

export function getCardById(id: string): MemoryCard | undefined {
  return memoryCards.find(c => c.id === id);
}
