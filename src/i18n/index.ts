import { ref, watch } from 'vue'

type Locale = 'zh-CN' | 'en'

const locale = ref<Locale>((localStorage.getItem('spike-locale') as Locale) || 'en')

watch(locale, (v) => localStorage.setItem('spike-locale', v))

/* ===== Messages ===== */
const messages: Record<Locale, Record<string, string>> = {
  'zh-CN': {
    'hero.greeting': '欢迎，敢于凝视深渊者',
    'hero.nameLine': "Hi, I'm",
    'hero.nameHighlight': 'Spike',
    'hero.sub': 'A truly unruly freewheeling creature',

    'hero.tag1': 'FPS 魔怔闭麦单排人',
    'hero.tag2': 'Galgame 绝症级别玩家',
    'hero.tag3': '洛氏恐怖重度爱好者',
    'hero.tag4': '神秘学、神学与宗教学的囚徒',
    'hero.tag5': '野班子程序员兼大炼金术师',
    'hero.tag6': '杂到来者不拒的恐怖暴食者',
    'hero.tag7': '无可救药的萝莉控',

    'scroll.text': '向下探索',

    'about.label': '/ about',
    'about.title': 'Who Am I',

    'about.p1': '我是 <strong style="color:var(--text-primary);">Sp1ke / SparkofSpike / Sh1Zuku / Tentak0 / ZAKOTAKO / EVILEVILNEKO ……</strong> 好吧，别的我自己也记不得了。等等，我自己都不知道自己是谁，我该怎么自我介绍？嗯，这是个很严肃的问题……',
    'about.p2': '如果你在打 FPS 的时候遇到我，我大概是那个令你印象深刻的单排闭麦枪男——不交流，不配合。不鼓励，只压力。输了全是你的锅，赢了全是我的好。别骂了，骂我也不会反思的，我只会觉得自己枪软，然后 AimLab 加练五小时。没错，我 CS2 S 而不会道具，无畏契约神话还不会育苗，守望先锋宗师意识还不如白金。如果匹配到我，那只能祈祷好运了，祈祷我今天的状态还不错，能把对面的脑袋全部打开花。',
    'about.p3': '在 Galgame 的世界里，我是个绝症级别的患者。从全年龄到 R18，从萌系到郁系，从王道到电波，没有我不吃的类型。硬盘里的库存够玩到下个世纪，而 Steam 愿望单还在不停膨胀。我已经对现实的异性没兴趣了。我大抵是病了，而我不打算治。',
    'about.p4': '当然，你还能在那些神学和宗教学的评论区底下偶尔遇到我。要问我了解什么？嗯，三言两语说不清……简而言之，就是什么都不懂，这下看懂了吧？是了。因为大师总抱有学徒之心。',
    'about.p5': '除此之外，作为野班子程序员兼大炼金术师——你可能最多以此身份见到我。没系统学过 CS，甚至连大学都没上过，全靠实战和搜索引擎活着。信奉"能跑就别动，能抄就别写"的代码哲学，数据结构设计一塌糊涂。什么都能写一点，什么都不精。自从 AI 出来之后，反倒变成一体机的代表了。Anthropic 的恩情还不完啊……',
    'about.p6': '在文字的世界里，我是个杂食到什么都能吃的读文者。轻小说、网文、经典文学、哲学、宗教典籍、科普、散文、诗歌……从严肃到娱乐，从古典到流行，从中国到外国，来者不拒，多多益善。读得杂，想得也多。偶尔写点东西。当然，你们是看不到我的作品的。目前正在和我的亲友 薄暮 一起创作起源世界观。',
    'about.p7': '有人说我是无可救药的萝莉控。针对这点，我在此严正声明：没什么可狡辩的，我就是。',
    'about.p8': '萝莉妈妈什么的早就过时了……萝莉 BBA 才是最棒的……年上萝莉……',

    'social.label': '/ connect',
    'social.title': 'Find Me',

    'footer.year': '2024 - 2026 Spike',
    'footer.built': 'built in the void',
    'footer.note': 'no more',
  },
  en: {
    'hero.greeting': 'Welcome, one who dares to gaze into the abyss',
    'hero.nameLine': "Hi, I'm",
    'hero.nameHighlight': 'Spike',
    'hero.sub': 'A truly unruly freewheeling creature',

    'hero.tag1': 'FPS Solo-Q Fiend',
    'hero.tag2': 'Terminal Galgame Patient',
    'hero.tag3': 'Lovecraftian Horror Devotee',
    'hero.tag4': 'Prisoner of Occult, Theology & Religion',
    'hero.tag5': 'Unschooled Coder & Grand Alchemist',
    'hero.tag6': 'Omnivorous Horror Glutton',
    'hero.tag7': 'Hopeless Lolicon',

    'scroll.text': 'Explore Below',

    'about.label': '/ about',
    'about.title': 'Who Am I',

    'about.p1': "I'm <strong style=\"color:var(--text-primary);\">Sp1ke / SparkofSpike / Sh1Zuku / Tentak0 / ZAKOTAKO / EVILEVILNEKO ……</strong> Okay, I can't even remember the rest myself. Wait — I don't even know who I am, so how am I supposed to introduce myself? Yeah, that's a pretty serious question……",
    'about.p2': "If you run into me while playing FPS, I'm probably that unforgettable solo-queue, mic-off aim demon — no comms, no teamwork. No encouragement, only pressure. Losses are your fault, wins are all me. Don't bother flaming me, I won't self-reflect; I'll just think my aim was off and grind AimLab for five more hours. That's right — I'm CS2 S-rank without knowing any utility, Valorant Immortal without crosshair placement, OW GM with a Platinum game sense. If you get matched with me, just pray I'm having a good day and popping heads.",
    'about.p3': "In the world of Galgame, I'm a terminal patient. All-ages to R18, moege to utsuge, kingame to denpa — there's no type I don't consume. My drive has enough stock to last the next century, while my Steam wishlist keeps inflating. I've lost all interest in real-life romance. I'm probably sick, and I don't plan on recovering.",
    'about.p4': "You might also run into me in the comments sections of theology and religious studies. Asking what I know? Well, it's hard to put in a few words… In short: I know nothing. Got it now? Exactly. Because the master always holds the heart of an apprentice.",
    'about.p5': 'Other than that, as an unschooled coder and grand alchemist — you\'ve probably encountered me in this capacity the most. Never formally studied CS, never even attended college, living purely on hands-on experience and search engines. My coding philosophy: "If it runs, don\'t touch it; if you can copy it, don\'t write it." Data structure design is a mess. I can write a bit of everything, master of none. Since AI came out, I\'ve somehow become the poster boy for the "full-stack one-man army." I owe Anthropic an unpayable debt……',
    'about.p6': "In the world of words, I'm an omnivorous reader who devours everything. Light novels, web novels, literary classics, philosophy, religious texts, popular science, essays, poetry… from serious to entertaining, classical to contemporary, Chinese to foreign — I welcome it all, the more the better. I read widely and think even more. Occasionally I write. Of course, you'll never see my work. I'm currently co-creating the Origin world with my dear friend Bomu.",
    'about.p7': 'Some say I\'m a hopeless lolicon. To that, I solemnly declare: there\'s nothing to defend — I am.',
    'about.p8': "Loli-mom type is so last season… Loli BBA is where it's at… older lolis……",

    'social.label': '/ connect',
    'social.title': 'Find Me',

    'footer.year': '2024 - 2026 Spike',
    'footer.built': 'built in the void',
    'footer.note': 'no more',
  },
}

