/* ============================================================
   《镜中的小雨》 游戏引擎 v2（写实 + 视差）
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var name = '小雨';
  var feel = 0;
  var chIdx = 0, curId = null;
  var typing = false, busy = false;
  var captionMode = false, captionTimer = null;
  var currentCharEl = null;
  var currentCharKey = '';
  var vignetteEl = null;
  var parallaxX = 0, parallaxY = 0;

  var voiceAudio = null;
  function playVoice() {
    if (!VoiceSys.isEnabled()) return;
    stopVoice();
    var f = 'audio/ch' + chIdx + '_' + curId + '.mp3';
    voiceAudio = new Audio(f);
    voiceAudio.play().catch(function () {});
  }
  function stopVoice() { if (voiceAudio) { voiceAudio.pause(); voiceAudio = null; } }

  /* ---------------- 粒子系统 ---------------- */
  var canvas, ctx, W, H, particles = [], pType = 'dust';
  var PART_CFG = {
    rain: { type: 'rain', n: 24, color: '#a3b6dd' },
    dust: { type: 'dust', n: 44, color: '#ffd9a0' },
    spark: { type: 'spark', n: 80, color: '#cfe0ff' },
    ash: { type: 'ash', n: 70, color: '#bcbccb' },
    storm: { type: 'storm', n: 200, color: '#93a8d2' },
    firefly: { type: 'firefly', n: 46, color: '#ffd98a' },
    petal: { type: 'petal', n: 55, color: '#ffb3d1' },
    leaf: { type: 'leaf', n: 70, color: '#cfa87c' },
    glow: { type: 'glow', n: 80, color: '#ffe9b8' }
  };

  function resizeFx() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function spawnParticle(cfg) {
    var t = cfg.type;
    var p = { x: Math.random() * W, y: -20 - Math.random() * H * 0.6, vx: 0, vy: 0, s: 2 + Math.random() * 2.6, ph: Math.random() * Math.PI * 2, type: t, color: cfg.color };
    if (t === 'rain') { p.x = Math.random() * (W + 120) - 60; p.y = Math.random() * H; p.vy = 9 + Math.random() * 6; p.vx = -3 - Math.random() * 3; p.s = 8 + Math.random() * 9; }
    else if (t === 'storm') { p.x = Math.random() * (W + 160) - 80; p.y = Math.random() * H; p.vy = 13 + Math.random() * 8; p.vx = 4 + Math.random() * 4; p.s = 10 + Math.random() * 12; }
    else if (t === 'dust') { p.x = Math.random() * W; p.y = Math.random() * H; p.vx = (Math.random() - 0.5) * 0.4; p.vy = -0.25 - Math.random() * 0.2; }
    else if (t === 'spark') { p.x = Math.random() * W; p.y = Math.random() * H; p.vx = (Math.random() - 0.5) * 0.3; p.vy = -0.15 - Math.random() * 0.2; p.s = 1.2 + Math.random() * 1.6; }
    else if (t === 'ash') { p.x = Math.random() * W; p.y = -20; p.vy = 1.2 + Math.random() * 1.2; p.vx = (Math.random() - 0.5) * 0.8; p.s = 1.5 + Math.random() * 2; p.tw = 0.02 + Math.random() * 0.04; }
    else if (t === 'firefly') { p.x = Math.random() * W; p.y = H * 0.3 + Math.random() * H * 0.6; p.vx = (Math.random() - 0.5) * 0.9; p.vy = (Math.random() - 0.5) * 0.5; p.s = 2 + Math.random() * 2.4; p.glow = true; }
    else if (t === 'petal') { p.x = Math.random() * (W + 60) - 30; p.y = Math.random() * H; p.vx = -1.4 - Math.random() * 1.4; p.vy = 1.2 + Math.random() * 1.4; p.s = 4 + Math.random() * 4; p.rot = Math.random() * Math.PI; p.vr = (Math.random() - 0.5) * 0.06; }
    else if (t === 'leaf') { p.x = Math.random() * (W + 80) - 40; p.y = Math.random() * H; p.vx = -2.2 - Math.random() * 2; p.vy = 0.8 + Math.random() * 1.2; p.s = 3.5 + Math.random() * 3; p.rot = Math.random() * Math.PI; p.vr = (Math.random() - 0.5) * 0.05; }
    else if (t === 'glow') { p.x = Math.random() * W; p.y = H + 20; p.vx = (Math.random() - 0.5) * 0.3; p.vy = -0.6 - Math.random() * 0.9; p.s = 2.4 + Math.random() * 3; p.glow = true; }
    return p;
  }
  function drawParticle(p) {
    var t = p.type;
    ctx.save();
    if (t === 'rain' || t === 'storm') {
      ctx.strokeStyle = t === 'storm' ? 'rgba(170,190,230,0.5)' : 'rgba(150,168,210,0.42)';
      ctx.lineWidth = t === 'storm' ? 1.6 : 1.1;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.vx * 5, p.y + p.vy * 5); ctx.stroke();
    } else if (t === 'firefly' || t === 'glow') {
      var a = 0.35 + 0.65 * Math.abs(Math.sin(p.ph + performance.now() / 900));
      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.s * 5);
      grad.addColorStop(0, 'rgba(255,224,140,0.55)'); grad.addColorStop(1, 'rgba(255,224,140,0)');
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.9 * a; ctx.fillStyle = '#ffefc0'; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    } else if (t === 'petal' || t === 'leaf') {
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = t === 'petal' ? 'rgba(255,170,205,0.75)' : 'rgba(205,168,124,0.75)';
      ctx.beginPath(); ctx.moveTo(0, -p.s); ctx.quadraticCurveTo(p.s * 1.2, 0, 0, p.s); ctx.quadraticCurveTo(-p.s * 1.2, 0, 0, -p.s); ctx.fill();
    } else {
      var alpha = (t === 'dust' || t === 'spark') ? (0.28 + 0.3 * Math.abs(Math.sin(p.ph + performance.now() / 800))) : (t === 'rain' || t === 'storm' ? 0.32 : 0.5);
      ctx.globalAlpha = alpha; ctx.fillStyle = p.color || '#fff';
      ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    }
    ctx.restore();
  }
  function loopFx() {
    var cfg = PART_CFG[pType];
    if (cfg) {
      for (var i = 0; i < cfg.n; i++) if (particles.length < cfg.n) particles.push(spawnParticle(cfg));
      for (var j = particles.length - 1; j >= 0; j--) {
        var p = particles[j];
        p.x += p.vx; p.y += p.vy; p.ph += 0.02;
        if (p.type === 'ash') p.x += Math.sin(p.ph * 8) * p.tw * 60;
        if (p.y < -40 || p.y > H + 40 || p.x < -60 || p.x > W + 60) { particles.splice(j, 1); continue; }
        drawParticle(p);
      }
    }
    requestAnimationFrame(loopFx);
  }
  function setParticles(key) {
    pType = key; particles = [];
    var cfg = PART_CFG[key]; if (!cfg) return;
    for (var i = 0; i < cfg.n; i++) particles.push(spawnParticle(cfg));
  }

  /* ---------------- 语音 TTS（Web Speech API） ---------------- */
  var VoiceSys = (function () {
    var synth = null, voices = [], zhVoice = null, enabled = true, speaking = false, warmed = false;
    function init() {
      if (!synth) { try { synth = window.speechSynthesis; } catch (e) { synth = null; return; } }
      if (!synth) return;
      var pick = function () {
        voices = synth.getVoices();
        zhVoice = voices.filter(function (v) { return v.lang === 'zh-CN' || v.lang === 'zh_CN'; })[0]
          || voices.filter(function (v) { return v.lang && v.lang.indexOf('zh') === 0; })[0]
          || voices.filter(function (v) { return v.localService; })[0]
          || voices[0] || null;
      };
      pick();
      if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = pick;
      if (!zhVoice) setTimeout(pick, 500);
    }
    function cleanText(s) {
      return s.replace(/\{name\}/g, '小雨').replace(/[▼✦✧★♡♥❀☾✎]/g, '').replace(/——/g, '，').trim();
    }
    return {
      init: init,
      warmup: function () {
        init();
        if (!synth || warmed) return;
        try {
          var u = new SpeechSynthesisUtterance(' ');
          u.volume = 0; u.rate = 1;
          synth.speak(u);
          synth.cancel();
          warmed = true;
        } catch (e) {}
      },
      speak: function (text, speaker) {
        if (!enabled || !text) return;
        if (!synth) init();
        if (!synth) return;
        try { synth.cancel(); } catch (e) {}
        var u = new SpeechSynthesisUtterance(cleanText(text));
        u.lang = 'zh-CN';
        if (zhVoice) u.voice = zhVoice;
        u.rate = 0.92; u.pitch = 1.0; u.volume = 0.85;
        if (speaker === '小澈') { u.pitch = 0.82; u.rate = 0.95; }
        else if (speaker === 'NAR') { u.pitch = 0.9; u.rate = 0.85; u.volume = 0.7; }
        else if (speaker === '母亲' || speaker === '小澈母' || speaker === '主任') { u.pitch = 0.75; u.rate = 0.88; }
        else if (speaker === '陈医生') { u.pitch = 0.95; u.rate = 0.9; }
        speaking = true;
        u.onend = function () { speaking = false; };
        u.onerror = function () { speaking = false; };
        try { synth.speak(u); } catch (e) { speaking = false; }
      },
      stop: function () { if (synth) { try { synth.cancel(); } catch (e) {} } speaking = false; },
      toggle: function () { enabled = !enabled; if (!enabled) this.stop(); return enabled; },
      isEnabled: function () { return enabled; },
      isSpeaking: function () { return speaking; }
    };
  })();

  /* ---------------- 音效 ---------------- */
  var AudioSys = (function () {
    var actx = null, muted = false, amb = null, ambGain = null;
    function ensure() { if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } } if (actx && actx.state === 'suspended') actx.resume(); }
    function noiseBuffer() { var len = actx.sampleRate * 2, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0); for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; return buf; }
    function tone(f, dur, type, vol, glide) {
      if (muted || !actx) return;
      var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
      if (glide) o.frequency.exponentialRampToValueAtTime(glide, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.05);
    }
    function startAmb(kind) {
      if (!actx) return; stopAmb();
      ambGain = actx.createGain(); ambGain.gain.value = 0; ambGain.connect(actx.destination);
      amb = { nodes: [] };
      if (kind === 'rain') {
        var src = actx.createBufferSource(); src.buffer = noiseBuffer(); src.loop = true;
        var f1 = actx.createBiquadFilter(); f1.type = 'lowpass'; f1.frequency.value = 950;
        var src2 = actx.createBufferSource(); src2.buffer = noiseBuffer(); src2.loop = true; src2.playbackRate.value = 1.7;
        var f2 = actx.createBiquadFilter(); f2.type = 'highpass'; f2.frequency.value = 3200;
        src.connect(f1); f1.connect(ambGain); src2.connect(f2); f2.connect(ambGain); src.start(); src2.start();
        amb.nodes = [src, src2]; ambGain.gain.setTargetAtTime(0.055, actx.currentTime, 2);
      } else if (kind === 'warm') {
        [261.63, 329.63, 392].forEach(function (fq, i) {
          var o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = fq;
          var lfo = actx.createOscillator(); lfo.frequency.value = 0.15 + i * 0.05; var lg = actx.createGain(); lg.gain.value = 0.0018;
          lfo.connect(lg); lg.connect(g.gain); g.gain.value = 0.05; o.connect(g); g.connect(ambGain); o.start(); lfo.start();
          amb.nodes.push(o, g, lfo, lg);
        });
        ambGain.gain.setTargetAtTime(0.028, actx.currentTime, 2);
      } else if (kind === 'heart') {
        var beat = function () {
          if (!amb) return;
          var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
          o.type = 'sine'; o.frequency.setValueAtTime(52, t); o.frequency.exponentialRampToValueAtTime(30, t + 0.12);
          g.gain.setValueAtTime(0.0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
          o.connect(g); g.connect(ambGain); o.start(t); o.stop(t + 0.3); amb.beatTimer = setTimeout(beat, 850);
        };
        beat(); amb.kind = 'heart';
      }
    }
    function stopAmb() { if (amb) { clearTimeout(amb.beatTimer); if (ambGain) ambGain.gain.setTargetAtTime(0.0001, actx ? actx.currentTime : 0, 0.4); setTimeout(function () { if (amb) amb.nodes.forEach(function (n) { try { n.stop && n.stop(); } catch (e) { } try { n.disconnect(); } catch (e) { } }); }, 900); amb = null; } }
    return {
      init: function () { ensure(); },
      toggle: function () { muted = !muted; ensure(); if (muted) stopAmb(); return muted; },
      isMuted: function () { return muted; },
      ui: function () { ensure(); tone(660, 0.08, 'sine', 0.12, 520); },
      type: function () { ensure(); tone(880 + Math.random() * 240, 0.025, 'triangle', 0.02); },
      ding: function () { ensure(); tone(523.25, 0.35, 'sine', 0.14); setTimeout(function () { tone(783.99, 0.5, 'sine', 0.12); }, 120); },
      shock: function () { ensure(); tone(180, 0.5, 'sawtooth', 0.12, 60); },
      ambient: function (kind) { if (muted) return; ensure(); startAmb(kind); },
      stopAmbient: function () { stopAmb(); }
    };
  })();

  /* ---------------- 打字机 ---------------- */
  function typeInto(el, text, speed, cb) {
    typing = true; var i = 0; el.textContent = '';
    var step = function () {
      if (!typing) return;
      if (i < text.length) { el.textContent = text.slice(0, i + 1); i++; if (i % 2 === 0) AudioSys.type(); setTimeout(step, speed || 34); }
      else { typing = false; if (cb) cb(); }
    };
    step();
  }

  /* ---------------- 场景（视差多层） ---------------- */
  var sceneryBg, farEl, midEl, nearEl, lightEl;
  function bindScenery() {
    sceneryBg = $('scenery');
    farEl = $('scenery-far'); midEl = $('scenery-mid'); nearEl = $('scenery-near'); lightEl = $('scenery-light');
  }
  var SCENE_IMG = {
    rain:'scene_rain.jpg',childhood:'scene_childhood.jpg',pubescent:'scene_pubescent.jpg',school:'scene_school.jpg',
    roof:'scene_roof.jpg',light:'scene_light.jpg',love:'scene_love.jpg',institution:'scene_institution.jpg',
    street:'scene_street.jpg',dawn:'scene_dawn.jpg'
  };
  function setScene(key) {
    var sc = window.Scenes ? window.Scenes.get(key) : null;
    if (!sc) return;
    var transLayer = $('scene-trans');
    if (transLayer) { transLayer.classList.add('active'); }
    setTimeout(function () {
      var imgFile = SCENE_IMG[key];
      if (imgFile) { if (sceneryBg) sceneryBg.style.background = 'url(img/' + imgFile + ') center/cover no-repeat'; }
      else if (sceneryBg) sceneryBg.style.background = sc.bg;
      if (farEl) farEl.innerHTML = '';
      if (midEl) midEl.innerHTML = '';
      if (nearEl) nearEl.innerHTML = '';
      if (lightEl) lightEl.style.background = sc.light || '';
      setParticles(sc.particle || 'dust');
      setMoon(sc.moon);
      if (transLayer) { setTimeout(function () { transLayer.classList.remove('active'); }, 200); }
    }, 350);
    var amb = (key === 'rain' || key === 'street' || key === 'roof' || key === 'school' || key === 'institution') ? 'rain'
      : (key === 'love' || key === 'light' || key === 'dawn') ? 'warm' : null;
    if (amb === 'rain') AudioSys.ambient('rain'); else if (amb === 'warm') AudioSys.ambient('warm'); else AudioSys.stopAmbient();
    if (key === 'roof') AudioSys.ambient('heart');
  }
  function setMoon(on) { $('moon-wrap').classList.toggle('on', !!on); }
  function applyParallax() {
    if (farEl) farEl.style.transform = 'translate(' + (parallaxX * 8) + 'px,' + (parallaxY * 4) + 'px)';
    if (midEl) midEl.style.transform = 'translate(' + (parallaxX * 16) + 'px,' + (parallaxY * 8) + 'px)';
    if (nearEl) nearEl.style.transform = 'translate(' + (parallaxX * 28) + 'px,' + (parallaxY * 12) + 'px)';
  }

  /* ---------------- 立绘 ---------------- */
  function ensureChar(char, outfit, expr, pose) {
    var layer = $('char-layer');
    var key = char + '|' + outfit;
    if (currentCharEl && currentCharKey === key) {
      currentCharEl.classList.remove('out'); currentCharEl.classList.add('in');
      CharBl.setExpr(currentCharEl.querySelector('img'), char, outfit, expr, pose);
    } else {
      if (currentCharEl) currentCharEl.remove();
      var div = document.createElement('div');
      div.className = 'char center in';
      var wrap = document.createElement('div'); wrap.className = 'char-wrap';
      var svgHolder = document.createElement('div');
      svgHolder.innerHTML = CharBl.build(char, outfit, expr, pose);
      wrap.appendChild(svgHolder); div.appendChild(wrap);
      layer.appendChild(div);
      currentCharEl = div; currentCharKey = key;
    }
  }
  function hideChar() { if (currentCharEl) { currentCharEl.classList.remove('in'); currentCharEl.classList.add('out'); } }

  /* ---------------- 渲染 ---------------- */
  var dlgBox, dlgName, dlgText, dlgHint, dlgHeart, captionArea, choiceBox, inputBox, textInput, textOk, interact, progEl;
  function bindUi() {
    dlgBox = $('dialogue-box'); dlgName = $('dlg-name'); dlgText = $('dlg-text');
    dlgHint = $('dlg-hint'); dlgHeart = $('dlg-heart'); captionArea = $('caption-area');
    choiceBox = $('choice-box'); inputBox = $('input-box'); textInput = $('text-input');
    textOk = $('text-ok'); interact = $('interact-layer'); progEl = $('dlg-progress');
  }

  function currentChapter() { return window.STORY.chapters[chIdx]; }
  function goNext() {
    if (busy) return;
    var node = currentChapter().nodes[curId]; if (!node) return;
    var nxt = node.nxt;
    if (nxt === 'next') { nextChapter(); return; }
    if (nxt === 'end') { showEnding(); return; }
    if (typeof nxt === 'string') { curId = nxt; renderNode(); }
  }
  function renderNode() {
    if (busy) return;
    var ch = currentChapter(), node = ch.nodes[curId]; if (!node) return;
    hideUi({ choice: 1, input: 1, popup: 1 });
    var cn = Object.keys(ch.nodes).length, pos = Object.keys(ch.nodes).indexOf(curId) + 1;
    progEl.textContent = ch.no + ' · ' + pos + '/' + cn;
    switch (node.t) {
      case 'scene': setScene(node.scene); if (node.moon !== undefined) setMoon(node.moon); goNext(); break;
      case 'caption':
        captionArea.textContent = node.txt; captionArea.classList.add('small');
        busy = false; clearTimeout(captionTimer); captionTimer = setTimeout(function () { captionMode = true; }, 80); break;
      case 'say': renderDialog(node); break;
      case 'choice': renderChoice(node); break;
      case 'input': renderInput(node); break;
      case 'note': renderNote(node); break;
      case 'minigame_catch': startCatchGame(node); break;
      case 'minigame_dress': startDressGame(node); break;
      default: goNext();
    }
  }
  function renderDialog(node) {
    busy = true;
    var txt = node.txt.replace(/\{name\}/g, name);
    var sp = node.sp;
    dlgBox.style.display = 'block'; captionArea.textContent = '';
    dlgBox.classList.remove('dlg-enter'); void dlgBox.offsetWidth; dlgBox.classList.add('dlg-enter');
    if (sp === 'NAR') { dlgName.textContent = '—— 旁白 ——'; dlgName.className = 'nar'; dlgHeart.classList.add('hidden'); }
    else if (sp === 'ME') { dlgName.textContent = name; dlgName.className = ''; dlgHeart.classList.toggle('hidden', !(node.expr === 'happy' && node.char === 'xiaoyu')); }
    else {
      dlgName.textContent = sp; dlgName.className = '';
      if (sp === '小澈') dlgName.style.background = 'linear-gradient(135deg,#9ad0ff,#5f9fe0)';
      else if (sp === '陈医生') dlgName.style.background = 'linear-gradient(135deg,#a8e0c0,#5fa080)';
      else if (sp === '母亲' || sp === '小澈母' || sp === '主任') dlgName.style.background = 'linear-gradient(135deg,#d8b8a0,#a07860)';
      else dlgName.style.background = '';
      dlgHeart.classList.add('hidden');
    }
    if (node.char) ensureChar(node.char, node.outfit, node.expr, node.pose); else hideChar();
    dlgHint.textContent = '▼';
    playVoice();
    typeInto(dlgText, txt, 30, function () { dlgHint.textContent = '▼ 点击继续'; busy = false; });
    if (node.expr === 'cry' || node.expr === 'sad' || node.expr === 'empty') AudioSys.shock();
    else if (node.expr === 'happy' || node.expr === 'hopeful' || node.expr === 'shy') AudioSys.ding();
  }
  function renderChoice(node) {
    busy = true; dlgBox.style.display = 'block';
    dlgName.textContent = '—— 你的选择 ——'; dlgName.className = 'nar'; dlgHeart.classList.add('hidden');
    dlgText.textContent = node.txt; dlgHint.textContent = ''; choiceBox.innerHTML = '';
    node.opts.forEach(function (o, i) {
      var b = document.createElement('button'); b.className = 'choice-btn';
      b.innerHTML = '<span class="cb-tag">' + ['❀', '✦', '☾', '✎'][i % 4] + '</span>' + o.l;
      b.onclick = function () { AudioSys.ui(); if (o.f) feel += o.f; updateFeel(); choiceBox.innerHTML = ''; busy = false; curId = o.nxt; renderNode(); };
      choiceBox.appendChild(b);
    });
  }
  function renderInput(node) {
    busy = true; dlgBox.style.display = 'none'; inputBox.classList.remove('hidden');
    captionArea.className = 'small'; captionArea.textContent = node.tag;
    textInput.placeholder = node.placeholder; textInput.value = '';
    setTimeout(function () { textInput.focus(); }, 60);
    var done = function () {
      var v = textInput.value.trim();
      if (v && name === '小雨') name = v.slice(0, 24);
      AudioSys.ui(); inputBox.classList.add('hidden'); captionArea.textContent = ''; busy = false; curId = node.nxt; renderNode();
    };
    textOk.onclick = done; textInput.onkeydown = function (e) { if (e.key === 'Enter') done(); };
  }
  function renderNote(node) {
    busy = true; dlgBox.style.display = 'none'; captionArea.textContent = '';
    var card = document.createElement('div'); card.className = 'popup-card';
    card.innerHTML = '<div style="white-space:pre-line;line-height:2;letter-spacing:.08em;color:#f6ecfa;font-size:16px;">' + escapeHtml(node.txt.replace(/\{name\}/g, name)) + '</div><div style="margin-top:18px;"><button class="btn small" id="note-next">✦ 继续</button></div>';
    interact.appendChild(card); interact.style.pointerEvents = 'auto';
    $('note-next').onclick = function () { AudioSys.ui(); card.remove(); interact.style.pointerEvents = 'none'; busy = false; goNext(); };
  }
  function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function hideUi(which) {
    if (which.choice) choiceBox.innerHTML = '';
    if (which.input) inputBox.classList.add('hidden');
    if (which.popup) { interact.innerHTML = ''; interact.style.pointerEvents = 'none'; }
  }
  function updateFeel() { var el = $('feel-val'); if (el) el.textContent = feel; }

  /* ---------------- 章节 ---------------- */
  function nextChapter() { chIdx++; if (chIdx >= window.STORY.chapters.length) { showEnding(); return; } showChapterCover(); }
  function showChapterCover() {
    busy = true;
    var ch = currentChapter();
    $('cc-no').textContent = ch.no; $('cc-title').textContent = ch.title; $('cc-sub').textContent = ch.sub;
    var cover = $('chapter-cover'); cover.classList.remove('hidden'); cover.style.opacity = 1;
    AudioSys.stopAmbient(); AudioSys.ding();
    cover.onclick = function () {
      VoiceSys.warmup(); AudioSys.ui(); cover.style.opacity = 0;
      setTimeout(function () {
        cover.classList.add('hidden'); setScene(ch.scene); curId = ch.start;
        setTimeout(function () { busy = false; renderNode(); }, 300);
      }, 900);
    };
  }

  /* ---------------- 结局 ---------------- */
  function showEnding() {
    AudioSys.stopAmbient(); stopVoice(); busy = true;
    $('stage').classList.add('hidden');
    var t = feel >= 2 ? '你是她的一束光' : '你曾见证了她的故事';
    var text = '<b style="color:#ff9dc6">关于小雨与小澈</b>\n\n' +
      '她们没有消失。她们没有成为任何人的"应该"。\n在很久很久以后的一天，小雨坐在花店里，给路过的少年递上一杯热茶，说：\n\n"慢慢来。你值得，被自己好好爱一次。"\n\n而某个傍晚，一位束短发、眼神温和的男客，买了一束白玫瑰走进来。\n故事停在他们相认的那一眼里——不团圆，但留一线光。\n\n' +
      '《镜中的小雨》· 完\n\n' +
      '如果你正在经历黑暗，请一定相信：这不是你的错。\n人间有许多扇门，总有一扇，会为你开着。\n';
    $('ending-title').textContent = t; $('ending-text').innerHTML = text;
    $('ending-screen').classList.remove('hidden');
    $('btn-restart').onclick = function () { location.reload(); };
    AudioSys.ding();
  }

  /* ---------------- 小游戏：躲纸团 ---------------- */
  function startCatchGame(node) {
    busy = true; dlgBox.style.display = 'none'; captionArea.textContent = '';
    interact.innerHTML = ''; interact.style.pointerEvents = 'auto';
    var wrap = document.createElement('div'); wrap.className = 'catch-game'; wrap.id = 'catch-game';
    wrap.innerHTML = '<div class="catch-title">' + node.title + '</div><div class="catch-field" id="catch-field"><div class="pupil-zone" id="pupil-zone"><div class="pupil" id="pupil"></div></div></div><div class="catch-result" id="catch-result"></div><div class="fx-go" id="catch-tip">' + node.tip + '</div>';
    interact.appendChild(wrap);
    var field = $('catch-field'), pupil = $('pupil');
    var papers = []; var dodged = 0, hit = 0, spawned = 0, target = 20, allSpawned = false, ended = false, justDodge = 0;
    var px = field.clientWidth / 2 - 11; pupil.style.left = px + 'px';
    function setPupilX(x) { px = Math.max(4, Math.min(field.clientWidth - 34, x)); pupil.style.left = px + 'px'; }
    field.addEventListener('pointermove', function (e) { var r = field.getBoundingClientRect(); setPupilX(e.clientX - r.left - 11); });
    field.addEventListener('touchmove', function (e) { e.preventDefault(); var r = field.getBoundingClientRect(); setPupilX(e.touches[0].clientX - r.left - 11); }, { passive: false });
    field.style.cursor = 'none';
    function spawn() {
      if (ended || allSpawned || papers.length >= 6) return;
      var paper = document.createElement('div'); paper.className = 'paper' + (Math.random() < 0.35 ? ' crumpled' : '');
      paper.style.left = (20 + Math.random() * (field.clientWidth - 70)) + 'px'; field.appendChild(paper);
      papers.push({ el: paper, x: parseFloat(paper.style.left), y: -40, vy: 3 + Math.random() * 3.5 });
      spawned++; if (spawned >= target) allSpawned = true;
      spawnTimer = setTimeout(spawn, 300 + Math.random() * 320);
    }
    var spawnTimer = setTimeout(spawn, 400);
    var loop = setInterval(function () {
      for (var i = papers.length - 1; i >= 0; i--) {
        var p = papers[i]; p.el.style.top = (p.y += p.vy) + 'px';
        var atPupil = p.y > field.clientHeight - 112 && Math.abs((p.x + 17) - (px + 11)) < 32;
        if (p.y > field.clientHeight - 26) { p.el.remove(); papers.splice(i, 1); if (atPupil && justDodge === 0) { dodged++; justDodge = 2; AudioSys.ding(); } else hit++; }
      }
      if (justDodge > 0) justDodge--;
      if (allSpawned && papers.length === 0 && !ended) {
        ended = true; clearInterval(loop); clearTimeout(spawnTimer);
        var res = $('catch-result'); res.textContent = '她躲开了 ' + dodged + ' 个纸团'; res.classList.add('dodge');
        var doneBtn = document.createElement('button'); doneBtn.className = 'btn small'; doneBtn.style.marginTop = '6px'; doneBtn.textContent = '✦ 继续';
        doneBtn.onclick = function (e) { e.stopPropagation(); AudioSys.ui(); wrap.remove(); interact.style.pointerEvents = 'none'; busy = false; curId = node.nxt; renderNode(); };
        wrap.appendChild(doneBtn);
      }
    }, 16);
  }

  /* ---------------- 小游戏：化妆 ---------------- */
  function startDressGame(node) {
    busy = true; dlgBox.style.display = 'none'; captionArea.textContent = '';
    interact.innerHTML = ''; interact.style.pointerEvents = 'auto';
    var wrap = document.createElement('div'); wrap.className = 'dress-game'; wrap.id = 'dress-game';
    wrap.innerHTML = '<div class="dress-title">' + node.title + '</div><div class="dress-stage"><div class="dress-char" id="dress-char"></div><div class="dress-palette" id="dress-palette"></div></div><div class="dress-hint" id="dress-hint">' + node.tip + '</div><div class="dress-done" id="dress-done"></div>';
    interact.appendChild(wrap);
    $('dress-char').innerHTML = CharBl.build('xiaoyu', 'girl_dress', 'normal', 'stand');
    var varChar = $('dress-char');
    var steps = [
      { icon: '🧴', label: '护肤', tip: '先给脸颊补一点水，软软亮亮的。' },
      { icon: '🎨', label: '粉底', tip: '轻轻拍上粉底，像月光落在脸上。' },
      { icon: '🌸', label: '腮红', tip: '一点腮红，藏住害羞的黄昏。' },
      { icon: '💄', label: '口红', tip: '涂上草莓味的颜色，抿一抿。' },
      { icon: '🎀', label: '发卡', tip: '最后，别上那枚两半发卡。' }
    ];
    var si = 0, pal = $('dress-palette');
    steps.forEach(function (s, i) {
      var b = document.createElement('button'); b.className = 'dress-item'; b.id = 'di-' + i;
      b.innerHTML = '<span class="di-icon">' + s.icon + '</span>' + s.label;
      b.onclick = function () {
        AudioSys.ui();
        if (i !== si) { $('dress-hint').textContent = i < si ? '这一步已经做过了哦。' : '还不到那一步呢，先做前面的。'; return; }
        b.classList.add('done'); si++; $('dress-hint').textContent = s.tip;
        if (si <= 2) CharBl.setExpr(varChar.querySelector('img'), 'xiaoyu', 'girl_dress', 'shy', 'stand');
        else if (si <= 4) CharBl.setExpr(varChar.querySelector('img'), 'xiaoyu', 'girl_dress', 'happy', 'stand');
        if (si === 5) {
          CharBl.setExpr(varChar.querySelector('img'), 'xiaoyu', 'girl_dress', 'happy', 'stand');
          $('dress-done').textContent = '她对着镜子，笑了。'; AudioSys.ding(); AudioSys.ding();
          setTimeout(function () {
            var doneBtn = document.createElement('button'); doneBtn.className = 'btn small'; doneBtn.textContent = '✦ 继续';
            doneBtn.onclick = function () { AudioSys.ui(); wrap.remove(); interact.style.pointerEvents = 'none'; busy = false; curId = node.nxt; renderNode(); };
            wrap.appendChild(doneBtn);
          }, 700);
        }
      };
      pal.appendChild(b);
    });
  }

  /* ---------------- 绑定 ---------------- */
  function bindAll() {
    bindScenery(); bindUi();
    VoiceSys.init();
    document.addEventListener('click', function () { if (captionMode && !busy) { captionMode = false; AudioSys.ui(); stopVoice(); goNext(); } });
    dlgBox.addEventListener('click', function () { if (busy) return; if (typing) { typing = false; return; } VoiceSys.warmup(); AudioSys.ui(); stopVoice(); goNext(); });
    $('btn-begin').onclick = function () {
      AudioSys.init(); VoiceSys.init(); VoiceSys.warmup(); AudioSys.ui(); updateFeel();
      $('title-screen').classList.add('hidden'); $('stage').classList.remove('hidden');
      if (!vignetteEl) { vignetteEl = document.createElement('div'); vignetteEl.className = 'vignette'; document.body.appendChild(vignetteEl); }
      showChapterCover();
    };
    var muteBtn = $('btn-mute');
    muteBtn.onclick = function () { var m = AudioSys.toggle(); muteBtn.textContent = m ? '🔇 音效：关' : '🔈 音效：开'; };
    var voiceBtn = $('btn-voice');
    if (voiceBtn) voiceBtn.onclick = function () { VoiceSys.init(); var v = VoiceSys.toggle(); voiceBtn.textContent = v ? '🔊 语音：开' : '🔇 语音：关'; if (!v) stopVoice(); };
    $('trig-mini').innerHTML = CharBl.mini();
    window.addEventListener('mousemove', function (e) {
      parallaxX = (e.clientX / W - 0.5); parallaxY = (e.clientY / H - 0.5);
      applyParallax();
    });
    window.addEventListener('deviceorientation', function (e) {
      if (e.gamma !== null) { parallaxX = Math.max(-0.5, Math.min(0.5, e.gamma / 60)); applyParallax(); }
    });
  }

  /* ---------------- 启动 ---------------- */
  canvas = $('fx'); ctx = canvas.getContext('2d'); resizeFx();
  window.addEventListener('resize', resizeFx);
  bindAll();
  setParticles('dust');
  if ($('scenery')) $('scenery').style.background = 'linear-gradient(180deg,#2a1e3f 0%,#1c1428 45%,#120c1c 100%)';
  if (loopFx && !loopFx.started) { loopFx.started = true; requestAnimationFrame(loopFx); }
})();