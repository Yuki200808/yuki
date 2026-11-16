/* ============================================================
   《镜中的小雨》 剧情数据（v2 · 写实版）
   立绘字段：char('xiaoyu'|'xiaoche'), outfit, expr, pose
   ============================================================ */
window.STORY = {
  chapters: [
    /* ---------- 序幕 ---------- */
    {
      id: 'prologue', no: '序幕', title: '在镜子前', sub: '一场关于"她"的梦，从这里开始。',
      scene: 'rain', start: 'a1',
      nodes: {
        a1: { t: 'say', sp: 'NAR', txt: '雨下了一整夜。城市像一件被雨水浸透的旧外套。', nxt: 'a2' },
        a2: { t: 'scene', scene: 'rain', nxt: 'a3' },
        a3: { t: 'caption', txt: '有些人的一生，从一张出生证明开始；', nxt: 'a4' },
        a4: { t: 'caption', txt: '而有些人的一生，从一面镜子开始。', nxt: 'a5' },
        a5: { t: 'input', tag: '为她起一个名字', placeholder: '比如：小雨', nxt: 'a6' },
        a6: { t: 'scene', scene: 'rain', moon: 1, nxt: 'a7' },
        a7: { t: 'say', sp: 'NAR', txt: '深夜。老屋三楼的浴室。洗完澡的她站在空无一人的镜子前，把灯调暗。', nxt: 'a8' },
        a8: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'sad', txt: '镜子里的那个人，瘦瘦的，留着短发，穿着宽大的男式睡衣。全世界都叫他"他"。', nxt: 'a9' },
        a9: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'cry', pose: 'tremble', txt: '你……真的是我吗？', nxt: 'a10' },
        a10: { t: 'choice', txt: '镜子不会说谎。可有些话，她藏了好多年——今晚，就当说给雨水听——',
          opts: [
            { l: '我讨厌我的身体。', f: 1, nxt: 'a11' },
            { l: '我好像……生错了身体。', f: 1, nxt: 'a11' },
            { l: '我为什么不能做一个女孩子。', f: 1, nxt: 'a11' }
          ] },
        a11: { t: 'say', sp: 'NAR', txt: '那句藏了十九年的话，终于随着雨声，落到了地上。', nxt: 'a12' },
        a12: { t: 'say', sp: 'NAR', txt: '故事，要从很久以前讲起。从七岁那年，一条借来的裙子讲起。', nxt: 'a13' },
        a13: { t: 'note', txt: '序幕 · 完\n\n—— 故事正式开始的钟声 ——', nxt: 'next' }
      }
    },

    /* ---------- 第一章 乖孩子 ---------- */
    {
      id: 'c1', no: '第一章', title: '乖孩子', sub: '他们要她成为的，是另一个人。',
      scene: 'childhood', start: 'b1',
      nodes: {
        b1: { t: 'scene', scene: 'childhood', nxt: 'b2' },
        b2: { t: 'say', sp: 'NAR', txt: '旧楼，昏黄的灯，夏天蝉叫。七岁，刚搬进新家，新学校。', nxt: 'b3' },
        b3: { t: 'say', sp: '母亲', txt: '快把领结系好！今天去领成绩单，精神点，别让邻居看笑话。', nxt: 'b4' },
        b4: { t: 'say', sp: '母亲', txt: '你这个年纪啊，就该趁着脑子好使，好好念书。书读好了，将来顶天立地。', nxt: 'b5' },
        b5: { t: 'say', sp: 'NAR', txt: '那一年，妈妈带她去理发店，把好不容易留到耳朵边的头发，剪成了板寸。', nxt: 'b6' },
        b6: { t: 'say', sp: '母亲', txt: '清爽！有男孩子的样子了。', nxt: 'b7' },
        b7: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'calm', txt: '镜子里那个干干净净的"男孩"，拼命扯出一个笑，对镜头比了个"耶"。', nxt: 'b8' },
        b8: { t: 'say', sp: 'NAR', txt: '班上有个"漂亮的女孩"——长发、红格裙，被老师夸"小姑娘真俊"。她叫小澈。', nxt: 'b9' },
        b9: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'normal', txt: '那一整节课，我都盯着她的裙子看。看到老师点我名都没听见。', nxt: 'b10' },
        b10: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'child_dress', expr: 'shy', txt: '喂——你是不是……想试试这条裙子？', nxt: 'b11' },
        b11: { t: 'say', sp: 'NAR', txt: '那天下午，小澈偷偷把裙子借给她穿。两个人躲在教室后面的杂物间，咯咯地笑，笑到肚子疼。', nxt: 'b12' },
        b12: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'child_dress', expr: 'sad', txt: '其实……我好羡慕你。你能当男孩。', nxt: 'b13' },
        b13: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'shock', txt: '你、你羡慕我？', nxt: 'b14' },
        b14: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'child_dress', expr: 'cry', pose: 'bow', txt: '我家里说，女孩子要文静、要留长发、要穿裙子。可我……我一穿裙子，就觉得哪里都不对。', nxt: 'b15' },
        b15: { t: 'say', sp: 'NAR', txt: '那是她们第一次知道——原来不止自己一个人，觉得身体出了错。', nxt: 'b16' },
        b16: { t: 'say', sp: 'NAR', txt: '黑箱子从那天起出现在她床底：一枚粉色发卡，和一条小澈送的旧丝巾。两个生错身体的孩子，互相把秘密藏进去。', nxt: 'b17' },
        b17: { t: 'note', txt: '她学会了做两件事：\n在人前当"他"；\n在人后想"她"。\n\n而小澈，也在另一个家里，\n学着当"她"。\n\n两个倒影，隔着一条街，\n互相羡慕着对方的样子。', nxt: 'next' }
      }
    },

    /* ---------- 第二章 镜子里的陌生人 ---------- */
    {
      id: 'c2', no: '第二章', title: '镜子里的陌生人', sub: '青春是一场残忍的提醒。',
      scene: 'pubescent', start: 'c1',
      nodes: {
        c1: { t: 'scene', scene: 'pubescent', moon: 1, nxt: 'c2' },
        c2: { t: 'say', sp: 'NAR', txt: '十四岁的夏天，身体开始背叛她。声音变粗，肩膀变宽，喉结凸了起来。', nxt: 'c3' },
        c3: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'shock', txt: '不……不对。这不应该是我的身子。', nxt: 'c4' },
        c4: { t: 'say', sp: 'NAR', txt: '同一周，小澈也在变——胸部开始发育。小澈恐惧，开始偷偷用绷带束胸。', nxt: 'c5' },
        c5: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'sad', txt: '我用绷带一层一层缠住胸口。可越缠，越觉得喘不过气——不只是胸口。', nxt: 'c6' },
        c6: { t: 'say', sp: 'NAR', txt: '放学后，家里没人。她从床底搬出黑箱子，披上丝巾，在镜子前转了一圈。', nxt: 'c7' },
        c7: { t: 'say', sp: 'NAR', txt: '她笑了。镜子里的那个人，第一次看上去……长得像自己。', nxt: 'c8' },
        c8: { t: 'say', sp: 'NAR', txt: '门锁"咔哒"一声。妈妈提前下班回来了。', nxt: 'c9' },
        c9: { t: 'say', sp: '母亲', txt: '你——！你在干什么？！', nxt: 'c10' },
        c10: { t: 'say', sp: '母亲', txt: '你是男孩子！男儿就该有男儿的样子！你这样，别人怎么看你？！', nxt: 'c11' },
        c11: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'cry', pose: 'tremble', txt: '妈……我只是、我只是觉得这样的我……比较像我自己……', nxt: 'c12' },
        c12: { t: 'say', sp: '母亲', txt: '……住口。我这是为你好。将来你就懂了，妈不会害你。', nxt: 'c13' },
        c13: { t: 'say', sp: 'NAR', txt: '丝巾被收走，发卡被折成两半。同一天晚上，小澈被母亲发现束胸，长发被强行留得更长，裙子被锁进衣柜。', nxt: 'c14' },
        c14: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'cry', txt: '我妈说，再不男不女，就把我锁在家里，哪也别想去。', nxt: 'c15' },
        c15: { t: 'say', sp: 'NAR', txt: '那个周末，两人爬上小区楼顶的天台。风很大，把两个人的头发都吹乱了。', nxt: 'c16' },
        c16: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'sad', txt: '我想成为女孩。', nxt: 'c17' },
        c17: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'sad', txt: '我想成为男孩。', nxt: 'c18' },
        c18: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'calm', txt: '我们是不是……都生错了？', nxt: 'c19' },
        c19: { t: 'note', txt: '青春没有眷顾她们中的任何一个。\n它只是一遍又一遍地提醒：\n你的身体，不是你的。\n\n而在这座城市最高的天台上，\n两个生错身体的孩子，\n第一次并肩坐下，\n看着同一片不属于她们的星空。', nxt: 'next' }
      }
    },

    /* ---------- 第三章 灰色的教室 ---------- */
    {
      id: 'c3', no: '第三章', title: '灰色的教室', sub: '世界开始朝她们扔纸团。',
      scene: 'school', start: 'd1',
      nodes: {
        d1: { t: 'scene', scene: 'school', nxt: 'd2' },
        d2: { t: 'say', sp: 'NAR', txt: '十六岁，高中。她努力把自己缩进人群，却仍然显而易见地格格不入。', nxt: 'd3' },
        d3: { t: 'say', sp: '同学A', txt: '哟——娘娘腔又来上学啦？', nxt: 'd4' },
        d4: { t: 'say', sp: '同学B', txt: '男生体育课还捂着脸，怕晒黑呀？哈哈哈哈哈——', nxt: 'd5' },
        d5: { t: 'say', sp: 'NAR', txt: '小澈也没好到哪去——她被叫"假小子""男人婆""不男不女"。', nxt: 'd6' },
        d6: { t: 'say', sp: '同学C', txt: '喂小澈，你那束胸带都勒出来了，恶不恶心啊？', nxt: 'd7' },
        d7: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'sad', txt: '……闭嘴。', nxt: 'd8' },
        d8: { t: 'minigame_catch', title: '教室 · 第三节自习课', tip: '纸团朝她们飞来了——移动鼠标／手指，把"她"从那些嘲笑里挪开。', nxt: 'd9' },
        d9: { t: 'say', sp: 'NAR', txt: '纸团糊了她一脸。全班哄笑，像一场盛大的节日。', nxt: 'd10' },
        d10: { t: 'say', sp: 'NAR', txt: '小澈替她挡了一次，被几个男生推倒在地，膝盖磕在桌角，磕出血。', nxt: 'd11' },
        d11: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'cry', pose: 'bow', txt: '你没事吧？', nxt: 'd12' },
        d12: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'cry', txt: '……你膝盖在流血。', nxt: 'd13' },
        d13: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'bitter', txt: '没事。比起他们嘴里说出来的那些话，这点血，算什么。', nxt: 'd14' },
        d14: { t: 'say', sp: 'NAR', txt: '那晚，两人躲在被窝里，隔着手机屏幕，一起搜索"跨性别"。', nxt: 'd15' },
        d15: { t: 'say', sp: 'NAR', txt: '搜索结果第一页，跳出一个她们从未听过的词。两人对着屏幕，哭到不能自已。', nxt: 'd16' },
        d16: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'cry', txt: '不是我们的错。……原来，从很早以前，就不是我们的错。', nxt: 'd17' },
        d17: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'hopeful', txt: '我们不是怪物。我们只是……还没遇到对的自己。', nxt: 'd18' },
        d18: { t: 'note', txt: '她们成了彼此唯一的同类。\n\n在这间灰色的教室里，\n只有对方，把对方当成"人"。\n\n——而不是"娘娘腔"，\n也不是"男人婆"，\n只是，一个人。', nxt: 'next' }
      }
    },

    /* ---------- 第四章 深夜的天台 ---------- */
    {
      id: 'c4', no: '第四章', title: '深夜的天台', sub: '再往下一点点，一切就会结束。',
      scene: 'roof', start: 'e1',
      nodes: {
        e1: { t: 'scene', scene: 'roof', nxt: 'e2' },
        e2: { t: 'say', sp: 'NAR', txt: '十七岁。焦虑像第二根脊椎，从背后把她撑起来，又压弯。', nxt: 'e3' },
        e3: { t: 'say', sp: 'NAR', txt: '她开始失眠。药名写了一页，课本却一页都没翻开。', nxt: 'e4' },
        e4: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'calm', txt: '深夜，我打开黑箱子，把那条旧丝巾贴在脸上——闻着淡淡的洗衣粉味，小声问："我还能变成她吗？"', nxt: 'e5' },
        e5: { t: 'say', sp: 'NAR', txt: '那一晚，雨很大，风很大。她顺着消防梯爬上单元楼的天台，站在锈迹斑斑的栏杆边缘，往下看着深深的黑。', nxt: 'e6' },
        e6: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'cry', pose: 'tremble', txt: '只要再往前一步。一步。他们就再也……伤不到我了。', nxt: 'e7' },
        e7: { t: 'choice', txt: '雨打在她身上的每一粒，都像在替她说：好累。此刻，你希望她——',
          opts: [
            { l: '再等一晚上。', nxt: 'e9a' },
            { l: '就一步……就走一步。', nxt: 'e9b' }
          ] },
        e9a: { t: 'say', sp: 'NAR', txt: '她慢慢蹲了下来，抱紧膝盖，让大雨把她泡成一座湿漉漉的小岛。就在这时，头顶忽然"嗒"地一声——一把伞罩住了她。', nxt: 'e10' },
        e9b: { t: 'say', sp: 'NAR', txt: '她的脚尖刚刚挪了出去，风就卷着她往下坠——下一秒，一只温热的手死死攥住了她的手腕。', nxt: 'e9c' },
        e9c: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'shock', pose: 'reach', txt: '抓着我的手——！不准松——！', nxt: 'e10' },
        e10: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'cry', txt: '你又站在这儿。三个晚上了，我都在下面看着你。', nxt: 'e11' },
        e11: { t: 'say', sp: 'NAR', txt: '是小澈。童年那个把裙子借给她的小澈。如今束着胸、剪了短发、穿着男装——可那双眼睛，她一眼就认出来。', nxt: 'e12' },
        e12: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'boy_school', expr: 'cry', txt: '小澈……', nxt: 'e13' },
        e13: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'sad', txt: '我也被我妈逼着去相亲，逃上来的。她们说，再不嫁人，就把我锁起来。我们家——都不要我们成为自己。', nxt: 'e14' },
        e14: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'hopeful', txt: '我认识一个医生。专门做这方面支持很多年了。明天，我陪你去。我们一起，把这件事，慢慢做完。', nxt: 'e15' },
        e15: { t: 'say', sp: 'NAR', txt: '那一次，她在雨里抱住了小澈，哭得像七岁那年第一次穿裙子。', nxt: 'e16' },
        e16: { t: 'note', txt: '那一夜，伞总是斜向她那边。\n雨停的时候，她的眼眶，干了。\n\n——救她的人，不是王子，\n是另一个和她一样，\n也在雨里发抖的人。', nxt: 'next' }
      }
    },

    /* ---------- 第五章 一道光 ---------- */
    {
      id: 'c5', no: '第五章', title: '一道光', sub: '有人对她说：我在。',
      scene: 'light', start: 'f1',
      nodes: {
        f1: { t: 'scene', scene: 'light', nxt: 'f2' },
        f2: { t: 'say', sp: 'NAR', txt: '第二天，小澈真的来了。比约好的时间早了四十分钟，站在楼下朝她挥手。', nxt: 'f3' },
        f3: { t: 'say', sp: '陈医生', txt: '有性别焦虑，从来不代表你有错。你愿意坐在这儿，和陌生人说出这些，已经比很多人都勇敢了。', nxt: 'f4' },
        f4: { t: 'say', sp: '陈医生', txt: '接下来会做心理评估、内分泌咨询……是一段不短的路，路上也会有痛苦。但记住——你不是一个人。医生在，一直陪着你的那个人也在。', nxt: 'f5' },
        f5: { t: 'say', sp: 'NAR', txt: '走出诊室，小澈在走廊尽头朝她竖起大拇指，笑得像一盏灯。', nxt: 'f6' },
        f6: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_casual', expr: 'shy', txt: '小澈。……谢谢你。', nxt: 'f7' },
        f7: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'hopeful', txt: '走吧——带你去买点，你喜欢的颜色。', nxt: 'f8' },
        f8: { t: 'input', tag: '她终于拿起手机，给小澈打了一条短信', placeholder: '小澈，……', nxt: 'f9' },
        f9: { t: 'say', sp: 'NAR', txt: '她按下发送。那一晚，她睡了这半年来最好的一觉。梦里有光。', nxt: 'f10' },
        f10: { t: 'note', txt: '原来最深的黑夜，是有尽头的。\n\n尽头处，站着一个人——\n而这一次，\n那个人和你一样，\n也在雨里。\n\n她不是来救你的王子，\n她是和你一起，\n慢慢从雨里走出来的同伴。', nxt: 'next' }
      }
    },

    /* ---------- 第六章 草莓味的恋爱 ---------- */
    {
      id: 'c6', no: '第六章', title: '草莓味的恋爱', sub: '十八岁那年，她以为爱能把她留下。',
      scene: 'love', start: 'g1',
      nodes: {
        g1: { t: 'scene', scene: 'love', moon: 1, nxt: 'g2' },
        g2: { t: 'say', sp: 'NAR', txt: '十八岁，高考结束的那个夏天长成一片晴朗。她们搬出来合租——小澈打工送外卖，小雨在便利店收银。', nxt: 'g3' },
        g3: { t: 'say', sp: 'NAR', txt: '小澈陪她挑第一条裙子。裙子店的镜子前，她局促地攥着衣角。', nxt: 'g4' },
        g4: { t: 'say', sp: '店员', txt: '这位小姐，想试试哪一条？', nxt: 'g5' },
        g5: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_dress', expr: 'shock', txt: '"小姐"……她，在叫我。', nxt: 'g6' },
        g6: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'happy', txt: '就那条淡粉的吧。……真的很适合她。', nxt: 'g7' },
        g7: { t: 'say', sp: 'NAR', txt: '她也陪小澈挑了第一套正经的男装、第一次去理发店剪了个利落的短发。', nxt: 'g8' },
        g8: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'man', expr: 'happy', txt: '怎么样？', nxt: 'g9' },
        g9: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_dress', expr: 'happy', txt: '像。比像还像。你就是。', nxt: 'g10' },
        g10: { t: 'say', sp: 'NAR', txt: '那天晚上，她对着镜子，替自己完成了人生中的第一次化妆。', nxt: 'g11' },
        g11: { t: 'minigame_dress', title: '第一次 · 化妆', tip: '按顺序帮她化一次妆吧：护肤 → 粉底 → 腮红 → 口红 → 别上那枚发卡。', nxt: 'g12' },
        g12: { t: 'say', sp: 'NAR', txt: '镜子里，一个全新的她，正轻轻笑着。她盯着看了很久，小声说："你好呀，我。你终于来了。"', nxt: 'g13' },
        g13: { t: 'say', sp: 'NAR', txt: '后来她们以真实身份出门：她穿裙，小澈束胸男装。路人有人侧目，有人窃窃私语——但她们第一次觉得，"我们是我们"。', nxt: 'g14' },
        g14: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_dress', expr: 'shy', txt: '小澈……我、我有件事想告诉你。', nxt: 'g15' },
        g15: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_dress', expr: 'happy', txt: '我喜欢你。不是朋友的那种喜欢。', nxt: 'g16' },
        g16: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'man', expr: 'shy', txt: '……我知道。', nxt: 'g17' },
        g17: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'man', expr: 'happy', txt: '我也是。从七岁你穿我裙子那天起。', nxt: 'g18' },
        g18: { t: 'say', sp: 'NAR', txt: '那一晚回家，她的心跳快得像是要装进别人的胸口。手机亮起，是小澈的消息："晚安，小雨。明天见。"', nxt: 'g19' },
        g19: { t: 'note', txt: '恋爱是草莓味的。\n而草莓，也是易碎的。\n\n——她们还不知道，\n属于她们的雨，\n已经在路上了。', nxt: 'next' }
      }
    },

    /* ---------- 第七章 告别 ---------- */
    {
      id: 'c7', no: '第七章', title: '告别', sub: '为了成为自己，他不得不先放弃她。',
      scene: 'institution', start: 'h1',
      nodes: {
        h1: { t: 'scene', scene: 'institution', nxt: 'h2' },
        h2: { t: 'say', sp: 'NAR', txt: '那年秋天，阻碍来了。它不是一场雨，是两家人。', nxt: 'h3' },
        h3: { t: 'say', sp: 'NAR', txt: '小澈的母亲查到他偷偷买的睾酮和束胸带，大怒，把药瓶摔在他面前。', nxt: 'h4' },
        h4: { t: 'say', sp: '小澈母', txt: '你要毁了我们家！我辛辛苦苦把你养成女儿，你竟要去做男人？！', nxt: 'h5' },
        h5: { t: 'say', sp: '小澈母', txt: '听着——你要是不嫁人，就别想拿一分钱手术费、医药费、学费。你一辈子困在那具你恶心的身体里好了。', nxt: 'h6' },
        h6: { t: 'say', sp: 'NAR', txt: '同一时，小雨的母亲也发现她和小澈"来往"，并把她的裙子和小澈送的丝巾翻出来扔进垃圾桶。她把小雨送进一家以"性别矫正"为名的机构，关押半月。', nxt: 'h7' },
        h7: { t: 'say', sp: '主任', txt: '从今天起，你每天念一百遍"我是男孩"。穿男装。不许照镜子。不许提那个"小澈"的名字。', nxt: 'h8' },
        h8: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'patient', expr: 'empty', pose: 'tremble', txt: '……我是男孩。我是男孩。我是男孩。', nxt: 'h9' },
        h9: { t: 'say', sp: 'NAR', txt: '她念到第三天，已经不记得自己原本想成为谁。她只记得，有一个人，叫小澈。', nxt: 'h10' },
        h10: { t: 'say', sp: 'NAR', txt: '小澈来机构门口接她，接不到——被小雨家人报警赶走。他在门口站了一整夜。', nxt: 'h11' },
        h11: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'ftm_casual', expr: 'cry', pose: 'tremble', txt: '让我见她——！求你们让我见她一面——！', nxt: 'h12' },
        h12: { t: 'say', sp: 'NAR', txt: '没有人让他见。', nxt: 'h13' },
        h13: { t: 'say', sp: 'NAR', txt: '小澈为了拿到属于自己的身体——那台他等了十七年的手术——含泪答应家里的婚约。条件只有一个：嫁过去之后，让他完成手术。', nxt: 'h14' },
        h14: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'groom', expr: 'empty', pose: 'bow', txt: '……好。我嫁。嫁完，你们让我做手术。', nxt: 'h15' },
        h15: { t: 'say', sp: 'NAR', txt: '婚前夜，他翻墙到机构窗外。月光把他的影子拉得很长。他穿着被迫穿回的婚纱，头发被家里重新留长，可眼神还是那个小澈。', nxt: 'h16' },
        h16: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'groom', expr: 'cry', pose: 'reach', txt: '小雨……', nxt: 'h17' },
        h17: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'groom', expr: 'cry', txt: '这枚发卡，还你。等我。等我做完手术，成为真正的我——我就回来找你。', nxt: 'h18' },
        h18: { t: 'say', sp: 'NAR', txt: '他把那枚两半别在一起的发卡，从窗缝塞了进来。指尖碰到她指尖的那一秒，他笑了一下，又哭了。', nxt: 'h19' },
        h19: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'patient', expr: 'cry', pose: 'reach', txt: '小澈……小澈你别走……我等你，我等你……', nxt: 'h20' },
        h20: { t: 'say', sp: 'NAR', txt: '可窗已经合上。她手里只剩那枚发卡，和一片月光。', nxt: 'h21' },
        h21: { t: 'note', txt: '为了成为自己，\n他不得不先放弃她。\n\n而她，被关在窗的另一边，\n连一句"我等你"都来不及说出口——\n只来得及，握住那枚发卡，\n哭了一整夜。\n\n——这就是"因性别而不能相爱"。\n不是不爱，\n是这个世界，\n不允许他们以"自己"的样子，\n站在一起。', nxt: 'next' }
      }
    },

    /* ---------- 第八章 空 ---------- */
    {
      id: 'c8', no: '第八章', title: '空', sub: '原来最疼的不是雨，是那句来不及的再见。',
      scene: 'street', start: 'i1',
      nodes: {
        i1: { t: 'scene', scene: 'street', nxt: 'i2' },
        i2: { t: 'say', sp: 'NAR', txt: '半月后，她从机构出来。人瘦了一圈，眼神空空的。', nxt: 'i3' },
        i3: { t: 'say', sp: 'NAR', txt: '小澈已婚、搬走、号码注销、家搬离本市。一切发生得太快，快到她连问一句"为什么"都来不及。', nxt: 'i4' },
        i4: { t: 'say', sp: 'NAR', txt: '她去小澈家。门上贴着一张褪色的"已售"。', nxt: 'i5' },
        i5: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_casual', expr: 'cry', pose: 'tremble', txt: '……连一句再见，都没来得及。', nxt: 'i6' },
        i6: { t: 'say', sp: 'NAR', txt: '她站在门口，雨下得很大。她把那枚发卡攥在手心，攥到发卡边缘嵌进肉里。', nxt: 'i7' },
        i7: { t: 'say', sp: 'NAR', txt: '那晚，她又爬上了天台。这次没有小澈。风很安静，她坐在栏杆边，抬头看了整整一夜的星星。', nxt: 'i8' },
        i8: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'girl_casual', expr: 'sad', pose: 'sit', txt: '小澈说，我只能为自己而活。那么今夜——我为自己，再活一晚。', nxt: 'i9' },
        i9: { t: 'say', sp: 'NAR', txt: '她没有跳。', nxt: 'i10' },
        i10: { t: 'say', sp: 'NAR', txt: '天亮的时候，她从口袋里拿出那枚两半别在一起的发卡，小心地，别在了发梢。', nxt: 'i11' },
        i11: { t: 'note', txt: '爱来过，又走了。\n\n可她终于知道——\n她还得，为自己好好活下去。\n\n带着小澈没能完成的那一份，\n带着那枚两半别在一起的发卡，\n一起活下去。\n\n——总有一天，\n她会成为完整的自己，\n站在能被小澈认出来的样子里。', nxt: 'next' }
      }
    },

    /* ---------- 尾声 晨光 ---------- */
    {
      id: 'c9', no: '尾声', title: '晨光', sub: '故事还没结束。她还在向前走。',
      scene: 'dawn', start: 'j1',
      nodes: {
        j1: { t: 'scene', scene: 'dawn', nxt: 'j2' },
        j2: { t: 'say', sp: 'NAR', txt: '很多年以后。', nxt: 'j3' },
        j3: { t: 'say', sp: 'NAR', txt: '她在一家叫"柠檬树"的花店上班，已完成过渡，是温柔的姐姐。她递出去的每一张卡片背后，都喜欢画一个小女孩，和一面镜子。', nxt: 'j4' },
        j4: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'florist', expr: 'happy', txt: '明天去做复诊；下周，陪隔壁的小林去市三院，做他的第一次心理咨询。', nxt: 'j5' },
        j5: { t: 'say', sp: 'NAR', txt: '门口，一个瘦瘦的少年站了很久，看着花店里的花，不敢进来。她抬起头，像当年小澈对她那样，笑了一下。', nxt: 'j6' },
        j6: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'florist', expr: 'calm', txt: '进来吧。椅子在那边，慢慢说。', nxt: 'j7' },
        j7: { t: 'say', sp: 'NAR', txt: '又是某个傍晚。夕阳把花店的地板染成蜂蜜色。', nxt: 'j8' },
        j8: { t: 'say', sp: 'NAR', txt: '一位束短发、眼神温和、穿男装的男客走进花店，买了一束白玫瑰。', nxt: 'j9' },
        j9: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'man', expr: 'hopeful', txt: '送给一个……我很久以前就该去找的人。', nxt: 'j10' },
        j10: { t: 'say', sp: 'NAR', txt: '两人对视。他轻声——', nxt: 'j11' },
        j11: { t: 'say', sp: '小澈', char: 'xiaoche', outfit: 'man', expr: 'hopeful', txt: '小雨？', nxt: 'j12' },
        j12: { t: 'say', sp: 'ME', char: 'xiaoyu', outfit: 'florist', expr: 'cry', txt: '……小澈？', nxt: 'j13' },
        j13: { t: 'say', sp: 'NAR', txt: '她的眼眶红了。那枚两半别在一起的发卡，还别在她的发梢。故事，停在这里。', nxt: 'j14' },
        j14: { t: 'note', txt: '献给每一个在镜子前徘徊的人——\n\n请相信，明天，\n会有一个更好的你，\n在等你来遇见。\n\n哪怕这一路，要失去很多、很多人。\n哪怕最后只剩一线微光——\n\n那也是光。\n\n《镜中的小雨》· 完', nxt: 'end' }
      }
    }
  ]
};