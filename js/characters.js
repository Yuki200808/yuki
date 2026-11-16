/* ============================================================
   写实 SVG 立绘生成器
   build(char, outfit, expr, pose) → SVG 字符串
   char: 'xiaoyu' | 'xiaoche'
   ============================================================ */
(function () {
  'use strict';

  var IMG_MAP = {
    'xiaoyu|boy_school|normal':'xy_boy_school_normal.png','xiaoyu|boy_school|sad':'xy_boy_school_sad.png','xiaoyu|boy_school|cry':'xy_boy_school_sad.png','xiaoyu|boy_school|empty':'xy_boy_school_sad.png',
    'xiaoyu|girl_casual|normal':'xy_girl_casual_normal.png','xiaoyu|girl_casual|happy':'xy_girl_casual_happy.png','xiaoyu|girl_casual|sad':'xy_girl_casual_sad.png','xiaoyu|girl_casual|shy':'xy_girl_casual_shy.png','xiaoyu|girl_casual|hopeful':'xy_girl_casual_happy.png','xiaoyu|girl_casual|cry':'xy_girl_casual_sad.png','xiaoyu|girl_casual|empty':'xy_girl_casual_sad.png',
    'xiaoyu|girl_dress|happy':'xy_girl_dress_happy.png','xiaoyu|girl_dress|shy':'xy_girl_dress_shy.png','xiaoyu|girl_dress|normal':'xy_girl_dress_shy.png','xiaoyu|girl_dress|sad':'xy_girl_dress_shy.png',
    'xiaoyu|patient|empty':'xy_patient_empty.png','xiaoyu|patient|hopeful':'xy_patient_hopeful.png','xiaoyu|patient|sad':'xy_patient_empty.png','xiaoyu|patient|normal':'xy_patient_empty.png','xiaoyu|patient|happy':'xy_patient_hopeful.png',
    'xiaoyu|florist|happy':'xy_florist_happy.png','xiaoyu|florist|normal':'xy_florist_happy.png','xiaoyu|florist|hopeful':'xy_florist_happy.png',
    'xiaochi|child_dress|normal':'xc_child_normal.png','xiaochi|child_dress|sad':'xc_child_normal.png','xiaochi|child_dress|happy':'xc_child_normal.png',
    'xiaochi|ftm_casual|normal':'xc_ftm_normal.png','xiaochi|ftm_casual|happy':'xc_ftm_happy.png','xiaochi|ftm_casual|sad':'xc_ftm_sad.png','xiaochi|ftm_casual|shy':'xc_ftm_normal.png','xiaochi|ftm_casual|empty':'xc_ftm_sad.png',
    'xiaochi|groom|sad':'xc_groom_sad.png','xiaochi|groom|empty':'xc_groom_sad.png','xiaochi|groom|normal':'xc_groom_sad.png',
    'xiaochi|man|hopeful':'xc_man_hopeful.png','xiaochi|man|normal':'xc_man_hopeful.png','xiaochi|man|happy':'xc_man_hopeful.png','xiaochi|man|sad':'xc_man_hopeful.png',
  };
  function imgFile(char, outfit, expr) {
    var k = char + '|' + outfit + '|' + (expr || 'normal');
    return IMG_MAP[k] || IMG_MAP[char + '|' + outfit + '|normal'] || 'xy_girl_casual_normal.png';
  }
0;
  var SKIN = {
    xiaoyu: { base: '#f5d4be', shade: '#d9a284', deep: '#b87a5a', blush: '#f29c8e' },
    xiaoche: { base: '#ecc09e', shade: '#c89070', deep: '#a26a4a', blush: '#e88e72' }
  };
  var HAIR = {
    xiaoyu: { main: '#3a2820', hi: '#5a3e2e', shade: '#241812' },
    xiaoche: { main: '#1e1410', hi: '#3a2418', shade: '#100808' }
  };

  /* ---------- 姿势参数 ---------- */
  function poseOf(pose) {
    switch (pose) {
      case 'sit':    return { bodyY: 36, headY: 6,  armR: 0,  armL: 0,  legBend: true,  tilt: 0, cls: 'pose-sit' };
      case 'reach':  return { bodyY: 0,  headY: 0,  armR: -42, armL: 0,  legBend: false, tilt: 0, cls: 'pose-reach' };
      case 'bow':    return { bodyY: 6,  headY: 14, armR: 6,  armL: 6,  legBend: false, tilt: 6, cls: 'pose-bow' };
      case 'turn':   return { bodyY: 0,  headY: 0,  armR: -8, armL: 8,  legBend: false, tilt: 0, headX: 10, cls: 'pose-turn' };
      case 'tremble':return { bodyY: 0,  headY: 0,  armR: 0,  armL: 0,  legBend: false, tilt: 0, cls: 'pose-tremble' };
      default:       return { bodyY: 0,  headY: 0,  armR: 0,  armL: 0,  legBend: false, tilt: 0, cls: 'pose-stand' };
    }
  }

  /* ---------- 头部 + 五官 ---------- */
  function face(expr, char) {
    var s = SKIN[char];
    var eyeY = 78, lx = 102, rx = 138;
    var eyes = '', brows = '', mouth = '', extra = '';
    var browBase = 64;

    function almond(cx, cy, w, h, fill, stroke) {
      return '<path d="M' + (cx - w) + ' ' + cy +
        ' Q' + cx + ' ' + (cy - h) + ' ' + (cx + w) + ' ' + cy +
        ' Q' + cx + ' ' + (cy + h * 0.7) + ' ' + (cx - w) + ' ' + cy + ' Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.4"/>';
    }
    function pupil(cx, cy, r) {
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#2a1a14"/>' +
        '<circle cx="' + (cx + r * 0.4) + '" cy="' + (cy - r * 0.4) + '" r="' + (r * 0.35) + '" fill="#fff" opacity=".9"/>';
    }
    function brow(cx, cy, dy, curve) {
      return '<path d="M' + (cx - 14) + ' ' + cy +
        ' Q' + cx + ' ' + (cy + dy + curve) + ' ' + (cx + 14) + ' ' + (cy + dy) +
        '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="3.4" stroke-linecap="round"/>';
    }

    switch (expr) {
      case 'happy':
        eyes = almond(lx, eyeY, 9, 4.5, '#fff', HAIR[char].shade) + almond(rx, eyeY, 9, 4.5, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY, 3.6) + pupil(rx, eyeY, 3.6);
        brows = brow(lx, browBase, 0, -2) + brow(rx, browBase, 0, -2);
        mouth = '<path d="M108 100 Q120 110 132 100" fill="none" stroke="#9a4a3a" stroke-width="2.6" stroke-linecap="round"/>' +
          '<path d="M112 101 Q120 106 128 101" fill="#c85a4a" opacity=".5"/>';
        extra = blush(s, .5);
        break;
      case 'shy':
        eyes = almond(lx, eyeY, 9, 3.2, '#fff', HAIR[char].shade) + almond(rx, eyeY, 9, 3.2, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY + 1, 3.4) + pupil(rx, eyeY + 1, 3.4);
        eyes += '<path d="M93 ' + (eyeY + 1) + ' Q102 ' + (eyeY - 4) + ' 111 ' + (eyeY + 1) + '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="2.2" stroke-linecap="round"/>';
        eyes += '<path d="M129 ' + (eyeY + 1) + ' Q138 ' + (eyeY - 4) + ' 147 ' + (eyeY + 1) + '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="2.2" stroke-linecap="round"/>';
        brows = brow(lx, browBase, 1, 0) + brow(rx, browBase, 1, 0);
        mouth = '<path d="M110 101 Q120 99 130 101" fill="none" stroke="#9a4a3a" stroke-width="2.4" stroke-linecap="round"/>';
        extra = blush(s, .6);
        break;
      case 'sad':
        eyes = almond(lx, eyeY + 1, 9, 4, '#fff', HAIR[char].shade) + almond(rx, eyeY + 1, 9, 4, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY + 2, 3.4) + pupil(rx, eyeY + 2, 3.4);
        brows = brow(lx, browBase, -2, 3) + brow(rx, browBase, -2, 3);
        mouth = '<path d="M110 102 Q120 97 130 102" fill="none" stroke="#9a4a3a" stroke-width="2.6" stroke-linecap="round"/>';
        break;
      case 'cry':
        eyes = '<path d="M93 ' + eyeY + ' Q102 ' + (eyeY - 5) + ' 111 ' + eyeY + '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="3" stroke-linecap="round"/>';
        eyes += '<path d="M129 ' + eyeY + ' Q138 ' + (eyeY - 5) + ' 147 ' + eyeY + '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="3" stroke-linecap="round"/>';
        eyes += '<path d="M93 ' + eyeY + ' Q102 ' + (eyeY + 4) + ' 111 ' + eyeY + '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>';
        eyes += '<path d="M129 ' + eyeY + ' Q138 ' + (eyeY + 4) + ' 147 ' + eyeY + '" fill="none" stroke="' + HAIR[char].main + '" stroke-width="1.4" stroke-linecap="round" opacity=".5"/>';
        brows = brow(lx, browBase, -3, 4) + brow(rx, browBase, -3, 4);
        mouth = '<path d="M110 104 Q120 98 130 104" fill="none" stroke="#9a4a3a" stroke-width="2.8" stroke-linecap="round"/>';
        extra = blush(s, .3) +
          '<path class="tear" d="M99 ' + (eyeY + 2) + ' Q96 ' + (eyeY + 14) + ' 100 ' + (eyeY + 24) + ' Q104 ' + (eyeY + 14) + ' 99 ' + (eyeY + 2) + ' Z" fill="#a8d8ff" opacity=".85"/>' +
          '<path class="tear" d="M141 ' + (eyeY + 2) + ' Q138 ' + (eyeY + 14) + ' 142 ' + (eyeY + 24) + ' Q146 ' + (eyeY + 14) + ' 141 ' + (eyeY + 2) + ' Z" fill="#a8d8ff" opacity=".85"/>';
        break;
      case 'shock':
        eyes = almond(lx, eyeY, 10, 7, '#fff', HAIR[char].shade) + almond(rx, eyeY, 10, 7, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY, 2.6) + pupil(rx, eyeY, 2.6);
        brows = brow(lx, browBase - 4, 0, -2) + brow(rx, browBase - 4, 0, -2);
        mouth = '<ellipse cx="120" cy="103" rx="6" ry="7" fill="#7a3a2a" stroke="#5a2a1a" stroke-width="1.6"/>';
        break;
      case 'empty':
        eyes = almond(lx, eyeY, 9, 3, '#fff', HAIR[char].shade) + almond(rx, eyeY, 9, 3, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY, 3) + pupil(rx, eyeY, 3);
        brows = brow(lx, browBase, 0, 0) + brow(rx, browBase, 0, 0);
        mouth = '<line x1="112" y1="102" x2="128" y2="102" stroke="#9a4a3a" stroke-width="2.4" stroke-linecap="round"/>';
        break;
      case 'bitter':
        eyes = almond(lx, eyeY, 9, 3.6, '#fff', HAIR[char].shade) + almond(rx, eyeY, 9, 3.6, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY + 1, 3.2) + pupil(rx, eyeY + 1, 3.2);
        brows = brow(lx, browBase, -1, 2) + brow(rx, browBase, -1, 2);
        mouth = '<path d="M110 102 Q120 106 130 100" fill="none" stroke="#9a4a3a" stroke-width="2.6" stroke-linecap="round"/>';
        extra = blush(s, .35);
        break;
      case 'hopeful':
        eyes = almond(lx, eyeY - 1, 9, 5, '#fff', HAIR[char].shade) + almond(rx, eyeY - 1, 9, 5, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY - 1, 3.6) + pupil(rx, eyeY - 1, 3.6);
        brows = brow(lx, browBase, 0, -1) + brow(rx, browBase, 0, -1);
        mouth = '<path d="M108 100 Q120 108 132 100" fill="none" stroke="#9a4a3a" stroke-width="2.6" stroke-linecap="round"/>';
        extra = blush(s, .4);
        break;
      default: // calm / normal
        eyes = almond(lx, eyeY, 9, 4.2, '#fff', HAIR[char].shade) + almond(rx, eyeY, 9, 4.2, '#fff', HAIR[char].shade);
        eyes += pupil(lx, eyeY, 3.4) + pupil(rx, eyeY, 3.4);
        brows = brow(lx, browBase, 0, 0) + brow(rx, browBase, 0, 0);
        mouth = '<path d="M110 101 Q120 105 130 101" fill="none" stroke="#9a4a3a" stroke-width="2.4" stroke-linecap="round"/>';
    }
    return {
      eyes: eyes, brows: brows, mouth: mouth, extra: extra
    };
  }
  function blush(s, o) {
    return '<ellipse cx="92" cy="92" rx="8" ry="4.5" fill="' + s.blush + '" opacity="' + o + '"/>' +
      '<ellipse cx="148" cy="92" rx="8" ry="4.5" fill="' + s.blush + '" opacity="' + o + '"/>';
  }

  /* ---------- 头发 ---------- */
  function hair(char, outfit) {
    var h = HAIR[char];
    var style = hairStyle(char, outfit);
    return style(h);
  }
  function hairStyle(char, outfit) {
    // 返回绘制函数
    if (char === 'xiaoyu') {
      if (outfit === 'boy_school' || outfit === 'patient_short') return function (h) {
        return '<path d="M78 70 Q72 30 120 26 Q168 30 162 70 L162 78 Q150 56 120 54 Q90 56 78 78 Z" fill="' + h.main + '" stroke="' + h.shade + '" stroke-width="2"/>' +
          '<path d="M82 60 Q120 40 158 60 Q150 48 120 44 Q92 48 82 60 Z" fill="' + h.hi + '" opacity=".6"/>' +
          '<path d="M78 70 Q66 78 70 96 L84 92 Q78 80 78 72 Z" fill="' + h.main + '"/>' +
          '<path d="M162 70 Q174 78 170 96 L156 92 Q162 80 162 72 Z" fill="' + h.main + '"/>';
      };
      return function (h) { // long hair (girl_casual / girl_dress / florist)
        var updo = outfit === 'florist';
        var top = updo
          ? '<path d="M76 70 Q70 34 120 28 Q170 34 164 70 L164 80 Q150 50 120 48 Q90 50 76 80 Z" fill="' + h.main + '" stroke="' + h.shade + '" stroke-width="2"/>'
            + '<ellipse cx="120" cy="34" rx="22" ry="14" fill="' + h.main + '"/><ellipse cx="120" cy="32" rx="14" ry="8" fill="' + h.hi + '" opacity=".5"/>'
          : '<path d="M74 72 Q68 28 120 24 Q172 28 166 72 L166 120 Q174 160 168 200 L150 210 Q156 160 152 110 Q150 130 156 200 L130 220 Q120 180 124 130 L120 100 Q116 130 120 180 Q110 220 90 200 Q96 130 92 110 Q88 160 94 210 L72 200 Q66 160 74 120 Z" fill="' + h.main + '" stroke="' + h.shade + '" stroke-width="2"/>';
        var hi = '<path d="M88 50 Q120 36 152 50 Q140 42 120 38 Q98 42 88 50 Z" fill="' + h.hi + '" opacity=".55"/>';
        var side = updo ? '' : '<path d="M74 72 Q56 100 60 150 Q62 180 78 196 L92 180 Q72 140 74 100 Z" fill="' + h.main + '"/>' +
          '<path d="M166 72 Q184 100 180 150 Q178 180 162 196 L148 180 Q168 140 166 100 Z" fill="' + h.main + '"/>';
        return top + hi + side;
      };
    }
    // xiaoche
    if (outfit === 'child_dress' || outfit === 'groom') return function (h) { // long hair (girl)
      var veil = outfit === 'groom' ? '<path d="M76 60 Q120 20 164 60 L168 180 Q120 200 72 180 Z" fill="#fff" opacity=".55"/><path d="M76 60 Q120 24 164 60" fill="none" stroke="#e8d8e8" stroke-width="2"/>' : '';
      return '<path d="M72 72 Q66 26 120 22 Q174 26 168 72 L168 130 Q176 170 170 220 L150 230 Q156 170 152 120 Q150 140 156 220 L130 240 Q120 190 124 140 L120 110 Q116 140 120 190 Q110 240 90 220 Q96 140 92 120 Q88 170 94 230 L72 220 Q66 170 72 130 Z" fill="' + h.main + '" stroke="' + h.shade + '" stroke-width="2"/>' +
        '<path d="M86 46 Q120 30 154 46 Q140 38 120 34 Q98 38 86 46 Z" fill="' + h.hi + '" opacity=".5"/>' + veil;
    };
    return function (h) { // short hair (ftm_casual / man)
      return '<path d="M76 68 Q70 28 120 24 Q170 28 164 68 L164 80 Q150 52 120 50 Q90 52 76 80 Z" fill="' + h.main + '" stroke="' + h.shade + '" stroke-width="2"/>' +
        '<path d="M80 56 Q120 38 160 56 Q148 44 120 40 Q92 44 80 56 Z" fill="' + h.hi + '" opacity=".55"/>' +
        '<path d="M76 68 Q64 76 68 92 L82 88 Q76 78 76 70 Z" fill="' + h.main + '"/>' +
        '<path d="M164 68 Q176 76 172 92 L158 88 Q164 78 164 70 Z" fill="' + h.main + '"/>' +
        '<path d="M120 50 Q140 48 158 60 L150 50 Q130 44 120 48 Z" fill="' + h.shade + '" opacity=".6"/>';
    };
  }

  /* ---------- 服装 ---------- */
  function outfitPaths(char, outfit, pose) {
    var s = SKIN[char];
    var legBend = pose === 'sit';
    var legPath = legBend
      ? '<path d="M96 270 L96 360 L88 360 L88 540 L108 540 L108 360 L132 360 L132 540 L152 540 L152 360 L144 360 L144 270 Z" fill="' + s.shade + '"/>'
      : '<path d="M96 270 L92 540 L114 540 L118 270 Z" fill="' + s.base + '"/><path d="M122 270 L126 540 L148 540 L144 270 Z" fill="' + s.base + '"/>';
    var legShade = legBend ? '' : '<path d="M96 270 L94 540 L102 540 L104 270 Z" fill="' + s.shade + '" opacity=".5"/><path d="M138 270 L140 540 L146 540 L144 270 Z" fill="' + s.shade + '" opacity=".5"/>';

    switch (outfit) {
      case 'boy_school':
        return legPath + legShade +
          '<path d="M84 150 Q80 200 86 270 L154 270 Q160 200 156 150 Z" fill="#f4f1f7"/>' +
          '<path d="M84 150 Q120 158 156 150 L156 165 Q120 173 84 165 Z" fill="#e6e0ee"/>' +
          '<path d="M108 150 L120 162 L132 150 L126 152 L120 248 L114 152 Z" fill="#3a3357"/>' +
          '<path d="M84 150 Q70 170 76 250 L92 248 Q86 200 84 160 Z" fill="' + s.base + '"/>' +
          '<path d="M156 150 Q170 170 164 250 L148 248 Q154 200 156 160 Z" fill="' + s.base + '"/>' +
          '<rect x="92" y="262" width="56" height="14" fill="#2a2545"/>';
      case 'girl_casual':
        return '<path d="M82 150 Q78 200 84 230 L156 230 Q162 200 158 150 Z" fill="#e8d4b8"/>' +
          '<path d="M82 150 Q120 156 158 150 L158 168 Q120 174 82 168 Z" fill="#d4be9e"/>' +
          '<path d="M84 230 Q72 280 78 380 L162 380 Q168 280 156 230 Z" fill="#7a8aa8"/>' +
          '<path d="M84 230 L156 230 L158 244 L82 244 Z" fill="#6a7a98"/>' +
          '<path d="M96 380 L92 540 L114 540 L118 380 Z" fill="' + s.base + '"/><path d="M122 380 L126 540 L148 540 L144 380 Z" fill="' + s.base + '"/>' +
          '<path d="M82 150 Q68 172 74 240 L90 238 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 240 L150 238 Q156 200 158 160 Z" fill="' + s.base + '"/>';
      case 'girl_dress':
        return '<path d="M82 150 Q78 200 84 240 L156 240 Q162 200 158 150 Z" fill="#fff1f6"/>' +
          '<path d="M82 150 Q120 156 158 150 L158 168 Q120 174 82 168 Z" fill="#ffe0ec"/>' +
          '<path d="M84 240 Q66 320 72 440 L168 440 Q174 320 156 240 Z" fill="#ffc3dc"/>' +
          '<path d="M84 240 L156 240 L160 256 L80 256 Z" fill="#ffa0c4"/>' +
          '<path d="M84 240 Q66 320 72 440 L168 440 Q174 320 156 240 Z" fill="url(#dressShade)" opacity=".25"/>' +
          '<g fill="#fff" opacity=".85"><circle cx="100" cy="340" r="3.5"/><circle cx="120" cy="350" r="3.5"/><circle cx="140" cy="340" r="3.5"/><circle cx="110" cy="380" r="3.5"/><circle cx="130" cy="380" r="3.5"/></g>' +
          '<path d="M82 150 Q68 172 74 230 L90 228 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 230 L150 228 Q156 200 158 160 Z" fill="' + s.base + '"/>' +
          '<g transform="translate(150 70)"><path d="M0 0 Q-12 -8 -10 -1 Q-16 2 -10 6 Q-12 12 0 4Z" fill="#ff8fb8"/><path d="M0 0 Q12 -8 10 -1 Q16 2 10 6 Q12 12 0 4Z" fill="#ff8fb8"/><circle r="3" fill="#ffcee2"/></g>';
      case 'patient':
        return '<path d="M82 150 Q78 200 84 270 L156 270 Q162 200 158 150 Z" fill="#d8d8de"/>' +
          '<path d="M82 150 Q120 156 158 150 L158 170 Q120 176 82 170 Z" fill="#c4c4ca"/>' +
          '<path d="M96 270 L92 540 L114 540 L118 270 Z" fill="#c8c8ce"/><path d="M122 270 L126 540 L148 540 L144 270 Z" fill="#c8c8ce"/>' +
          '<path d="M82 150 Q68 172 74 250 L90 248 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 250 L150 248 Q156 200 158 160 Z" fill="' + s.base + '"/>' +
          '<text x="120" y="220" text-anchor="middle" fill="#9a9aa0" font-size="10" font-family="sans-serif">矫正</text>';
      case 'florist':
        return '<path d="M82 150 Q78 200 84 230 L156 230 Q162 200 158 150 Z" fill="#fff8ee"/>' +
          '<path d="M84 230 Q72 300 78 400 L162 400 Q168 300 156 230 Z" fill="#e8d8c0"/>' +
          '<path d="M86 165 Q78 220 84 280 L156 280 Q162 220 154 165 Z" fill="#c8a878"/>' +
          '<path d="M86 165 Q120 170 154 165 L154 178 Q120 183 86 178 Z" fill="#b89868"/>' +
          '<rect x="100" y="200" width="40" height="30" rx="4" fill="#a88858"/>' +
          '<g transform="translate(120 215)"><circle r="5" fill="#ff9dc6"/><circle cx="-7" r="4" fill="#ffd98a"/><circle cx="7" r="4" fill="#a8d8ff"/><circle cy="-7" r="4" fill="#ff8fb8"/></g>' +
          '<path d="M96 400 L92 540 L114 540 L118 400 Z" fill="' + s.base + '"/><path d="M122 400 L126 540 L148 540 L144 400 Z" fill="' + s.base + '"/>' +
          '<path d="M82 150 Q68 172 74 230 L90 228 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 230 L150 228 Q156 200 158 160 Z" fill="' + s.base + '"/>';
      case 'child_dress':
        return '<path d="M82 150 Q78 200 84 240 L156 240 Q162 200 158 150 Z" fill="#fff"/>' +
          '<path d="M84 240 Q66 320 72 440 L168 440 Q174 320 156 240 Z" fill="#e85a5a"/>' +
          '<g stroke="#fff" stroke-width="2" fill="none" opacity=".7"><path d="M84 280 L156 280"/><path d="M84 320 L156 320"/><path d="M84 360 L156 360"/><path d="M84 400 L156 400"/></g>' +
          '<path d="M96 440 L92 540 L114 540 L118 440 Z" fill="#fff"/><path d="M122 440 L126 540 L148 540 L144 440 Z" fill="#fff"/>' +
          '<path d="M82 150 Q68 172 74 230 L90 228 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 230 L150 228 Q156 200 158 160 Z" fill="' + s.base + '"/>';
      case 'ftm_casual':
        return legPath + legShade +
          '<path d="M82 150 Q78 200 84 270 L156 270 Q162 200 158 150 Z" fill="#2a2a32"/>' +
          '<path d="M82 150 Q120 156 158 150 L158 168 Q120 174 82 168 Z" fill="#1a1a22"/>' +
          '<path d="M84 168 L156 168 L156 178 L84 178 Z" fill="#3a3a42" opacity=".6"/>' +
          '<path d="M82 150 Q68 172 74 250 L90 248 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 250 L150 248 Q156 200 158 160 Z" fill="' + s.base + '"/>';
      case 'groom':
        return '<path d="M82 150 Q78 200 84 240 L156 240 Q162 200 158 150 Z" fill="#fff"/>' +
          '<path d="M84 240 Q60 340 70 460 L170 460 Q180 340 156 240 Z" fill="#f8f0f8"/>' +
          '<path d="M84 240 L156 240 L162 260 L78 260 Z" fill="#e8d0e0"/>' +
          '<g fill="#fff" opacity=".7"><circle cx="100" cy="340" r="4"/><circle cx="130" cy="380" r="4"/><circle cx="110" cy="420" r="4"/></g>' +
          '<path d="M96 460 L92 540 L114 540 L118 460 Z" fill="#fff"/><path d="M122 460 L126 540 L148 540 L144 460 Z" fill="#fff"/>' +
          '<path d="M82 150 Q68 172 74 230 L90 228 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 230 L150 228 Q156 200 158 160 Z" fill="' + s.base + '"/>';
      case 'man':
        return legPath + legShade +
          '<path d="M82 150 Q78 200 84 270 L156 270 Q162 200 158 150 Z" fill="#a8c4e0"/>' +
          '<path d="M82 150 Q120 156 158 150 L158 168 Q120 174 82 168 Z" fill="#94b0d0"/>' +
          '<path d="M108 150 L120 162 L132 150 L126 152 L120 230 L114 152 Z" fill="#5a4a3a"/>' +
          '<path d="M84 270 L84 282 L156 282 L156 270 Z" fill="#4a4a52"/>' +
          '<path d="M82 150 Q68 172 74 250 L90 248 Q84 200 82 160 Z" fill="' + s.base + '"/>' +
          '<path d="M158 150 Q172 172 166 250 L150 248 Q156 200 158 160 Z" fill="' + s.base + '"/>';
      default:
        return legPath;
    }
  }

  /* ---------- 头部基底 ---------- */
  function headBase(char) {
    var s = SKIN[char];
    return '<ellipse cx="120" cy="75" rx="42" ry="50" fill="url(#skinG)" stroke="' + s.deep + '" stroke-width="1.6"/>' +
      '<path d="M82 60 Q120 40 158 60 Q156 48 120 44 Q84 48 82 60 Z" fill="' + s.base + '"/>' +
      '<path d="M78 75 Q72 100 80 120 L92 118 Q84 95 80 78 Z" fill="' + s.base + '"/>' +
      '<path d="M162 75 Q168 100 160 120 L148 118 Q156 95 160 78 Z" fill="' + s.base + '"/>' +
      '<path d="M120 88 L116 96 L120 98 L124 96 Z" fill="' + s.shade + '" opacity=".5"/>';
  }

  /* ---------- 主生成 ---------- */
  function build(char, outfit, expr, pose) {
    var p = poseOf(pose);
    var file = imgFile(char, outfit, expr);
    return '<img src="img/' + file + '" class="char-img ' + char + ' ' + p.cls + '" alt="' + char + '" draggable="false">';
  }

  function setExpr(el, char, outfit, expr, pose) {
    if (!el) return;
    var file = imgFile(char, outfit, expr);
    el.style.opacity = '0';
    el.style.transition = 'opacity .4s ease';
    el.src = 'img/' + file;
    el.onload = function () { requestAnimationFrame(function () { el.style.opacity = '1'; }); };
  }

  function mini() {
    return '<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:flex-end;">' +
      build('xiaoyu', 'girl_dress', 'shy', 'stand') +
      '</div>';
  }

  function setExpr(svgEl, char, outfit, expr, pose) {
    if (!svgEl) return;
    var parent = svgEl.parentNode;
    var cls = svgEl.getAttribute('class') || '';
    var wrapper = document.createElement('div');
    wrapper.innerHTML = build(char, outfit, expr, pose);
    var fresh = wrapper.firstChild;
    fresh.style.opacity = '0';
    fresh.style.transition = 'opacity .35s ease';
    parent.replaceChild(fresh, svgEl);
    requestAnimationFrame(function () { fresh.style.opacity = '1'; });
  }

  function mini() {
    return '<div style="width:100%;height:100%;display:flex;justify-content:center;align-items:flex-end;">' +
      build('xiaoyu', 'girl_dress', 'shy', 'stand') +
      '</div>';
  }

  window.CharBl = { build: build, setExpr: setExpr, mini: mini };
})();