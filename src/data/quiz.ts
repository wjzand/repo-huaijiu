import type { Question, Danmaku, Banner, RankingItem, Coupon } from '@/types';

const imgQ = (emoji: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 280' width='360' height='280'>
      <rect width='360' height='280' rx='16' fill='%23FFF8E1'/>
      <rect x='8' y='8' width='344' height='264' rx='12' fill='none' stroke='%23D7CCC8' stroke-width='4' stroke-dasharray='8 4'/>
      <rect x='20' y='20' width='56' height='56' rx='8' fill='%23FFE082' stroke='%238D6E63' stroke-width='2'/>
      <text x='48' y='57' font-size='24' font-family='serif' font-weight='bold' text-anchor='middle' fill='%235D4037'>猜</text>
      <text x='50%25' y='54%25' font-size='130' text-anchor='middle' dominant-baseline='middle'>${emoji}</text>
    </svg>`
  )}`;

export const questions: Question[] = [
  {
    id: 'q1', type: 'image',
    content: '这个童年零食是？',
    image: imgQ('🍫'),
    options: ['麦丽素', 'M&M豆', '金莎巧克力', '雀巢奇巧'],
    answerIndex: 0,
    explanation: '麦丽素！号称「影视剧中万能仙丹」，武侠片里的救命药都是它～',
  },
  {
    id: 'q2', type: 'price',
    content: '1998年校门口小卖部一包普通辣条的价格约为？',
    options: ['1毛钱', '5毛钱', '2元', '5元'],
    answerIndex: 1,
    explanation: '五毛！当年能买一大包，是课间最奢侈的享受。',
  },
  {
    id: 'q3', type: 'brand',
    content: '「大大泡泡糖」的经典广告语是？',
    options: ['吹出大梦想', '美味又好玩', '越吹越大', '童年的味道'],
    answerIndex: 0,
    explanation: '「大大泡泡糖，吹出大梦想！」——刻在DNA里的广告语。',
  },
  {
    id: 'q4', type: 'image',
    content: '这个经典玩具叫？',
    image: imgQ('🐸'),
    options: ['跳跳蛙', '发条青蛙', '铁皮蛙蛙', '弹跳蛙'],
    answerIndex: 1,
    explanation: '发条铁皮青蛙！上海玩具二厂经典设计，上世纪的国民玩具。',
  },
  {
    id: 'q5', type: 'price',
    content: '小浣熊干脆面在1999年的零售价是？',
    options: ['3毛', '5毛', '1元', '2元'],
    answerIndex: 1,
    explanation: '五毛一包！为了集水浒卡，多少人买了一箱子。',
  },
  {
    id: 'q6', type: 'brand',
    content: '「白猫黑猫，捉到老鼠就是好猫」是谁家的广告语？',
    options: ['白猫洗洁精', '小浣熊', '大大卷', '喔喔奶糖'],
    answerIndex: 0,
    explanation: '白猫洗洁精！这广告语确实洗脑。',
  },
  {
    id: 'q7', type: 'image',
    content: '这个文具的名字是？',
    image: imgQ('📦'),
    options: ['铁文具盒', '铅笔盒子', '铁皮铅笔盒', '铁匣子'],
    answerIndex: 2,
    explanation: '铁皮铅笔盒！内侧还有乘法口诀表，是你的童年没错吧～',
  },
  {
    id: 'q8', type: 'price',
    content: '90年代一瓶玻璃瓶橘子汽水大约多少钱？',
    options: ['2毛', '5毛', '1.5元', '3元'],
    answerIndex: 1,
    explanation: '5毛一瓶！喝完还得把瓶子退回去，不然要加钱。',
  },
  {
    id: 'q9', type: 'brand',
    content: '「有汰渍，没污渍」是哪个品牌的广告词？',
    options: ['立白', '雕牌', '汰渍', '奥妙'],
    answerIndex: 2,
    explanation: '汰渍！这句广告语听了十几年了。',
  },
  {
    id: 'q10', type: 'image',
    content: '图中的饮料是？',
    image: imgQ('🥤'),
    options: ['健力宝', '芬达', '美年达', '旭日升'],
    answerIndex: 0,
    explanation: '健力宝！「东方魔水」的传说，当年的国民运动饮料。',
  },
  {
    id: 'q11', type: 'price',
    content: '一张小浣熊水浒闪卡在当年能换几袋干脆面？',
    options: ['1袋', '3袋', '10袋以上', '无价之宝'],
    answerIndex: 2,
    explanation: '稀有卡10袋起！宋江、卢俊义这种卡当年能炒到几十块。',
  },
  {
    id: 'q12', type: 'brand',
    content: '「再看我就把你喝掉」是哪个产品的广告语？',
    options: ['旺仔牛奶', 'AD钙奶', '爽歪歪', '营养快线'],
    answerIndex: 0,
    explanation: '旺仔牛奶！那个盯着你看的大头娃娃，你还会模仿吗？',
  },
  {
    id: 'q13', type: 'image',
    content: '游戏机画面中是哪款经典游戏？',
    image: imgQ('🎮'),
    options: ['魂斗罗', '超级玛丽', '坦克大战', '冒险岛'],
    answerIndex: 0,
    explanation: '魂斗罗！「上上下下左右左右BABA」——30条人命秘籍！',
  },
  {
    id: 'q14', type: 'price',
    content: '五毛钱在90年代小学门口不能买到什么？',
    options: ['一袋干脆面', '一包辣条', '一瓶AD钙奶', '两个冰袋'],
    answerIndex: 2,
    explanation: 'AD钙奶要两块钱！在当时绝对是「贵族饮品」。',
  },
  {
    id: 'q15', type: 'brand',
    content: '「味道好极了」是哪个品牌的经典广告语？',
    options: ['康师傅', '统一', '雀巢咖啡', '麦斯威尔'],
    answerIndex: 2,
    explanation: '雀巢咖啡！当年第一个让中国人尝到速溶咖啡的牌子。',
  },
  {
    id: 'q16', type: 'image',
    content: '这个90年代女孩必备的东西是？',
    image: imgQ('⭐'),
    options: ['明星贴纸', '邮票', '便利贴', '卡片'],
    answerIndex: 0,
    explanation: '明星不干胶贴纸！抄歌本、铅笔盒、课本上贴满的都是。',
  },
  {
    id: 'q17', type: 'price',
    content: '四驱兄弟同款四驱车在1998年大约卖多少钱？',
    options: ['5元', '15元', '35元', '100元'],
    answerIndex: 2,
    explanation: '约35元！在当年月工资几百元的时代，算是巨款玩具。',
  },
  {
    id: 'q18', type: 'brand',
    content: '「燕舞燕舞，一曲歌来一片情」是哪家的广告？',
    options: ['燕舞收录机', '步步高VCD', '新科VCD', '长虹电视'],
    answerIndex: 0,
    explanation: '燕舞收录机！这是中国第一个家喻户晓的电器广告歌。',
  },
  {
    id: 'q19', type: 'image',
    content: '这个吃的叫什么？',
    image: imgQ('🦝'),
    options: ['小浣熊干脆面', '小虎队干脆面', '小当家干脆面', '康师傅干脆面'],
    answerIndex: 0,
    explanation: '小浣熊！水浒卡的缔造者，童年的集卡噩梦/快乐。',
  },
  {
    id: 'q20', type: 'price',
    content: '90年代一张贺年卡（明信片）大概多少钱？',
    options: ['1毛', '5毛-2元', '5元', '10元'],
    answerIndex: 1,
    explanation: '5毛到2元不等！元旦前全班互送，抽屉里堆成小山。',
  },
];

export function getRandomQuestions(count: number = 5): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ===== 弹幕模拟数据 =====
export const mockDanmakuList: Danmaku[] = [
  { id: 'd1', city: '北京', nickname: '胡同王同学', productName: '麦丽素', message: '那年我8岁，奶奶偷偷给我买的', age: 8, likes: 128, createdAt: '2024-05-12 14:23' },
  { id: 'd2', city: '上海', nickname: '弄堂阿花', productName: '大白兔奶糖', message: '过年外婆的年货口袋里总有', age: 10, likes: 89, createdAt: '2024-05-12 14:25' },
  { id: 'd3', city: '广州', nickname: '西关小霸王', productName: '大大卷泡泡糖', message: '比谁吹的泡泡大我从没输过', age: 9, likes: 66, createdAt: '2024-05-12 14:28' },
  { id: 'd4', city: '成都', nickname: '锦里小辣椒', productName: '卫龙大面筋辣条', message: '辣到嘶嘶吸气还要吃！', age: 12, likes: 233, createdAt: '2024-05-12 14:30' },
  { id: 'd5', city: '武汉', nickname: '江城少年', productName: '小浣熊干脆面', message: '为了集宋江卡买了三箱', age: 11, likes: 452, createdAt: '2024-05-12 14:32' },
  { id: 'd6', city: '西安', nickname: '古城娃', productName: '发条铁皮青蛙', message: '爷爷送我的第一个玩具', age: 6, likes: 178, createdAt: '2024-05-12 14:35' },
  { id: 'd7', city: '杭州', nickname: '西湖小书生', productName: '铁皮铅笔盒', message: '乘法口诀全靠它才记住', age: 10, likes: 91, createdAt: '2024-05-12 14:37' },
  { id: 'd8', city: '南京', nickname: '金陵囡囡', productName: '明星贴纸', message: '贴满了整个还珠格格抄歌本', age: 13, likes: 321, createdAt: '2024-05-12 14:40' },
  { id: 'd9', city: '深圳', nickname: '鹏城打工人', productName: 'AD钙奶', message: '现在加班还在喝，童年的安慰剂', age: 8, likes: 567, createdAt: '2024-05-12 14:42' },
  { id: 'd10', city: '天津', nickname: '卫嘴子', productName: '老式橘子汽水', message: '退瓶还能换五毛钱！', age: 7, likes: 145, createdAt: '2024-05-12 14:45' },
  { id: 'd11', city: '重庆', nickname: '山城幺妹', productName: '香菇肥牛', message: '晚自习必备口粮', age: 14, likes: 78, createdAt: '2024-05-12 14:47' },
  { id: 'd12', city: '沈阳', nickname: '铁西老妹儿', productName: '老式爆米花', message: '砰的一声，我以为炸弹来了', age: 9, likes: 234, createdAt: '2024-05-12 14:50' },
  { id: 'd13', city: '昆明', nickname: '春城小太阳', productName: '健力宝', message: '运动会才有的特供饮料！', age: 10, likes: 112, createdAt: '2024-05-12 14:52' },
  { id: 'd14', city: '青岛', nickname: '海边小哥', productName: '水中套圈游戏机', message: '上课被老师没收了三个！', age: 11, likes: 433, createdAt: '2024-05-12 14:55' },
  { id: 'd15', city: '厦门', nickname: '鼓浪屿少女', productName: '水果橡皮', message: '从来舍不得用来擦字', age: 8, likes: 199, createdAt: '2024-05-12 14:57' },
];

// ===== Banner 数据 =====
export const banners: Banner[] = [
  {
    id: 'b1',
    title: '五毛零食特辑',
    subtitle: '带你回到放学铃响的那一刻',
    image: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 240' width='600' height='240'>
        <defs><linearGradient id='g1' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='%23FFB6C1'/><stop offset='1' stop-color='%23FFD28A'/>
        </linearGradient></defs>
        <rect width='600' height='240' fill='url(%23g1)'/>
        <text x='80' y='110' font-size='72' text-anchor='start'>🍬</text>
        <text x='520' y='130' font-size='60' text-anchor='end'>🌶️🍫🦝</text>
      </svg>`
    ),
    bgColor: 'from-retro-pink/40 to-warm-200',
    link: '/category/snack',
  },
  {
    id: 'b2',
    title: '童年玩具回忆杀',
    subtitle: '铁皮青蛙·水中套圈·四驱车',
    image: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 240' width='600' height='240'>
        <defs><linearGradient id='g2' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='%2387CEEB'/><stop offset='1' stop-color='%23BFF5BF'/>
        </linearGradient></defs>
        <rect width='600' height='240' fill='url(%23g2)'/>
        <text x='80' y='120' font-size='72'>🐸🎯🌀</text>
      </svg>`
    ),
    bgColor: 'from-retro-blue/40 to-mint-200',
    link: '/category/toy',
  },
  {
    id: 'b3',
    title: '文具柜开柜门啦',
    subtitle: '铁皮铅笔盒·明星贴纸·改正纸',
    image: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 240' width='600' height='240'>
        <defs><linearGradient id='g3' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='%23BFF5BF'/><stop offset='1' stop-color='%23FFE4B5'/>
        </linearGradient></defs>
        <rect width='600' height='240' fill='url(%23g3)'/>
        <text x='100' y='120' font-size='64'>📦✏️📄</text>
      </svg>`
    ),
    bgColor: 'from-mint-200 to-warm-200',
    link: '/category/stationery',
  },
  {
    id: 'b4',
    title: '🎄 夏日冰袋特供',
    subtitle: '五毛一袋，掰成两半分着吃',
    image: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 240' width='600' height='240'>
        <defs><linearGradient id='g4' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='%23FFD700'/><stop offset='1' stop-color='%23FFB6C1'/>
        </linearGradient></defs>
        <rect width='600' height='240' fill='url(%23g4)'/>
        <text x='90' y='125' font-size='72'>🧊🍊🍿</text>
      </svg>`
    ),
    bgColor: 'from-retro-yellow/50 to-retro-pink/30',
    link: '/category/seasonal',
  },
  {
    id: 'b5',
    title: '🎯 限时答题赢券',
    subtitle: '测测你的童年记忆值！',
    image: 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 240' width='600' height='240'>
        <defs><linearGradient id='g5' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='%23B22222' stop-opacity='0.7'/><stop offset='1' stop-color='%23FFD700'/>
        </linearGradient></defs>
        <rect width='600' height='240' fill='url(%23g5)'/>
        <text x='100' y='130' font-size='72'>🏆🎁💯</text>
      </svg>`
    ),
    bgColor: 'from-rust-400/30 to-warm-300',
    link: '/quiz',
  },
];

// ===== 排行榜 =====
export const rankingList: RankingItem[] = [
  { rank: 1, nickname: '胡同里的怀旧王', avatar: '👴', city: '北京', score: 98, title: '童年学神' },
  { rank: 2, nickname: '小卖部常客', avatar: '👧', city: '上海', score: 95, title: '怀旧大师' },
  { rank: 3, nickname: '水浒卡收藏家', avatar: '🧑', city: '武汉', score: 93, title: '记忆达人' },
  { rank: 4, nickname: '玻璃弹珠王', avatar: '🧒', city: '成都', score: 90, title: '怀旧高手' },
  { rank: 5, nickname: '铁皮青蛙玩家', avatar: '👦', city: '西安', score: 88, title: '童年通' },
  { rank: 6, nickname: '四驱兄弟', avatar: '🧑', city: '广州', score: 85, title: '资深玩家' },
  { rank: 7, nickname: '还珠格格铁粉', avatar: '👧', city: '长沙', score: 82, title: '怀旧爱好者' },
  { rank: 8, nickname: '干脆面集卡党', avatar: '🧒', city: '沈阳', score: 80, title: '回忆杀选手' },
  { rank: 9, nickname: 'AD钙奶爱好者', avatar: '👦', city: '深圳', score: 78, title: '童年通' },
  { rank: 10, nickname: '粉笔灰老师', avatar: '👩', city: '杭州', score: 75, title: '怀旧爱好者' },
];

// ===== 默认优惠券（模拟） =====
export const mockCoupons: Coupon[] = [
  {
    id: 'c1', name: '新客首单立减', type: 'threshold', value: 10, threshold: 30,
    expireAt: '2024-12-31', used: false, code: 'XXS10',
  },
  {
    id: 'c2', name: '童年回忆券', type: 'nothreshold', value: 5,
    expireAt: '2024-07-30', used: false, code: 'TN5',
  },
];
