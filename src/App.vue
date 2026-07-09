<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StarField from './components/StarField.vue'

/* ===== Tag Cloud Data ===== */
interface TagItem {
  label: string
  highlight?: boolean
  rx?: number; ry?: number; rot?: number; mt?: number
  fs?: number; pv?: number; ph?: number
}

const allTags: TagItem[] = [
  { label: 'FPS', highlight: true },
  { label: 'Galgame', highlight: true },
  { label: '洛氏恐怖', highlight: true },
  { label: 'AIGC', highlight: true },
  { label: 'Vibe Coding', highlight: true },
  { label: 'STG', highlight: true },
  { label: 'OC', highlight: true },
  { label: 'Web 开发' }, { label: 'JAVA' }, { label: 'C++' }, { label: 'C#' },
  { label: 'Rust' }, { label: 'Lua' }, { label: 'SQLite' }, { label: 'Node.js' },
  { label: 'Python' }, { label: 'TypeScript' }, { label: 'HTML / CSS' },
  { label: 'Prompt Engineering' }, { label: 'Agent' }, { label: 'Context Engineering' },
  { label: 'Harness Engineering' }, { label: 'Loop Engineering' }, { label: 'MCP' },
  { label: '世界观构筑', highlight: true },
  { label: '神秘学' }, { label: '神学' }, { label: '宗教学' },
  { label: '东方Project', highlight: true }, { label: '网文' }, { label: '传统文化' },
  { label: '魂系' }, { label: '守望先锋' }, { label: 'Steam' }, { label: '外设痴' },
  { label: '克苏鲁神话' }, { label: '蔚蓝档案' }, { label: '公主连结' }, { label: '刃牙' },
  { label: '论战' }, { label: '电波系' }, { label: '黑深残' },
  { label: 'BLACKSOULS' }, { label: '雌小鬼' }, { label: '笨蛋' },
  { label: '金发' }, { label: '贫乳' }, { label: '泣系' }, { label: '重力' },
  { label: '叙事诡计' }, { label: '神魔器' }, { label: '妹控' },
  { label: '超时空辉夜姬！' }, { label: '海虎' },
  { label: 'Neural-Memory' }, { label: 'CodeWhale' },
  { label: '术力口' }, { label: '猫娘' }, { label: '考据狂' }, { label: '中二病' },
  { label: '萝莉控', highlight: true },
]

const shuffledTags = ref<TagItem[]>([])

function shuffle(arr: TagItem[]): TagItem[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.map(t => {
    const fs = 10 + Math.random() * 7
    return {
      ...t,
      rx: (Math.random() - 0.5) * 20,
      ry: (Math.random() - 0.5) * 30,
      rot: (Math.random() - 0.5) * 6,
      mt: Math.random() * 32,
      fs: Math.round(fs),
      pv: Math.round(fs * 0.45 + 1),
      ph: Math.round(fs * 1.1 + 4),
    }
  })
}

function syncRightHeight() {
  const left = document.querySelector<HTMLElement>('.about-text')
  const right = document.querySelector<HTMLElement>('.about-skills')
  const cloud = document.querySelector<HTMLElement>('.skills-cloud')
  if (!left || !right || !cloud) return
  const targetH = left.offsetHeight
  right.style.maxHeight = `${targetH}px`
  const pad = 64
  const contentH = cloud.scrollHeight
  if (contentH > targetH - pad) {
    const factor = (targetH - pad) / contentH
    cloud.style.transform = `scale(${factor})`
    cloud.style.transformOrigin = 'top center'
  } else {
    cloud.style.transform = 'none'
  }
}

onMounted(() => {
  shuffledTags.value = shuffle(allTags)
  syncRightHeight()
  window.addEventListener('resize', syncRightHeight)
})
</script>

