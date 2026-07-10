<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import StarField from './components/StarField.vue'
import { useI18n, tLabel as tagLabel, t } from './i18n'

const { locale, toggleLocale } = useI18n()

/* ===== Tag Cloud Data ===== */
interface TagItem {
  label: string
  en?: string
  highlight?: boolean
  rx?: number; ry?: number; rot?: number; mt?: number
  fs?: number; pv?: number; ph?: number
}

const allTags: TagItem[] = [
  { label: 'FPS', highlight: true },
  { label: 'Galgame', highlight: true },
  { label: '洛氏恐怖', en: 'Lovecraftian Horror', highlight: true },
  { label: 'AIGC', highlight: true },
  { label: 'Vibe Coding', highlight: true },
  { label: 'STG', highlight: true },
  { label: 'OC', highlight: true },
  { label: 'Web 开发', en: 'Web Dev' }, { label: 'JAVA' }, { label: 'C++' }, { label: 'C#' },
  { label: 'Rust' }, { label: 'Lua' }, { label: 'SQLite' }, { label: 'Node.js' },
  { label: 'Python' }, { label: 'TypeScript' }, { label: 'HTML / CSS' },
  { label: 'Prompt Engineering' }, { label: 'Agent' }, { label: 'Context Engineering' },
  { label: 'Harness Engineering' }, { label: 'Loop Engineering' }, { label: 'MCP' },
  { label: '世界观构筑', en: 'Worldbuilding', highlight: true },
  { label: '神秘学', en: 'Occultism' }, { label: '神学', en: 'Theology' }, { label: '宗教学', en: 'Religious Studies' },
  { label: '东方Project', en: 'Touhou Project', highlight: true }, { label: '网文', en: 'Web Novels' }, { label: '传统文化', en: 'Traditional Culture' },
  { label: '魂系', en: 'Souls-like' }, { label: '守望先锋', en: 'Overwatch' }, { label: 'Steam' }, { label: '外设痴', en: 'Peripheral Maniac' },
  { label: '克苏鲁神话', en: 'Cthulhu Mythos' }, { label: '蔚蓝档案', en: 'Blue Archive' }, { label: '公主连结', en: 'Princess Connect' }, { label: '刃牙', en: 'Baki' },
  { label: '论战', en: 'Power Scaling' }, { label: '电波系', en: 'Denpa-kei' }, { label: '黑深残', en: 'Dark & Edgy' },
  { label: 'BLACKSOULS' }, { label: '雌小鬼', en: 'Bratty Girl' }, { label: '笨蛋', en: 'Baka' },
  { label: '金发', en: 'Blonde' }, { label: '贫乳', en: 'Flat Chest' }, { label: '泣系', en: 'Nakige' }, { label: '重力', en: 'Heavy' },
  { label: '叙事诡计', en: 'Narrative Trick' }, { label: '神魔器', en: 'Denpa Gear' }, { label: '妹控', en: 'Siscon' },
  { label: '超时空辉夜姬！', en: 'Space-Time Kaguya-hime!' }, { label: '海虎', en: 'Sea Tiger' },
  { label: 'Neural-Memory' }, { label: 'CodeWhale' },
  { label: '术力口', en: 'Vocaloid-ish' }, { label: '猫娘', en: 'Catgirl' }, { label: '考据狂', en: 'Lore Junkie' }, { label: '中二病', en: 'Chuunibyou' },
  { label: '萝莉控', en: 'Lolicon', highlight: true },
]

const shuffledTags = ref<TagItem[]>([])

