/* ============================================================
   多层视差场景定义
   window.Scenes.get(key) → { bg, far, mid, near, light, particle, moon }
   ============================================================ */
(function () {
  'use strict';

  var S = {};

  S.rain = {
    bg: 'linear-gradient(180deg,#1b2444 0%,#131a30 55%,#0d101f 100%)',
    moon: 1,
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#0a0e1c"><path d="M0 400 L0 280 L60 280 L60 220 L120 220 L120 280 L200 280 L200 200 L280 200 L280 280 L360 280 L360 240 L440 240 L440 280 L520 280 L520 180 L600 180 L600 280 L680 280 L680 230 L760 230 L760 280 L840 280 L840 210 L920 210 L920 280 L1000 280 L1000 250 L1080 250 L1080 280 L1200 280 L1200 400 Z"/></g><g fill="#1a2238" opacity=".7"><rect x="80" y="240" width="6" height="6"/><rect x="220" y="220" width="6" height="6"/><rect x="540" y="200" width="6" height="6"/><rect x="700" y="250" width="6" height="6"/><rect x="860" y="230" width="6" height="6"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#070a14"><path d="M0 400 L0 320 L100 320 L100 260 L240 260 L240 320 L400 320 L400 240 L560 240 L560 320 L720 320 L720 280 L880 280 L880 320 L1040 320 L1040 250 L1200 250 L1200 400 Z"/></g><g fill="#2a3450" opacity=".5"><rect x="130" y="280" width="8" height="10"/><rect x="170" y="280" width="8" height="10"/><rect x="430" y="260" width="8" height="10"/><rect x="600" y="290" width="8" height="10"/><rect x="750" y="295" width="8" height="10"/><rect x="1080" y="270" width="8" height="10"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#04060c"><rect x="0" y="340" width="1200" height="60"/></g><g fill="#3a4a6a" opacity=".8"><rect x="180" y="300" width="6" height="40"/><circle cx="183" cy="298" r="8" fill="#ffd98a" opacity=".9"/><rect x="183" cy="298" r="8" fill="#ffe9b8"/></g><ellipse cx="183" cy="345" rx="40" ry="6" fill="#3a4a6a" opacity=".3"/></svg>',
    light: '<radial-gradient(circle at 78% 12%, rgba(245,216,143,.18), transparent 30%)>',
    particle: 'rain'
  };

  S.childhood = {
    bg: 'linear-gradient(180deg,#5a4232 0%,#3a2a1e 55%,#241810 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><rect x="0" y="0" width="1200" height="400" fill="#4a3424" opacity=".4"/><g fill="#3a2818" opacity=".6"><rect x="100" y="200" width="80" height="200"/><rect x="900" y="180" width="100" height="220"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#2a1c10" opacity=".7"><rect x="200" y="240" width="160" height="160"/><rect x="800" y="220" width="200" height="180"/></g><g fill="#d8a868" opacity=".5"><circle cx="280" cy="220" r="20"/><circle cx="900" cy="200" r="24"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#1a1008"><rect x="0" y="300" width="1200" height="100"/></g><g fill="#5a3a1e" opacity=".8"><rect x="350" y="240" width="500" height="60" rx="6"/><rect x="380" y="300" width="20" height="60"/><rect x="800" y="300" width="20" height="60"/></g><g fill="#c89868" opacity=".6"><rect x="400" y="220" width="40" height="20"/><rect x="500" y="210" width="40" height="30"/><rect x="600" y="215" width="40" height="25"/></g></svg>',
    light: '<radial-gradient(circle at 30% 20%, rgba(255,200,120,.22), transparent 40%)>',
    particle: 'dust'
  };

  S.pubescent = {
    bg: 'linear-gradient(180deg,#26233f 0%,#161329 55%,#0e0c1c 100%)',
    moon: 1,
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><rect x="0" y="0" width="1200" height="400" fill="#1a1830" opacity=".5"/><g fill="#0e0c1c" opacity=".7"><rect x="850" y="120" width="200" height="280"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#2a2540" opacity=".7"><rect x="600" y="180" width="280" height="220"/></g><g fill="#cfe0ff" opacity=".4"><rect x="640" y="200" width="60" height="80"/><rect x="760" y="200" width="60" height="80"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#0a0814"><rect x="0" y="320" width="1200" height="80"/></g><g fill="#3a3050" opacity=".8"><rect x="300" y="200" width="180" height="120" rx="4"/><rect x="320" y="220" width="140" height="80" fill="#1a1430" opacity=".6"/></g><g stroke="#5a4a78" stroke-width="3" fill="none" opacity=".5"><rect x="500" y="180" width="120" height="160"/></g></svg>',
    light: '<radial-gradient(circle at 80% 14%, rgba(200,220,255,.2), transparent 35%)>',
    particle: 'spark'
  };

  S.school = {
    bg: 'linear-gradient(180deg,#3a3744 0%,#26242e 55%,#16151c 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><rect x="0" y="0" width="1200" height="400" fill="#2e2c36" opacity=".6"/><g fill="#1a191e"><rect x="100" y="120" width="1000" height="60"/></g><g fill="#c8c8d0" opacity=".4"><text x="600" y="155" text-anchor="middle" font-size="28" font-family="serif">黑板</text></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#3a3844" opacity=".7"><rect x="150" y="240" width="120" height="100"/><rect x="350" y="240" width="120" height="100"/><rect x="730" y="240" width="120" height="100"/><rect x="930" y="240" width="120" height="100"/></g><g fill="#5a5864" opacity=".6"><rect x="170" y="220" width="80" height="20"/><rect x="370" y="220" width="80" height="20"/><rect x="750" y="220" width="80" height="20"/><rect x="950" y="220" width="80" height="20"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#0e0d12"><rect x="0" y="320" width="1200" height="80"/></g><g fill="#4a4854" opacity=".8"><rect x="480" y="260" width="240" height="60"/><rect x="500" y="320" width="16" height="60"/><rect x="684" y="320" width="16" height="60"/></g></svg>',
    light: '<linear-gradient(180deg, rgba(200,200,220,.08), transparent 40%)>',
    particle: 'ash'
  };

  S.roof = {
    bg: 'linear-gradient(180deg,#191f38 0%,#0d1020 55%,#070a14 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#080b16"><path d="M0 400 L0 260 L80 260 L80 200 L180 200 L180 260 L300 260 L300 180 L420 180 L420 260 L540 260 L540 220 L660 220 L660 260 L780 260 L780 190 L900 190 L900 260 L1020 260 L1020 230 L1140 230 L1140 260 L1200 260 L1200 400 Z"/></g><g fill="#1a2238" opacity=".6"><rect x="100" y="220" width="5" height="7"/><rect x="340" y="200" width="5" height="7"/><rect x="700" y="230" width="5" height="7"/><rect x="940" y="210" width="5" height="7"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#050810"><path d="M0 400 L0 300 L1200 300 L1200 400 Z"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#1a1a22"><rect x="0" y="280" width="1200" height="20"/></g><g stroke="#3a3a44" stroke-width="4" fill="none"><line x1="60" y1="280" x2="60" y2="180"/><line x1="180" y1="280" x2="180" y2="180"/><line x1="300" y1="280" x2="300" y2="180"/><line x1="420" y1="280" x2="420" y2="180"/><line x1="540" y1="280" x2="540" y2="180"/><line x1="660" y1="280" x2="660" y2="180"/><line x1="780" y1="280" x2="780" y2="180"/><line x1="900" y1="280" x2="900" y2="180"/><line x1="1020" y1="280" x2="1020" y2="180"/><line x1="1140" y1="280" x2="1140" y2="180"/></g><g stroke="#2a2a34" stroke-width="3" fill="none"><line x1="40" y1="200" x2="1160" y2="200"/><line x1="40" y1="240" x2="1160" y2="240"/></g></svg>',
    light: '<radial-gradient(circle at 50% 0%, rgba(120,140,200,.12), transparent 50%)>',
    particle: 'storm'
  };

  S.light = {
    bg: 'linear-gradient(180deg,#4a3a64 0%,#2e2244 55%,#1a1228 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><rect x="0" y="0" width="1200" height="400" fill="#3a2a52" opacity=".5"/></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#241834" opacity=".8"><rect x="700" y="160" width="280" height="240"/></g><g fill="#ffd98a" opacity=".5"><rect x="740" y="200" width="60" height="80"/><rect x="860" y="200" width="60" height="80"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#1a1228"><rect x="0" y="300" width="1200" height="100"/></g><g fill="#4a3a64" opacity=".8"><rect x="400" y="220" width="400" height="80" rx="8"/><rect x="420" y="300" width="20" height="60"/><rect x="760" y="300" width="20" height="60"/></g></svg>',
    light: '<radial-gradient(circle at 50% 30%, rgba(255,220,140,.25), transparent 45%)>',
    particle: 'firefly'
  };

  S.love = {
    bg: 'linear-gradient(180deg,#5a3a5e 0%,#3a2238 55%,#1e1220 100%)',
    moon: 1,
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#1e1424"><path d="M0 400 L0 280 L100 280 L100 220 L220 220 L220 280 L340 280 L340 200 L460 200 L460 280 L580 280 L580 240 L700 240 L700 280 L820 280 L820 210 L940 210 L940 280 L1060 280 L1060 250 L1200 250 L1200 400 Z"/></g><g fill="#ff9dc6" opacity=".4"><rect x="120" y="240" width="6" height="8"/><rect x="380" y="220" width="6" height="8"/><rect x="740" y="255" width="6" height="8"/><rect x="980" y="230" width="6" height="8"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#2a1a2c" opacity=".8"><rect x="500" y="200" width="280" height="200"/></g><g fill="#ffc3dc" opacity=".5"><rect x="540" y="240" width="80" height="100"/><rect x="660" y="240" width="80" height="100"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#14080e"><rect x="0" y="320" width="1200" height="80"/></g><g fill="#4a2a3e" opacity=".8"><rect x="400" y="280" width="400" height="40" rx="6"/></g><g fill="#ff9dc6" opacity=".7"><circle cx="450" cy="270" r="8"/><circle cx="750" cy="270" r="8"/></g></svg>',
    light: '<radial-gradient(circle at 75% 15%, rgba(255,180,210,.2), transparent 35%)>',
    particle: 'petal'
  };

  S.institution = {
    bg: 'linear-gradient(180deg,#3a3a42 0%,#2a2a32 55%,#1a1a22 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><rect x="0" y="0" width="1200" height="400" fill="#2e2e36" opacity=".6"/></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#1e1e26" opacity=".8"><rect x="400" y="160" width="400" height="240"/></g><g stroke="#4a4a54" stroke-width="6" fill="none" opacity=".7"><rect x="420" y="180" width="360" height="200"/></g><g stroke="#3a3a44" stroke-width="4" fill="none"><line x1="540" y1="180" x2="540" y2="380"/><line x1="660" y1="180" x2="660" y2="380"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#0e0e14"><rect x="0" y="320" width="1200" height="80"/></g><g stroke="#5a5a64" stroke-width="3" fill="none" opacity=".6"><line x1="200" y1="240" x2="200" y2="340"/><line x1="240" y1="240" x2="240" y2="340"/><line x1="280" y1="240" x2="280" y2="340"/><line x1="920" y1="240" x2="920" y2="340"/><line x1="960" y1="240" x2="960" y2="340"/><line x1="1000" y1="240" x2="1000" y2="340"/></g></svg>',
    light: '<radial-gradient(circle at 50% 0%, rgba(220,220,230,.15), transparent 50%)>',
    particle: 'ash'
  };

  S.street = {
    bg: 'linear-gradient(180deg,#2b2731 0%,#1a1720 55%,#0f0d14 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#0a0810"><path d="M0 400 L0 290 L120 290 L120 230 L260 230 L260 290 L400 290 L400 210 L540 210 L540 290 L680 290 L680 250 L820 250 L820 290 L960 290 L960 220 L1100 220 L1100 290 L1200 290 L1200 400 Z"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#050408"><rect x="0" y="300" width="1200" height="100"/></g><g fill="#c89868" opacity=".6"><rect x="140" y="240" width="6" height="50"/><circle cx="143" cy="238" r="10" fill="#ffd98a"/></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#020106"><rect x="0" y="340" width="1200" height="60"/></g><g fill="#3a2a1e" opacity=".5"><rect x="500" y="280" width="220" height="60"/></g><ellipse cx="600" cy="380" rx="80" ry="8" fill="#5a4a3a" opacity=".3"/></svg>',
    light: '<radial-gradient(circle at 12% 30%, rgba(255,200,120,.18), transparent 25%)>',
    particle: 'leaf'
  };

  S.dawn = {
    bg: 'linear-gradient(180deg,#7a6a82 0%,#4a3a5e 40%,#2a1f42 100%)',
    far: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#3a2a4e"><path d="M0 400 L0 280 L100 280 L100 240 L240 240 L240 280 L380 280 L380 220 L520 220 L520 280 L660 280 L660 250 L800 250 L800 280 L940 280 L940 230 L1080 230 L1080 280 L1200 280 L1200 400 Z"/></g><g fill="#ffd98a" opacity=".5"><rect x="140" y="255" width="5" height="7"/><rect x="420" y="235" width="5" height="7"/><rect x="700" y="265" width="5" height="7"/><rect x="980" y="245" width="5" height="7"/></g></svg>',
    mid: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#2a1a34" opacity=".8"><rect x="450" y="200" width="300" height="200"/></g><g fill="#ffe9b8" opacity=".6"><rect x="490" y="240" width="80" height="100"/><rect x="630" y="240" width="80" height="100"/></g><g fill="#ff9dc6" opacity=".7"><text x="600" y="190" text-anchor="middle" font-size="22" font-family="serif">柠檬树花店</text></g></svg>',
    near: '<svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice"><g fill="#1a0e1e"><rect x="0" y="320" width="1200" height="80"/></g><g fill="#5a3a4e" opacity=".8"><rect x="380" y="260" width="440" height="60" rx="6"/></g><g fill="#ff9dc6" opacity=".8"><circle cx="430" cy="250" r="10"/><circle cx="470" cy="245" r="8"/><circle cx="770" cy="250" r="10"/><circle cx="730" cy="245" r="8"/></g><g fill="#ffd98a" opacity=".7"><circle cx="450" cy="248" r="5"/><circle cx="750" cy="248" r="5"/></g></svg>',
    light: '<radial-gradient(circle at 50% 10%, rgba(255,220,160,.3), transparent 50%)>',
    particle: 'glow'
  };

  function get(key) { return S[key] || S.rain; }
  function keys() { return Object.keys(S); }

  window.Scenes = { get: get, keys: keys };
})();