<template>
  <StarField />

  <div class="nebula-glow nebula-glow-1"></div>
  <div class="nebula-glow nebula-glow-2"></div>
  <div class="nebula-glow nebula-glow-3"></div>

  <section class="hero-section section">
    <div class="hero-inner">
      <div class="hero-avatar-ring">
        <div class="hero-avatar">
          <span class="hero-avatar-icon">S</span>
        </div>
      </div>
      <div class="hero-title-wrap">
        <span class="hero-greeting">欢迎，敢于凝视深渊者</span>
        <h1 class="hero-name">
          <span class="hero-name-line">Hi, I'm</span>
          <span class="hero-name-highlight">Spike</span>
        </h1>
        <p class="hero-sub">A truly unruly freewheeling creature</p>
       </div>
      <div class="hero-tags">
        <span class="hero-tag">FPS 魔怔闭麦单排人</span>
        <span class="hero-tag">Galgame 绝症级别玩家</span>
        <span class="hero-tag">洛氏恐怖重度爱好者</span>
        <span class="hero-tag">神秘学、神学与宗教学的囚徒</span>
        <span class="hero-tag">野班子程序员兼大炼金术师</span>
        <span class="hero-tag">杂到来者不拒的恐怖暴食者</span>
        <span class="hero-tag">无可救药的萝莉控</span>
      </div>
      <div class="scroll-indicator">
        <span class="scroll-text">向下探索</span>
        <span class="scroll-arrow">v</span>
      </div>
    </div>
  </section>

  <div class="section-divider">
    <span class="divider-dot">.</span>
    <span class="divider-dot">.</span>
    <span class="divider-dot">.</span>
  </div>

  <section class="section" id="about">
    <div class="container">
      <div class="section-label">/ about</div>
      <h2 class="section-title">Who <span class="gradient-text">Am I</span></h2>
      <div class="about-grid">
        <div class="about-text glass-card">
          <p>我是 <strong style="color:var(--text-primary);">Sp1ke / SparkofSpike / Sh1Zuku / Tentak0 / ZAKOTAKO / EVILEVILNEKO ……</strong> 好吧，别的我自己也记不得了。等等，我自己都不知道自己是谁，我该怎么自我介绍？嗯，这是个很严肃的问题……</p>
          <p>如果你在打 FPS 的时候遇到我，我大概是那个令你印象深刻的单排闭麦枪男——不交流，不配合。不鼓励，只压力。输了全是你的锅，赢了全是我的好。别骂了，骂我也不会反思的，我只会觉得自己枪软，然后 AimLab 加练五小时。没错，我 CS2 S 而不会道具，无畏契约神话还不会育苗，守望先锋宗师意识还不如白金。如果匹配到我，那只能祈祷好运了，祈祷我今天的状态还不错，能把对面的脑袋全部打开花。</p>
          <p>在 Galgame 的世界里，我是个绝症级别的患者。从全年龄到 R18，从萌系到郁系，从王道到电波，没有我不吃的类型。硬盘里的库存够玩到下个世纪，而 Steam 愿望单还在不停膨胀。我已经对现实的异性没兴趣了。我大抵是病了，而我不打算治。</p>
          <p>当然，你还能在那些神学和宗教学的评论区底下偶尔遇到我。要问我了解什么？嗯，三言两语说不清……简而言之，就是什么都不懂，这下看懂了吧？是了。因为大师总抱有学徒之心。</p>
          <p>除此之外，作为野班子程序员兼大炼金术师——你可能最多以此身份见到我。没系统学过 CS，甚至连大学都没上过，全靠实战和搜索引擎活着。信奉"能跑就别动，能抄就别写"的代码哲学，数据结构设计一大糊涂。什么都能写一点，什么都不精。自从 AI 出来之后，反倒变成一体机的代表了。Anthropic的恩情还不完啊……</p>
          <p>在文字的世界里，我是个杂食到什么都能吃的读文者。轻小说、网文、经典文学、哲学、宗教典籍、科普、散文、诗歌……从严肃到娱乐，从古典到流行，从中国到外国，来者不拒，多多益善。读得杂，想得也多。偶尔写点东西。当然，你们是看不到我的作品的。目前正在和我的亲友 薄暮 一起创作起源世界观。</p>
          <p>有人说我是无可救药的萝莉控。针对这点，我在此严正声明：没什么可狡辩的，我就是。</p>
          <p style="color:var(--text-muted); font-size: 13px; font-style: italic; margin-top: 16px;">萝莉妈妈什么的早就过时了……萝莉 BBA 才是最棒的……年上萝莉……</p>
        </div>
        <div class="about-skills glass-card">
          <div class="skills-cloud">
            <span v-for="tag in shuffledTags" :key="tag.label"
              :class="['skill-tag', { highlight: tag.highlight }]"
              :style="tag.rx !== undefined ? {
                transform: `translate(${tag.rx}px, ${tag.ry}px) rotate(${tag.rot}deg)`,
                marginTop: `${tag.mt}px`,
                fontSize: `${tag.fs}px`,
                padding: `${tag.pv}px ${tag.ph}px`
              } : {}">{{ tag.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="section-divider">
    <span class="divider-dot">.</span>
    <span class="divider-dot">.</span>
    <span class="divider-dot">.</span>
  </div>

  <section class="section" id="social">
    <div class="container" style="text-align: center;">
      <div class="section-label">/ connect</div>
      <h2 class="section-title">Find <span class="gradient-text">Me</span></h2>
      <div class="social-grid">
        <a class="social-btn glass-card" href="https://github.com/SparkofSpike" target="_blank" rel="noopener">
          <el-icon size="20"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></el-icon>
          GitHub
        </a>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <div class="container">
      <div class="section-divider" style="margin-bottom: 32px;">
        <span class="divider-dot">.</span>
        <span class="divider-dot">.</span>
        <span class="divider-dot">.</span>
      </div>
      <div class="footer-inner">
        <span class="footer-text">2024 - 2026 Spike</span>
        <span class="footer-sep">/</span>
        <span class="footer-text">built in the void</span>
        <span class="footer-sep">/</span>
        <span class="footer-text">no more</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 24px 80px;
  position: relative;
  z-index: 1;
}
.hero-inner { max-width: 640px; display: flex; flex-direction: column; align-items: center; gap: 24px; }
.hero-avatar-ring {
  width: 130px; height: 130px; border-radius: 50%; padding: 3px;
  background: conic-gradient(from 0deg, rgba(201,168,76,0.4), rgba(107,47,160,0.4), rgba(0,188,212,0.4), rgba(201,168,76,0.4));
  animation: ring-spin 8s linear infinite; margin-bottom: 8px;
}
@keyframes ring-spin { to { transform: rotate(360deg); } }
.hero-avatar {
  width: 100%; height: 100%; border-radius: 50%;
  background: linear-gradient(135deg, #0d0015 0%, #1a0033 100%);
  display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid #000;
}
.hero-avatar-icon { font-size: 44px; font-weight: 700; color: var(--accent-primary); opacity: 0.8; filter: drop-shadow(0 0 10px rgba(201,168,76,0.3)); line-height: 1; }
.hero-greeting { font-size: 12px; letter-spacing: 4px; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 8px; }
.hero-title-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.hero-name { font-size: 64px; font-weight: 800; color: var(--text-primary); letter-spacing: -2px; line-height: 1.1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.hero-name-line { font-size: 20px; font-weight: 400; color: var(--text-muted); letter-spacing: 4px; }
.hero-name-highlight {
  background: linear-gradient(135deg, #c9a84c, #e8d48b, #c9a84c);
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(201,168,76,0.2)); font-size: 72px;
}
.hero-sub { font-size: 15px; color: var(--text-secondary); max-width: 520px; line-height: 1.7; letter-spacing: 0.3px; }
.hero-tags { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
.hero-tag {
  display: inline-block; padding: 5px 14px; border-radius: 999px; font-size: 12px;
  border: 1px solid rgba(201,168,76,0.12); color: var(--text-muted); transition: all 0.4s; cursor: default;
}
.hero-tag:hover { border-color: rgba(201,168,76,0.3); color: var(--accent-primary); box-shadow: 0 0 15px rgba(201,168,76,0.06); }
.scroll-indicator { display: flex; flex-direction: column; align-items: center; gap: 4px; margin-top: 32px; animation: float 3s ease-in-out infinite; cursor: default; }
.scroll-text { font-size: 11px; letter-spacing: 4px; color: var(--text-muted); text-transform: uppercase; }
.scroll-arrow { font-size: 16px; color: var(--accent-primary); opacity: 0.4; font-family: var(--font-mono); }

.section-divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 0 auto; opacity: 0.25; user-select: none; }
.divider-dot { color: var(--accent-primary); font-size: 14px; font-family: var(--font-mono); }
.section-divider::before, .section-divider::after {
  content: ''; flex: 1; max-width: 60px; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent);
}

.about-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; align-items: start; }
@media (max-width: 720px) { .about-grid { grid-template-columns: 1fr; } }
.about-text { padding: 32px; display: flex; flex-direction: column; justify-content: center; }
.about-text p { color: var(--text-secondary); margin-bottom: 12px; font-size: 15px; line-height: 1.8; }
.about-text p:last-child { margin-bottom: 0; }
.about-skills { padding: 32px; display: flex; align-items: flex-start; overflow: hidden; }