/* ===== Tag translations ===== */
export interface TagDef {
  label: string
  en?: string
  highlight?: boolean
}

export const tagTranslations: Record<string, { zh: string; en: string }> = {
  '洛氏恐怖': { zh: '洛氏恐怖', en: 'Lovecraftian Horror' },
  'Web 开发': { zh: 'Web 开发', en: 'Web Dev' },
  '世界观构筑': { zh: '世界观构筑', en: 'Worldbuilding' },
  '神秘学': { zh: '神秘学', en: 'Occultism' },
  '神学': { zh: '神学', en: 'Theology' },
  '宗教学': { zh: '宗教学', en: 'Religious Studies' },
  '东方Project': { zh: '东方Project', en: 'Touhou Project' },
  '网文': { zh: '网文', en: 'Web Novels' },
  '传统文化': { zh: '传统文化', en: 'Traditional Culture' },
  '魂系': { zh: '魂系', en: 'Souls-like' },
  '守望先锋': { zh: '守望先锋', en: 'Overwatch' },
  '外设痴': { zh: '外设痴', en: 'Peripheral Maniac' },
  '克苏鲁神话': { zh: '克苏鲁神话', en: 'Cthulhu Mythos' },
  '蔚蓝档案': { zh: '蔚蓝档案', en: 'Blue Archive' },
  '公主连结': { zh: '公主连结', en: 'Princess Connect' },
  '刃牙': { zh: '刃牙', en: 'Baki' },
  '论战': { zh: '论战', en: 'Power Scaling' },
  '电波系': { zh: '电波系', en: 'Denpa-kei' },
  '黑深残': { zh: '黑深残', en: 'Dark & Edgy' },
  '雌小鬼': { zh: '雌小鬼', en: 'Bratty Girl' },
  '笨蛋': { zh: '笨蛋', en: 'Baka' },
  '金发': { zh: '金发', en: 'Blonde' },
  '贫乳': { zh: '贫乳', en: 'Flat Chest' },
  '泣系': { zh: '泣系', en: 'Nakige' },
  '重力': { zh: '重力', en: 'Heavy' },
  '叙事诡计': { zh: '叙事诡计', en: 'Narrative Trick' },
  '神魔器': { zh: '神魔器', en: 'Denpa Gear' },
  '妹控': { zh: '妹控', en: 'Siscon' },
  '超时空辉夜姬！': { zh: '超时空辉夜姬！', en: 'Space-Time Kaguya-hime!' },
  '海虎': { zh: '海虎', en: 'Sea Tiger' },
  '术力口': { zh: '术力口', en: 'Vocaloid-ish' },
  '猫娘': { zh: '猫娘', en: 'Catgirl' },
  '考据狂': { zh: '考据狂', en: 'Lore Junkie' },
  '中二病': { zh: '中二病', en: 'Chuunibyou' },
  '萝莉控': { zh: '萝莉控', en: 'Lolicon' },
}

export function tLabel(def: TagDef): string {
  return locale.value === 'en' && def.en ? def.en : def.label
}

export function t(key: string): string {
  return messages[locale.value]?.[key] ?? key
}

export function toggleLocale(): void {
  locale.value = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
}

export function useI18n() {
  return { locale, t, tLabel, toggleLocale }
}
