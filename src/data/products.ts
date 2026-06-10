import type { Product } from '@/types';

const img = (emoji: string, bg: string = '#FFE4B5') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300' width='300' height='300'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${bg}'/><stop offset='1' stop-color='#FFD28A'/>
      </linearGradient></defs>
      <rect width='300' height='300' fill='url(%23g)'/>
      <rect x='10' y='10' width='280' height='280' rx='16' fill='none' stroke='%238B4513' stroke-width='3' stroke-dasharray='8 6' opacity='0.4'/>
      <text x='50%25' y='52%25' font-size='140' text-anchor='middle' dominant-baseline='middle'>${emoji}</text>
    </svg>`
  )}`;

export const products: Product[] = [
  // ===== 零食铺 Snack =====
  {
    id: 's001', name: '卫龙大面筋辣条', category: 'snack',
    price: 2.5, originalPrice: 3.0, image: img('🌶️'),
    nostalgiaStars: 5, era: '90s', sales: 9823, stock: 999,
    tags: ['辣', '经典', '五毛'],
    memoryStory: '1998年，校门口小卖部最抢手的存在。每节课间都要趴在玻璃柜前咽口水，省下五毛钱只为放学后那一口，辣得嘶嘶吸气还停不下来，手指舔三遍才罢休。',
    coldKnowledge: '卫龙最早叫「平平」，后来改名「卫龙」，寓意保卫龙的传人～',
    reviews: [
      { id: 'r1', nickname: '小霸王', avatar: '👦', image: img('🌶️'), comment: '还是小时候的味道！辣到爽！', createdAt: '2024-05-12' },
      { id: 'r2', nickname: '糖糖', avatar: '👧', image: img('🌶️'), comment: '包装变了味道没变，哭了', createdAt: '2024-05-10' },
    ],
  },
  {
    id: 's002', name: '大白兔奶糖', category: 'snack',
    price: 9.9, originalPrice: 12.0, image: img('🍬'),
    nostalgiaStars: 5, era: '80s', sales: 12450, stock: 999,
    tags: ['甜', '国民级', '走亲戚必备'],
    memoryStory: '过年才能吃到的奢侈品！大白兔、喔喔、佳佳是年货三件套，揣在兜里可以吃整个正月。可食用的糯米纸总被小伙伴抢着吃。',
    coldKnowledge: '大白兔1959年诞生于上海，当年是国庆十周年献礼产品！',
  },
  {
    id: 's003', name: '麦丽素巧克力豆', category: 'snack',
    price: 5.8, originalPrice: 7.0, image: img('🍫'),
    nostalgiaStars: 5, era: '90s', sales: 8765, stock: 999,
    tags: ['仙丹', '拍戏必备', '巧克力'],
    memoryStory: '影视剧里的「九转还魂丹」！倒一颗在手心，假装自己是武侠高手运功疗伤，吃完感觉内力大增，可以和同桌大战三百回合。',
  },
  {
    id: 's004', name: '小浣熊干脆面', category: 'snack',
    price: 1.5, originalPrice: 2.0, image: img('🦝'),
    nostalgiaStars: 5, era: '90s', sales: 15320, stock: 999,
    tags: ['水浒卡', '捏碎吃', '集卡狂魔'],
    memoryStory: '为了集齐108将，买了整整一箱干脆面！拆开先摸卡，卡好就炫耀，卡重复就和同桌交换。最后面饼都分给邻居小孩了。',
    coldKnowledge: '小浣熊水浒卡总共114张（含6张恶人卡），当年一张「宋江」能换10袋面！',
  },
  {
    id: 's005', name: '咪咪虾条', category: 'snack',
    price: 0.8, image: img('🦐'),
    nostalgiaStars: 4, era: '90s', sales: 20110, stock: 999,
    tags: ['五毛零食', '鲜', '停不下来'],
    memoryStory: '五毛钱一大包！打开先闻一下那个虾香，倒在手心一根一根舔着吃，最后把袋里的渣子倒嘴里，嗦手指头都能嗦三分钟。',
  },
  {
    id: 's006', name: '跳跳糖', category: 'snack',
    price: 1.2, image: img('💥'),
    nostalgiaStars: 4, era: '90s', sales: 7890, stock: 999,
    tags: ['刺激', '黑科技', '爆炸'],
    memoryStory: '第一次吃以为会爆炸！倒在嘴里那一瞬间，噼里啪啦像开炮，张大嘴让同桌看「冒烟」，是当年最酷的表演项目。',
  },
  {
    id: 's007', name: '大大卷泡泡糖', category: 'snack',
    price: 3.5, originalPrice: 4.5, image: img('🫧'),
    nostalgiaStars: 5, era: '90s', sales: 6543, stock: 999,
    tags: ['吹泡泡', '比谁大', '广告语'],
    memoryStory: '「大大泡泡糖，吹出大梦想！」能拉两米长的卷！上课偷偷在嘴里嚼，被老师抓到就咽下去（大人说会粘肠子吓得半死）。',
  },
  {
    id: 's008', name: '猴王丹/华华丹', category: 'snack',
    price: 1.0, image: img('🐒'),
    nostalgiaStars: 4, era: '80s', sales: 5432, stock: 999,
    tags: ['老鼠屎', '陈皮', '清凉'],
    memoryStory: '外号「老鼠屎」！小小的塑料盒，打开是一颗颗黑乎乎的丸子，含在嘴里酸酸甜甜，一下课就和小伙伴你一颗我一颗地分。',
  },
  {
    id: 's009', name: 'AD钙奶', category: 'snack',
    price: 4.5, image: img('🥛'),
    nostalgiaStars: 5, era: '90s', sales: 18765, stock: 999,
    tags: ['娃哈哈', '国民饮料', '童年味道'],
    memoryStory: '考双百才有的奖励！吸管插到底，仰起头一口气喝完，最后还得挤一挤瓶子。那个酸甜味儿，是童年快乐的味道。',
  },
  {
    id: 's010', name: '南京板鸭味膨化', category: 'snack',
    price: 0.5, image: img('🦆'),
    nostalgiaStars: 4, era: '90s', sales: 9999, stock: 999,
    tags: ['五毛', '膨化', '咸香'],
    memoryStory: '五毛钱就有交易！金黄酥脆的小块，咸香带一点点辣，放学路上边走边吃，到家还在舔手指。',
  },
  {
    id: 's011', name: '健力宝橙蜜味', category: 'snack',
    price: 4.0, originalPrice: 5.0, image: img('🥤'),
    nostalgiaStars: 5, era: '80s', sales: 8888, stock: 999,
    tags: ['东方魔水', '运动饮料', '国潮'],
    memoryStory: '「东方魔水」的传说！过年过节酒席上才舍得买，铝罐拉开「滋」的一声，喝一口神气一整天。',
  },
  {
    id: 's012', name: '比巴卜棉花泡泡糖', category: 'snack',
    price: 2.0, image: img('☁️'),
    nostalgiaStars: 3, era: '00s', sales: 4321, stock: 999,
    tags: ['棉花糖', '纹身贴', '粉粉'],
    memoryStory: '包装里的纹身贴比糖还抢手！贴在手背上一星期舍不得洗，糖是软软的棉花糖口感，吹泡泡超容易破满脸。',
  },
  {
    id: 's013', name: '香橙味大大卷', category: 'snack',
    price: 3.0, image: img('🍊'),
    nostalgiaStars: 4, era: '00s', sales: 3456, stock: 999,
    tags: ['橙子味', '超长'],
    memoryStory: '能拉好长好长！最喜欢在课堂偷偷拉，被老师点名时一着急吞下去半米，回家担心了一晚上会不会粘肠子。',
  },
  {
    id: 's014', name: '香菇肥牛', category: 'snack',
    price: 1.0, image: img('🍄'),
    nostalgiaStars: 4, era: '90s', sales: 7654, stock: 999,
    tags: ['大豆制品', '牛肉味', '嚼劲'],
    memoryStory: '有嚼劲！咸香带甜，是课间解闷神器，一根能嚼十分钟，上课偷偷放嘴里嚼，腮帮子鼓鼓的被老师点名。',
  },
  {
    id: 's015', name: '五彩绳软糖', category: 'snack',
    price: 1.5, image: img('🎀'),
    nostalgiaStars: 3, era: '00s', sales: 5678, stock: 999,
    tags: ['彩色', '好玩', '糖绳'],
    memoryStory: '五颜六色的绳子糖！先选喜欢的颜色，扯成手链戴手上，然后一节一节咬着吃，又能玩又能吃。',
  },

  // ===== 玩具摊 Toy =====
  {
    id: 't001', name: '发条铁皮青蛙', category: 'toy',
    price: 12.8, originalPrice: 18.0, image: img('🐸'),
    nostalgiaStars: 5, era: '80s', sales: 6789, stock: 500,
    tags: ['发条', '铁皮', '经典'],
    memoryStory: '拧上几圈发条，呱呱呱往前蹦！漆皮掉了斑驳的地方，都是童年摸过的痕迹。当年谁家有这个，谁就是孩子王。',
    coldKnowledge: '铁皮青蛙是上世纪60年代上海玩具二厂的经典设计，鼎盛时期年产千万只！',
  },
  {
    id: 't002', name: '水中套圈游戏机', category: 'toy',
    price: 8.8, image: img('🎯'),
    nostalgiaStars: 5, era: '90s', sales: 12345, stock: 999,
    tags: ['水压', '套圈', '手感'],
    memoryStory: '不用电池的黑科技！两个按键按来按去，把彩色圈套进小柱子里。上课偷玩被老师没收，哭了整整一节课。',
  },
  {
    id: 't003', name: '泡泡胶/太空气球', category: 'toy',
    price: 3.0, image: img('🎈'),
    nostalgiaStars: 5, era: '90s', sales: 8765, stock: 999,
    tags: ['吹泡泡', '铝管', '臭臭的'],
    memoryStory: '挤一点在小管子上，憋红脸蛋使劲吹，吹到最大再拍破！味道臭臭的但就是喜欢，嘴上还会粘上黏糊糊的胶。',
  },
  {
    id: 't004', name: '竹蜻蜓', category: 'toy',
    price: 2.5, image: img('🌿'),
    nostalgiaStars: 4, era: '80s', sales: 5432, stock: 999,
    tags: ['飞天', '手搓', '比高'],
    memoryStory: '两手一搓，「嗖」的一下飞上天！小伙伴们比谁飞得高，掉在树上就哭着喊大人帮忙拿。',
  },
  {
    id: 't005', name: '翻花绳/编绳', category: 'toy',
    price: 1.8, image: img('🪢'),
    nostalgiaStars: 5, era: '80s', sales: 9876, stock: 999,
    tags: ['两人游戏', '花样多', '课间'],
    memoryStory: '「面条」「大桥」「五角星」「渔网」……一根绳子能变出几十种花样！下课后女生桌子上必出现的风景线。',
  },
  {
    id: 't006', name: '东南西北折纸', category: 'toy',
    price: 1.0, image: img('🧭'),
    nostalgiaStars: 5, era: '80s', sales: 11111, stock: 999,
    tags: ['折纸', '算命', '同桌必玩'],
    memoryStory: '「东三下，南五下……打开！」里面写着「你喜欢谁」「你是猪」「下周测验100分」，是童年的「命运占卜机」。',
  },
  {
    id: 't007', name: '玻璃弹珠', category: 'toy',
    price: 5.0, image: img('🔮'),
    nostalgiaStars: 5, era: '80s', sales: 7777, stock: 999,
    tags: ['弹弹珠', '猫眼', '挖洞'],
    memoryStory: '兜里沉甸甸的全是弹珠！猫眼、奶油、三花是极品，赢了对方的珠子能炫耀一周，输了就心疼得睡不着。',
  },
  {
    id: 't008', name: '四驱兄弟四驱车', category: 'toy',
    price: 29.9, originalPrice: 39.9, image: img('🏎️'),
    nostalgiaStars: 5, era: '90s', sales: 6666, stock: 500,
    tags: ['旋风冲锋', '拼装', '跑道'],
    memoryStory: '「抬头望望天，月亮在笑～」看完动画片立刻去小卖部买回旋风冲锋，熬夜拼装，马达转起来的声音就是童年的心跳！',
  },
  {
    id: 't009', name: '战斗陀螺', category: 'toy',
    price: 19.9, image: img('🌀'),
    nostalgiaStars: 4, era: '00s', sales: 5555, stock: 999,
    tags: ['爆旋', '对战盘', '发射'],
    memoryStory: '「爆转！」陀螺在对战盘里激烈碰撞的声音，是放学后操场边最热闹的风景。为了赢，偷偷把陀螺铁块加重。',
  },
  {
    id: 't010', name: '小霸王游戏卡', category: 'toy',
    price: 25.0, image: img('🎮'),
    nostalgiaStars: 5, era: '90s', sales: 8888, stock: 200,
    tags: ['FC', '魂斗罗', '超级玛丽'],
    memoryStory: '「小霸王其乐无穷啊！」开机声一响就知道，周末又要和兄弟抢手柄了。魂斗罗上上下下左右左右BABA，至今还记得。',
  },
  {
    id: 't011', name: '俄罗斯方块掌机', category: 'toy',
    price: 15.8, image: img('🕹️'),
    nostalgiaStars: 5, era: '90s', sales: 9999, stock: 999,
    tags: ['黑白屏', '21关', '谁没过'],
    memoryStory: '装两节五号电池就能玩一晚上！玩到第21关速度快到按不过来，屏幕右上角那个小人儿跑步越快分越高。',
  },
  {
    id: 't012', name: '粘粘手/爬墙人', category: 'toy',
    price: 1.0, image: img('🦎'),
    nostalgiaStars: 4, era: '90s', sales: 4444, stock: 999,
    tags: ['粘墙', '弹性', '恶心'],
    memoryStory: '往墙上一扔，啪！然后慢慢往下滑，翻着跟头的样子超搞笑。玩几天粘满灰就扔了，再买新的。',
  },
  {
    id: 't013', name: '吹龙/吹卷', category: 'toy',
    price: 1.5, image: img('📯'),
    nostalgiaStars: 3, era: '90s', sales: 3333, stock: 999,
    tags: ['派对', '节日', '声响'],
    memoryStory: '一吹就卷出来还发出怪声！过生日、过新年必玩，对着小伙伴的脸吹，追着跑整个操场。',
  },
  {
    id: 't014', name: '万花筒', category: 'toy',
    price: 6.8, image: img('🌈'),
    nostalgiaStars: 4, era: '80s', sales: 3210, stock: 999,
    tags: ['光学', '花纹', '神奇'],
    memoryStory: '对着光转一下，里面的世界就变个样！每一个图案都不一样，盯着看十分钟都不腻，以为里面藏着另一个宇宙。',
  },
  {
    id: 't015', name: '拉线飞轮/风火轮', category: 'toy',
    price: 2.0, image: img('🔥'),
    nostalgiaStars: 4, era: '90s', sales: 6543, stock: 999,
    tags: ['拉线', '嗡鸣', '发光'],
    memoryStory: '双手拉绳子反复扯，「嗡嗡嗡」的声音越来越大，转得快了还会发光！是操场边最拉风的玩具。',
  },

  // ===== 文具柜 Stationery =====
  {
    id: 'w001', name: '铁皮铅笔盒', category: 'stationery',
    price: 18.8, originalPrice: 25.0, image: img('📦'),
    nostalgiaStars: 5, era: '80s', sales: 5678, stock: 300,
    tags: ['变形金刚', '乘法口诀', '铁皮'],
    memoryStory: '打开盒盖就是乘法口诀表！关起来「咔哒」一声的磁吸超有质感。谁的铅笔盒上有变形金刚，谁就是全班最靓的仔。',
    coldKnowledge: '铁皮铅笔盒内侧的乘法口诀，是多少人数学启蒙的起点！',
  },
  {
    id: 'w002', name: '水果造型橡皮', category: 'stationery',
    price: 2.5, image: img('🍎'),
    nostalgiaStars: 5, era: '90s', sales: 12345, stock: 999,
    tags: ['好看', '舍不得用', '香'],
    memoryStory: '每一块都做得跟真水果一样，闻着香香的！根本舍不得用来擦字，放在铅笔盒里当展品，过期了都还是新的。',
  },
  {
    id: 'w003', name: '改正纸/涂改贴', category: 'stationery',
    price: 1.5, image: img('📄'),
    nostalgiaStars: 5, era: '90s', sales: 10000, stock: 999,
    tags: ['修正', '一撕一贴', '沙沙声'],
    memoryStory: '写错字的救星！撕下来「沙沙」的声音超解压，贴在作业本上厚厚一层，老师看了皱眉但我们超得意。',
  },
  {
    id: 'w004', name: '香珠笔/圆珠笔', category: 'stationery',
    price: 3.0, image: img('🖊️'),
    nostalgiaStars: 4, era: '00s', sales: 7654, stock: 999,
    tags: ['香味', '多色', '按动'],
    memoryStory: '按动笔头「哒哒哒」的声音是上课的BGM！笔尾的香珠闻着上课都不困，各种颜色换着用。',
  },
  {
    id: 'w005', name: '印花胶带/透明胶', category: 'stationery',
    price: 1.8, image: img('🎞️'),
    nostalgiaStars: 4, era: '00s', sales: 5432, stock: 999,
    tags: ['粘错字', '手撕', '花纹'],
    memoryStory: '用透明胶在作业本上一粘一撕，错字就消失了！粘得不好会撕破本子，还会被老师说「你这是补丁作业吗」。',
  },
  {
    id: 'w006', name: '荧光笔彩色套装', category: 'stationery',
    price: 6.0, image: img('🖍️'),
    nostalgiaStars: 4, era: '00s', sales: 6789, stock: 999,
    tags: ['划重点', '彩色', '香味'],
    memoryStory: '课本上花花绿绿全是荧光笔划的线！以为划了就是记住了，其实考试时还是记不住，但就是喜欢画。',
  },
  {
    id: 'w007', name: '自动铅笔 0.5mm', category: 'stationery',
    price: 5.0, image: img('✏️'),
    nostalgiaStars: 5, era: '90s', sales: 9999, stock: 999,
    tags: ['不断芯', '铅芯', '按动'],
    memoryStory: '有一支好写的自动铅笔是学霸的标配！0.5和0.7争论哪个更好写，摔断笔尖是世界上最心疼的事。',
  },
  {
    id: 'w008', name: '韩版信纸信封', category: 'stationery',
    price: 4.5, image: img('💌'),
    nostalgiaStars: 4, era: '00s', sales: 3456, stock: 999,
    tags: ['写情书', '香味', '折千纸鹤'],
    memoryStory: '粉色带香味的信纸！工工整整地写情书，折成心形或千纸鹤，忐忑地塞进喜欢的人抽屉里。',
  },
  {
    id: 'w009', name: '明星贴纸/不干胶', category: 'stationery',
    price: 3.0, image: img('⭐'),
    nostalgiaStars: 5, era: '90s', sales: 8888, stock: 999,
    tags: ['还珠格格', 'F4', '抄歌本'],
    memoryStory: '五毛钱一大张！贴在抄歌本、铅笔盒、课桌上，还珠格格、F4、S.H.E.……追星的起点从贴纸开始。',
  },
  {
    id: 'w010', name: '塑料垫板/写字板', category: 'stationery',
    price: 3.5, image: img('🪟'),
    nostalgiaStars: 4, era: '90s', sales: 4567, stock: 999,
    tags: ['考试用', '卡通', '垫着写'],
    memoryStory: '考试专用！垫板下面偷偷压着小抄（别学），上面印着还珠格格或哆啦A梦，用久了边角都会卷起来。',
  },
  {
    id: 'w011', name: '日记本带锁', category: 'stationery',
    price: 8.8, image: img('🔐'),
    nostalgiaStars: 5, era: '90s', sales: 6666, stock: 999,
    tags: ['小秘密', '挂锁', '钥匙'],
    memoryStory: '有锁的日记本，藏着童年所有的小秘密！钥匙藏在枕头底下，写的内容连爸妈都不能看。',
  },
  {
    id: 'w012', name: '彩色粉笔套装', category: 'stationery',
    price: 4.0, image: img('🖌️'),
    nostalgiaStars: 3, era: '90s', sales: 2345, stock: 999,
    tags: ['画黑板报', '彩粉', '粉笔灰'],
    memoryStory: '出黑板报的高光时刻！彩色粉笔在黑板上沙沙地画，蹭得满手满脸都是粉笔灰，还乐在其中。',
  },
  {
    id: 'w013', name: '圆规套装', category: 'stationery',
    price: 7.5, image: img('📐'),
    nostalgiaStars: 4, era: '90s', sales: 3456, stock: 999,
    tags: ['几何课', '铁盒', '扎人'],
    memoryStory: '圆规的铁脚超锋利！上课偷偷扎橡皮、扎同桌，被老师点名时假装在认真画圆。',
  },
  {
    id: 'w014', name: '蜡笔12色', category: 'stationery',
    price: 5.5, image: img('🖍️'),
    nostalgiaStars: 4, era: '80s', sales: 5678, stock: 999,
    tags: ['美术课', '油画棒', '涂色'],
    memoryStory: '美术课上的宝贝！红色蜡笔永远是最先用完的，画完手上颜色混在一起像小花猫。',
  },
  {
    id: 'w015', name: '课程表卡片', category: 'stationery',
    price: 0.5, image: img('📅'),
    nostalgiaStars: 4, era: '90s', sales: 9999, stock: 999,
    tags: ['铅笔盒里', '明星', '手写'],
    memoryStory: '自己手写的课程表！背面是还珠格格小燕子，贴在铅笔盒内侧，每天早上看一眼就知道要带什么书。',
  },

  // ===== 季节限定 Seasonal =====
  {
    id: 'j001', name: '老式橘子汽水 玻璃瓶', category: 'seasonal',
    price: 3.5, image: img('🍊'),
    nostalgiaStars: 5, era: '80s', sales: 9876, stock: 999,
    tags: ['夏天', '玻璃瓶', '退瓶'],
    memoryStory: '夏天最期待的就是冰汽水！玻璃瓶冰得结满水珠，「砰」的一声开瓶，咕咚咕咚喝下去，气儿从鼻子里冒出来，爽！',
  },
  {
    id: 'j002', name: '冰冰袋/冰棒袋', category: 'seasonal',
    price: 0.5, image: img('🧊'),
    nostalgiaStars: 5, era: '90s', sales: 15000, stock: 999,
    tags: ['五毛', '掰成两半', '舔着吃'],
    memoryStory: '五毛钱一袋！冻成硬邦邦的冰块，撕个小口舔着吃，或者从中间掰开和小伙伴一人一半，是夏天最廉价的快乐。',
  },
  {
    id: 'j003', name: '老式爆米花', category: 'seasonal',
    price: 10.0, image: img('🍿'),
    nostalgiaStars: 5, era: '80s', sales: 7654, stock: 500,
    tags: ['炸一声', '黑葫芦', '胡同'],
    memoryStory: '胡同口「砰」的一声巨响！捂着耳朵又害怕又期待，老爷爷从黑葫芦里倒出白花花的爆米花，装满满一布袋子能吃三天。',
  },
  {
    id: 'j004', name: '暖手宝/热水袋', category: 'seasonal',
    price: 15.8, image: img('🫖'),
    nostalgiaStars: 4, era: '90s', sales: 5432, stock: 300,
    tags: ['冬天', '橡胶', '灌热水'],
    memoryStory: '冬天上课的救星！睡前灌好热水塞进被窝，早上起来还是温的。上课放腿上，被老师发现了就红着脸说「我冷」。',
  },
  {
    id: 'j005', name: '糖画/转糖人', category: 'seasonal',
    price: 8.0, image: img('🐉'),
    nostalgiaStars: 5, era: '80s', sales: 3210, stock: 200,
    tags: ['庙会', '转盘', '大龙'],
    memoryStory: '庙会里最期待的！转盘指针指到龙就全场欢呼，指到蝴蝶就有点失落。糖画做完舔着吃，甜到心里。',
  },
  {
    id: 'j006', name: '捏面人/泥人', category: 'seasonal',
    price: 12.0, image: img('🎎'),
    nostalgiaStars: 4, era: '80s', sales: 2109, stock: 200,
    tags: ['庙会', '手工', '孙悟空'],
    memoryStory: '老爷爷几分钟就能捏出一个孙悟空！彩色的小面人栩栩如生，买回家舍不得吃，放着放着就干裂了还在摆着。',
  },
  {
    id: 'j007', name: '圣诞苹果 平安夜', category: 'seasonal',
    price: 6.6, image: img('🍎'),
    nostalgiaStars: 3, era: '00s', sales: 8888, stock: 999,
    tags: ['平安夜', '包装纸', '送喜欢的人'],
    memoryStory: '平安夜最流行送苹果！用彩色玻璃纸包好，系上蝴蝶结，偷偷塞给喜欢的人，苹果多少钱不重要，心意最值钱。',
  },
  {
    id: 'j008', name: '元宵灯会纸灯笼', category: 'seasonal',
    price: 9.9, image: img('🏮'),
    nostalgiaStars: 4, era: '90s', sales: 4567, stock: 300,
    tags: ['正月十五', '点蜡烛', '手提'],
    memoryStory: '正月十五闹花灯！提着小灯笼和小伙伴比谁的好看，蜡烛烧完了就哭着回家，第二天还能接着玩。',
  },
  {
    id: 'j009', name: '端午五彩绳', category: 'seasonal',
    price: 1.0, image: img('🧵'),
    nostalgiaStars: 4, era: '80s', sales: 6789, stock: 999,
    tags: ['端午节', '祈福', '节后扔'],
    memoryStory: '端午节前一天奶奶给系上的！五种颜色的绳子戴在手腕脚腕，节后第一场雨就扔到水里，寓意送走病灾。',
  },
  {
    id: 'j010', name: '中秋月饼 老式五仁', category: 'seasonal',
    price: 18.8, image: img('🥮'),
    nostalgiaStars: 4, era: '80s', sales: 7777, stock: 500,
    tags: ['纸包月饼', '青红丝', '传统'],
    memoryStory: '油纸包着的老式月饼！青红丝、瓜子仁、花生碎，虽然现在被吐槽最多，但就是小时候中秋的味道。',
  },
  {
    id: 'j011', name: '春节窗花剪纸', category: 'seasonal',
    price: 5.0, image: img('✂️'),
    nostalgiaStars: 4, era: '80s', sales: 5555, stock: 999,
    tags: ['过年', '红色', '福字'],
    memoryStory: '跟奶奶学剪窗花！折一折剪几刀，打开就是惊艳的图案。贴在窗户上，年味一下就出来了。',
  },
  {
    id: 'j012', name: '孔明灯/许愿灯', category: 'seasonal',
    price: 4.0, image: img('🕯️'),
    nostalgiaStars: 3, era: '00s', sales: 4321, stock: 500,
    tags: ['许愿', '元宵', '放飞'],
    memoryStory: '在灯上写满心愿和喜欢的人的名字，看着它越飞越高越变越小，总觉得这样愿望就一定会实现。',
  },
  {
    id: 'j013', name: '新年红包/利是封', category: 'seasonal',
    price: 3.5, image: img('🧧'),
    nostalgiaStars: 5, era: '80s', sales: 12345, stock: 999,
    tags: ['压岁钱', '过年', '福字'],
    memoryStory: '「恭喜发财，红包拿来！」过年最开心的一句话。红包里的钱总是被爸妈「帮你存起来」，然后就没有然后了。',
  },
  {
    id: 'j014', name: '清明风筝/纸鸢', category: 'seasonal',
    price: 12.0, image: img('🪁'),
    nostalgiaStars: 4, era: '80s', sales: 3456, stock: 300,
    tags: ['踏青', '燕子', '跑着放'],
    memoryStory: '春天来了就放风筝！在草地上跑得满头大汗，风筝线被挂断就坐在地上哭，然后又开开心心去追。',
  },
  {
    id: 'j015', name: '六一儿童节水枪', category: 'seasonal',
    price: 8.8, image: img('🔫'),
    nostalgiaStars: 4, era: '90s', sales: 7654, stock: 999,
    tags: ['儿童节', '打水仗', '夏天'],
    memoryStory: '六一儿童节的标配！装满水和小伙伴在院子里互相滋，浑身湿透被妈妈骂，转头又乐颠颠地继续玩。',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}

export function getRecommendedProducts(): Product[] {
  return [products[0], products[1], products[45], products[30], products[15]];
}