.skills-cloud { display: flex; flex-wrap: wrap; column-gap: 8px; row-gap: 24px; align-content: flex-start; padding: 24px 12px; }
.skill-tag { display: inline-flex; align-items: center; border-radius: 999px; background: rgba(10,0,18,0.6); border: 1px solid rgba(201,168,76,0.08); color: var(--text-secondary); transition: all 0.3s; cursor: default; white-space: nowrap; }
.skill-tag:hover { background: rgba(201,168,76,0.06); border-color: rgba(201,168,76,0.2); color: var(--text-primary); }
.skill-tag.highlight { border-color: rgba(201,168,76,0.2); color: var(--text-accent); background: rgba(201,168,76,0.04); }

.social-grid { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
.social-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; border-radius: var(--radius-md); color: var(--text-secondary); font-size: 14px; cursor: pointer; transition: all 0.4s; }
.social-btn:hover { color: var(--accent-primary); transform: translateY(-3px); }

.site-footer { position: relative; z-index: 1; padding: 40px 0 60px; text-align: center; }
.footer-inner { display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap; }
.footer-text { color: var(--text-muted); font-size: 12px; letter-spacing: 0.5px; }
.footer-sep { color: #2a2830; font-size: 12px; }

@media (max-width: 480px) {
  .hero-name { font-size: 44px; }
  .hero-name-highlight { font-size: 52px; }
  .hero-name-line { font-size: 16px; }
  .hero-sub { font-size: 14px; }
  .hero-avatar-ring { width: 100px; height: 100px; }
  .hero-avatar-icon { font-size: 32px; }
  .about-text, .about-skills { padding: 24px; }
}
</style>
