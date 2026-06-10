import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Target, Gift, RotateCcw, Award, Sparkles, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import { useQuizStore } from '@/store/useQuizStore';
import { useUserStore } from '@/store/useUserStore';
import { useGachaStore } from '@/store/useGachaStore';
import { useToast } from '@/components/common/Toast';
import { rankingList } from '@/data/quiz';
import { cn } from '@/lib/utils';

export default function Quiz() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [tab, setTab] = useState<'quiz' | 'rank'>('quiz');
  const [showLottery, setShowLottery] = useState(false);
  const [lotteryAnim, setLotteryAnim] = useState(false);

  const store = useQuizStore();
  const addCoupon = useUserStore(s => s.addCoupon);
  const addQuizRecord = useUserStore(s => s.addQuizRecord);
  const addCoins = useGachaStore(s => s.addCoins);

  const handleStart = () => {
    if (store.startQuiz()) {
      show('答题开始！加油～', 'info');
    } else {
      show('今天的答题次数用完啦，明天再来哦～', 'error');
    }
  };

  const handleDraw = () => {
    setLotteryAnim(true);
    setTimeout(() => {
      const coupon = store.drawReward();
      setLotteryAnim(false);
      setShowLottery(false);
      if (coupon) {
        addCoupon(coupon);
        const record: any = {
          date: new Date().toISOString().slice(0, 10),
          correctCount: store.correctCount,
          totalQuestions: store.currentQuestions.length,
          reward: coupon,
        };
        addQuizRecord(record);
        show(`🎉 抽到了「${coupon.name}」！已放入优惠券包`, 'success');
      }
    }, 2200);
  };

  const handleFinish = () => {
    store.finishQuiz();
    // 答对全部5题额外奖励1枚童年硬币
    if (store.correctCount === 5) {
      addCoins(1, 'quiz_perfect', '答题满分奖励');
      show('🎉 童年学神！奖励1枚童年硬币', 'success');
    }
    if (store.correctCount >= 3) {
      setTimeout(() => setShowLottery(true), 400);
    } else {
      const record: any = {
        date: new Date().toISOString().slice(0, 10),
        correctCount: store.correctCount,
        totalQuestions: store.currentQuestions.length,
      };
      addQuizRecord(record);
    }
  };

  return (
    <div className="min-h-screen pb-28 bg-warm-50">
      <Header title="🎯 童年记忆考场" />

      {/* Tab切换 */}
      <div className="sticky top-[61px] z-30 bg-warm-50/95 backdrop-blur-sm px-4 pt-3 pb-2 border-b-2 border-kraft-200">
        <div className="flex p-1 rounded-xl bg-kraft-100 border-2 border-kraft-300">
          <button
            onClick={() => setTab('quiz')}
            className={cn(
              'flex-1 py-2 rounded-lg font-handwriting text-lg transition-all flex items-center justify-center gap-1.5',
              tab === 'quiz' ? 'bg-rust-500 text-warm-50 shadow-vintage' : 'text-wood-600'
            )}
          >
            <Target size={18} /> 答题闯关
          </button>
          <button
            onClick={() => setTab('rank')}
            className={cn(
              'flex-1 py-2 rounded-lg font-handwriting text-lg transition-all flex items-center justify-center gap-1.5',
              tab === 'rank' ? 'bg-wood-600 text-warm-50 shadow-vintage' : 'text-wood-600'
            )}
          >
            <Trophy size={18} /> 学神榜
          </button>
        </div>
      </div>

      {tab === 'rank' ? <RankList /> : (
        <div className="px-4 pt-4">
          {/* 未开始 / idle */}
          {store.phase === 'idle' && (
            <div className="space-y-4">
              {/* 考试封面 */}
              <div className="wood-shelf rounded-3xl p-1">
                <div className="rounded-2xl bg-gradient-to-br from-warm-50 to-kraft-100 p-7 text-center relative z-10 overflow-hidden">
                  <div className="absolute top-0 right-0 text-[140px] opacity-5 -rotate-12">📜</div>
                  <div className="relative z-10">
                    <div className="inline-block stamp mb-3">考试时间 每日3次</div>
                    <h2 className="font-handwriting text-4xl text-wood-700 text-shadow-hand mb-2">
                      童年记忆·随堂测验
                    </h2>
                    <p className="text-sm text-kraft-500 mb-6">
                      共5题 · 答对3题即可参与抽奖
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { icon: '🖼️', label: '识图题' },
                        { icon: '💰', label: '价格题' },
                        { icon: '🎙️', label: '品牌题' },
                      ].map(x => (
                        <div key={x.label} className="p-3 rounded-xl bg-warm-100 border-2 border-dashed border-kraft-300">
                          <div className="text-3xl mb-1">{x.icon}</div>
                          <div className="text-xs font-handwriting text-wood-700">{x.label}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-kraft-500 mb-5">
                      今日剩余答题机会：<span className="text-rust-500 font-bold text-base mx-1">{store.canPlayToday() ? store.dailyChances : 0}</span> 次
                    </p>
                    <button
                      onClick={handleStart}
                      disabled={!store.canPlayToday()}
                      className={cn(
                        'btn-retro-primary btn-retro-block !py-3 text-xl',
                        !store.canPlayToday() && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      ✍️ 开始答题
                    </button>
                  </div>
                </div>
              </div>

              {/* 奖励预览 */}
              <div className="card-kraft">
                <div className="relative z-10">
                  <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5 mb-3">
                    <Gift size={18} /> 通关奖励池
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: '满30减10', c: 'bg-retro-pink/40' },
                      { name: '满50减20', c: 'bg-retro-blue/30' },
                      { name: '5元无门槛', c: 'bg-retro-yellow/40' },
                      { name: '包邮券', c: 'bg-mint-200' },
                    ].map(r => (
                      <div key={r.name} className={cn('p-3 rounded-xl border-2 border-kraft-300 text-center', r.c)}>
                        <p className="font-handwriting text-wood-700">{r.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 答题中 */}
          {store.phase === 'answering' && (
            <div className="space-y-4">
              {/* 进度条 */}
              <div className="wood-shelf rounded-2xl p-1">
                <div className="rounded-xl p-3 bg-warm-50 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-handwriting text-wood-700">第 {store.currentIndex + 1} / {store.currentQuestions.length} 题</span>
                    <span className="px-3 py-0.5 rounded-full bg-rust-500 text-warm-50 text-sm font-handwriting border-2 border-rust-700">
                      答对 {store.correctCount} 题
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-kraft-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rust-400 to-rust-600 transition-all duration-500"
                      style={{ width: `${((store.currentIndex + 1) / store.currentQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 题目卡片 - 试卷风格 */}
              <div className="exam-paper min-h-[280px]">
                <div className="flex items-start gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-rust-500 text-warm-50 font-handwriting flex items-center justify-center border-2 border-rust-700">
                    {store.currentIndex + 1}
                  </span>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-retro-blue/40 border border-retro-blue text-xs font-handwriting text-wood-700 mb-1.5">
                      {store.currentQuestions[store.currentIndex].type === 'image' ? '🖼️ 识图题' :
                        store.currentQuestions[store.currentIndex].type === 'price' ? '💰 价格题' :
                          store.currentQuestions[store.currentIndex].type === 'brand' ? '🎙️ 品牌题' : '🔊 声音题'}
                    </span>
                    <h3 className="font-handwriting text-xl text-wood-700 leading-snug">
                      {store.currentQuestions[store.currentIndex].content}
                    </h3>
                  </div>
                </div>

                {store.currentQuestions[store.currentIndex].image && (
                  <div className="mb-5 flex justify-center">
                    <div className="w-full max-w-[300px] rounded-2xl border-[6px] border-wood-500 shadow-vintage overflow-hidden bg-warm-100">
                      <img
                        src={store.currentQuestions[store.currentIndex].image}
                        alt=""
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 mt-4">
                  {store.currentQuestions[store.currentIndex].options.map((opt, i) => {
                    const selected = store.selectedIndexes[store.currentIndex];
                    const isSelected = selected === i;
                    const isCorrect = i === store.currentQuestions[store.currentIndex].answerIndex;
                    const show = store.showExplanation;
                    return (
                      <button
                        key={i}
                        onClick={() => store.selectAnswer(i)}
                        disabled={show}
                        className={cn(
                          'w-full text-left p-3.5 rounded-xl border-2 font-handwriting text-[15px] transition-all flex items-center gap-3',
                          !show && isSelected
                            ? 'bg-warm-200 border-wood-600 shadow-vintage'
                            : !show
                              ? 'bg-warm-50 border-kraft-300 hover:border-wood-500 active:translate-y-[1px]'
                              : isCorrect
                                ? 'bg-mint-200 border-mint-400 text-wood-700'
                                : isSelected
                                  ? 'bg-retro-pink/40 border-rust-400 text-rust-700'
                                  : 'bg-warm-50/50 border-kraft-200 text-kraft-500'
                        )}
                      >
                        <span className={cn(
                          'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold border-2',
                          !show
                            ? 'bg-warm-200 border-wood-500 text-wood-700'
                            : isCorrect
                              ? 'bg-mint-400 border-mint-400 text-wood-700'
                              : isSelected
                                ? 'bg-rust-500 border-rust-500 text-warm-50'
                                : 'bg-warm-100 border-kraft-300 text-kraft-500'
                        )}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {show && isCorrect && <CheckCircle size={18} className="text-wood-600" />}
                        {show && isSelected && !isCorrect && <XCircle size={18} className="text-rust-600" />}
                      </button>
                    );
                  })}
                </div>

                {store.showExplanation && (
                  <div className="mt-4 p-3.5 rounded-xl bg-retro-yellow/30 border-2 border-dashed border-warm-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-sm font-bold text-wood-700 mb-1 flex items-center gap-1">
                      <Sparkles size={14} /> 解题分析
                    </p>
                    <p className="text-sm text-wood-600 leading-relaxed">
                      {store.currentQuestions[store.currentIndex].explanation}
                    </p>
                  </div>
                )}
              </div>

              {store.showExplanation && (
                <button
                  onClick={() => {
                    if (store.currentIndex < store.currentQuestions.length - 1) {
                      store.nextQuestion();
                    } else {
                      handleFinish();
                    }
                  }}
                  className="btn-retro-primary btn-retro-block !py-3 text-lg"
                >
                  {store.currentIndex < store.currentQuestions.length - 1 ? '下一题 →' : '交卷！查看成绩'}
                </button>
              )}
            </div>
          )}

          {/* 完成 */}
          {store.phase === 'finished' && (
            <div className="space-y-4">
              <div className="wood-shelf rounded-3xl p-1">
                <div className="rounded-2xl bg-gradient-to-br from-warm-50 to-kraft-100 p-6 text-center relative z-10 overflow-hidden">
                  <div className="absolute -top-8 -left-8 text-[120px] opacity-10">🏆</div>
                  <div className="relative z-10">
                    <div className={cn(
                      'inline-block mb-3 px-5 py-2 rounded-full text-xl font-handwriting text-shadow-hand',
                      store.correctCount >= 3
                        ? 'bg-gradient-to-r from-retro-yellow to-warm-300 text-wood-700 border-4 border-warm-500 shadow-vintage'
                        : 'bg-kraft-200 text-kraft-600 border-4 border-kraft-400'
                    )}>
                      {store.correctCount === 5 ? '满分童年学神！' :
                        store.correctCount >= 3 ? '恭喜通关！' : '再接再厉～'}
                    </div>

                    <h2 className="font-handwriting text-6xl text-wood-700 mb-2">
                      {store.correctCount}<span className="text-3xl text-kraft-500">/{store.currentQuestions.length}</span>
                    </h2>
                    <p className="font-handwriting text-wood-600 mb-5">答对了 {store.correctCount} 道童年题</p>

                    {/* 盖章效果 */}
                    <div className="flex justify-center gap-6 mb-5">
                      {[1, 2, 3, 4, 5].map(n => (
                        <div key={n} className="flex flex-col items-center">
                          <div className={cn(
                            'w-12 h-12 rounded-full flex items-center justify-center border-2',
                            n <= store.correctCount
                              ? 'bg-rust-500 border-rust-700 text-warm-50 animate-stamp'
                              : 'bg-kraft-200 border-kraft-400 text-kraft-500'
                          )} style={{ animationDelay: `${n * 0.1}s` }}>
                            {n <= store.correctCount ? <CheckCircle size={24} /> : <XCircle size={24} />}
                          </div>
                          <span className="mt-1 text-xs font-handwriting text-kraft-500">第{n}题</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5">
                      {store.correctCount >= 3 && !store.reward && (
                        <button
                          onClick={() => setShowLottery(true)}
                          className="btn-retro-success btn-retro-block !py-3 text-lg"
                        >
                          <Gift size={20} /> 抽奖赢优惠券
                        </button>
                      )}
                      {store.reward && (
                        <div className="p-4 rounded-xl bg-mint-200 border-4 border-mint-400 text-wood-700">
                          <p className="text-sm font-handwriting mb-1">🎁 已获得奖励</p>
                          <p className="font-handwriting text-xl font-bold">{store.reward.name}</p>
                        </div>
                      )}
                      <button
                        onClick={() => { store.resetQuiz(); handleStart(); }}
                        className="btn-retro btn-retro-block !py-3 text-lg"
                        disabled={!store.canPlayToday()}
                      >
                        <RotateCcw size={18} /> 再来一局（剩{store.dailyChances}次）
                      </button>
                      <button
                        onClick={() => { store.resetQuiz(); navigate('/'); }}
                        className="btn-retro btn-retro-block !py-2.5 !bg-kraft-100 text-wood-600 border-kraft-400"
                      >
                        返回杂货铺
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 抽奖弹窗 */}
      {showLottery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm card-kraft !p-6 text-center">
            <div className="relative z-10">
              <h3 className="font-handwriting text-2xl text-wood-700 mb-1 flex items-center justify-center gap-2">
                <Gift size={22} /> 童年大抽奖
              </h3>
              <p className="text-xs text-kraft-500 mb-5">凭实力抽中的奖励～</p>

              <div className={cn(
                'mx-auto w-44 h-44 rounded-full flex items-center justify-center relative',
                'bg-gradient-to-br from-rust-400 via-rust-500 to-rust-600 border-8 border-wood-600 shadow-2xl',
                lotteryAnim && 'animate-bounce-soft'
              )}>
                <div className="w-36 h-36 rounded-full bg-warm-50 flex flex-col items-center justify-center border-4 border-warm-300">
                  {lotteryAnim ? (
                    <div className="text-5xl animate-spin" style={{ animationDuration: '0.3s' }}>🎁</div>
                  ) : (
                    <>
                      <div className="text-4xl mb-1">🎉</div>
                      <p className="font-handwriting text-sm text-wood-700">点击下方按钮</p>
                      <p className="font-handwriting text-sm text-wood-700">开启奖励</p>
                    </>
                  )}
                </div>

                {/* 装饰点 */}
                {['🍬', '⭐', '🎈', '🎁', '🧸', '💫', '🍫', '🏮'].map((e, i) => (
                  <span
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      top: `${50 + 48 * Math.cos((i / 8) * Math.PI * 2)}%`,
                      left: `${50 + 48 * Math.sin((i / 8) * Math.PI * 2)}%`,
                      transform: 'translate(-50%,-50%)',
                    }}
                  >{e}</span>
                ))}
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={handleDraw}
                  disabled={lotteryAnim}
                  className="btn-retro-primary btn-retro-block !py-3 text-lg"
                >
                  <Sparkles size={20} /> 立即开奖
                </button>
                <button
                  onClick={() => setShowLottery(false)}
                  disabled={lotteryAnim}
                  className="btn-retro btn-retro-block !py-2.5 !bg-kraft-100 text-wood-600 border-kraft-400"
                >
                  稍后再抽
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RankList() {
  return (
    <div className="px-4 pt-4 space-y-3">
      <div className="card-kraft">
        <div className="relative z-10">
          <h3 className="font-handwriting text-xl text-wood-700 flex items-center gap-1.5 mb-4">
            <Award size={20} /> 每周·童年学神榜
          </h3>

          {/* 前三名 */}
          <div className="flex items-end justify-center gap-3 mb-6">
            {/* 第二名 */}
            <div className="flex-1 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-kraft-200 border-4 border-kraft-400 flex items-center justify-center text-3xl mb-1">
                {rankingList[1].avatar}
              </div>
              <div className="text-2xl mb-1">🥈</div>
              <p className="font-handwriting text-wood-700 text-sm truncate">{rankingList[1].nickname}</p>
              <p className="text-xs text-kraft-500">{rankingList[1].city}</p>
              <div className="mt-1.5 py-2 rounded-t-lg bg-gradient-to-b from-kraft-300 to-kraft-400 text-warm-50 font-handwriting">
                {rankingList[1].score}分
              </div>
            </div>
            {/* 第一名 */}
            <div className="flex-1 text-center -mt-6">
              <div className="relative w-20 h-20 mx-auto mb-1">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-4xl animate-bounce-soft">👑</div>
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-retro-yellow to-warm-400 border-4 border-warm-600 flex items-center justify-center text-4xl shadow-vintage">
                  {rankingList[0].avatar}
                </div>
              </div>
              <p className="font-handwriting text-wood-700 font-bold truncate">{rankingList[0].nickname}</p>
              <p className="text-xs text-kraft-500">{rankingList[0].city}</p>
              <p className="text-xs font-handwriting text-rust-500 mt-0.5">{rankingList[0].title}</p>
              <div className="mt-1.5 py-3 rounded-t-lg bg-gradient-to-b from-rust-400 to-rust-600 text-warm-50 font-handwriting text-lg shadow-vintage">
                {rankingList[0].score}分
              </div>
            </div>
            {/* 第三名 */}
            <div className="flex-1 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-retro-pink/50 border-4 border-retro-pink flex items-center justify-center text-3xl mb-1">
                {rankingList[2].avatar}
              </div>
              <div className="text-2xl mb-1">🥉</div>
              <p className="font-handwriting text-wood-700 text-sm truncate">{rankingList[2].nickname}</p>
              <p className="text-xs text-kraft-500">{rankingList[2].city}</p>
              <div className="mt-1.5 py-1.5 rounded-t-lg bg-gradient-to-b from-retro-pink/70 to-retro-pink text-warm-50 font-handwriting">
                {rankingList[2].score}分
              </div>
            </div>
          </div>

          {/* 4-10名 */}
          <div className="space-y-2">
            {rankingList.slice(3).map((r) => (
              <div
                key={r.rank}
                className="flex items-center gap-3 p-3 rounded-xl bg-warm-50 border-2 border-kraft-200"
              >
                <span className="w-7 h-7 rounded-full bg-kraft-200 border-2 border-kraft-400 font-handwriting flex items-center justify-center text-wood-700">
                  {r.rank}
                </span>
                <span className="text-2xl">{r.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-handwriting text-wood-700 text-sm truncate">{r.nickname}</p>
                  <p className="text-[10px] text-kraft-500">{r.city} · {r.title}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-warm-200 border border-wood-400">
                  <span className="text-xs font-handwriting text-wood-700">{r.score}</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