const displayTags = computed(() =>
  shuffledTags.value.map(t => ({
    ...t,
    label: tagLabel(t),
  }))
)

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

  <!-- Language Toggle -->
  <button class="lang-toggle" @click="toggleLocale" :title="locale === 'en' ? '切换到中文' : 'Switch to English'">
    {{ locale === 'en' ? '中' : 'EN' }}
  </button>

  <section class="hero-section section">
    <div class="hero-inner">
      <div class="hero-avatar-ring">
        <div class="hero-avatar">
          <img src="/avata.png" alt="Spike" class="hero-avatar-img" />
        </div>
      </div>
      <div class="hero-title-wrap">
        <span class="hero-greeting">{{ t('hero.greeting') }}</span>
        <h1 class="hero-name">
          <span class="hero-name-line">{{ t('hero.nameLine') }}</span>
          <span class="hero-name-highlight">{{ t('hero.nameHighlight') }}</span>
        </h1>
        <p class="hero-sub">{{ t('hero.sub') }}</p>
       </div>
      <div class="hero-tags">
        <span class="hero-tag">{{ t('hero.tag1') }}</span>
        <span class="hero-tag">{{ t('hero.tag2') }}</span>
        <span class="hero-tag">{{ t('hero.tag3') }}</span>
        <span class="hero-tag">{{ t('hero.tag4') }}</span>
        <span class="hero-tag">{{ t('hero.tag5') }}</span>
        <span class="hero-tag">{{ t('hero.tag6') }}</span>
        <span class="hero-tag">{{ t('hero.tag7') }}</span>
      </div>
      <div class="scroll-indicator">
        <span class="scroll-text">{{ t('scroll.text') }}</span>
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
      <div class="section-label">{{ t('about.label') }}</div>
      <h2 class="section-title">Who <span class="gradient-text">Am I</span></h2>
      <div class="about-grid">
        <div class="about-text glass-card">
          <p v-html="t('about.p1')"></p>
          <p>{{ t('about.p2') }}</p>
          <p>{{ t('about.p3') }}</p>
          <p>{{ t('about.p4') }}</p>
          <p>{{ t('about.p5') }}</p>
          <p>{{ t('about.p6') }}</p>
          <p>{{ t('about.p7') }}</p>
          <p style="color:var(--text-muted); font-size: 13px; font-style: italic; margin-top: 16px;">{{ t('about.p8') }}</p>
        </div>
        <div class="about-skills glass-card">
          <div class="skills-cloud">
            <span v-for="tag in displayTags" :key="tag.label"
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
      <div class="section-label">{{ t('social.label') }}</div>
      <h2 class="section-title">Find <span class="gradient-text">Me</span></h2>
      <div class="social-grid">
        <a class="social-btn glass-card" href="https://github.com/SparkofSpike" target="_blank" rel="noopener">
          <el-icon size="20"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.393.1 2.646.64.698 1.028 1.591 1.028 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg></el-icon>
          GitHub
        </a>
        <a class="social-btn glass-card" href="https://space.bilibili.com/442717506" target="_blank" rel="noopener">
          <el-icon size="20"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 3L10 5.5h4L16.5 3l1.5 1.5-2.5 2.5h-7L6 4.5 7.5 3zM5 7.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z"/><circle cx="8" cy="11.5" r="1.2"/><circle cx="16" cy="11.5" r="1.2"/><path d="M9 14.5c1 1.5 2.5 2.5 4.5 2.5s3.5-1 4.5-2.5"/></svg></el-icon>
          Bilibili
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
        <span class="footer-text">{{ t('footer.year') }}</span>
        <span class="footer-sep">/</span>
        <span class="footer-text">{{ t('footer.built') }}</span>
        <span class="footer-sep">/</span>
        <span class="footer-text">{{ t('footer.note') }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.lang-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(201, 168, 76, 0.15);
  background: rgba(10, 0, 18, 0.6);
  backdrop-filter: blur(10px);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
}
.lang-toggle:hover {
  border-color: rgba(201, 168, 76, 0.4);
  color: var(--accent-primary);
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.1);
  transform: scale(1.05);
}

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
.hero-avatar-img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
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
  .hero-avatar-img { width: 100%; height: 100%; }
  .about-text, .about-skills { padding: 24px; }
}
</style>
