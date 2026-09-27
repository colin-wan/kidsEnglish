/**
 * Audio Engine optimized for iPad (iOS 12.5.8 Safari)
 * - Safe Web Audio Context unlock on first touch
 * - Polyphonic sound effects
 * - Synthesized organic sounds (pops, chimes, boings, animal effects)
 * - High-clarity Standard American English voice playback
 * - Zero ES2020+ syntax (no optional chaining ?., no nullish coalescing ??)
 */

var AudioEngine = (function() {
  var audioCtx = null;
  var isUnlocked = false;
  var soundCache = {};
  var audioElements = {};
  var currentVoiceAudio = null;

  // Standard American English gentle neural voice clip mapping (.mp3 primary)
  var audioFiles = {
    // Animals
    lion_phrase: 'audio/lion_phrase.mp3',
    elephant_phrase: 'audio/elephant_phrase.mp3',
    monkey_phrase: 'audio/monkey_phrase.mp3',
    duck_phrase: 'audio/duck_phrase.mp3',
    frog_phrase: 'audio/frog_phrase.mp3',
    bear_phrase: 'audio/bear_phrase.mp3',
    rabbit_phrase: 'audio/rabbit_phrase.mp3',
    cat_phrase: 'audio/cat_phrase.mp3',
    dog_phrase: 'audio/dog_phrase.mp3',

    word_lion: 'audio/word_lion.mp3',
    word_elephant: 'audio/word_elephant.mp3',
    word_monkey: 'audio/word_monkey.mp3',
    word_duck: 'audio/word_duck.mp3',
    word_frog: 'audio/word_frog.mp3',
    word_bear: 'audio/word_bear.mp3',
    word_rabbit: 'audio/word_rabbit.mp3',
    word_cat: 'audio/word_cat.mp3',
    word_dog: 'audio/word_dog.mp3',

    phonics_l: 'audio/phonics_l.mp3',
    phonics_e: 'audio/phonics_e.mp3',
    phonics_m: 'audio/phonics_m.mp3',
    phonics_d: 'audio/phonics_d.mp3',
    phonics_f: 'audio/phonics_f.mp3',
    phonics_b: 'audio/phonics_b.mp3',
    phonics_r: 'audio/phonics_r.mp3',
    phonics_c: 'audio/phonics_c.mp3',

    find_lion: 'audio/find_lion.mp3',
    find_elephant: 'audio/find_elephant.mp3',
    find_monkey: 'audio/find_monkey.mp3',
    find_duck: 'audio/find_duck.mp3',
    find_frog: 'audio/find_frog.mp3',
    find_bear: 'audio/find_bear.mp3',
    find_rabbit: 'audio/find_rabbit.mp3',
    find_cat: 'audio/find_cat.mp3',
    find_dog: 'audio/find_dog.mp3',

    // 🍎 Fruits & Foods
    fruit_apple: 'audio/fruit_apple.mp3',
    fruit_banana: 'audio/fruit_banana.mp3',
    fruit_orange: 'audio/fruit_orange.mp3',
    fruit_strawberry: 'audio/fruit_strawberry.mp3',
    fruit_watermelon: 'audio/fruit_watermelon.mp3',
    fruit_carrot: 'audio/fruit_carrot.mp3',
    fruit_milk: 'audio/fruit_milk.mp3',
    fruit_cookie: 'audio/fruit_cookie.mp3',

    // 🚗 Vehicles
    vehicle_car: 'audio/vehicle_car.mp3',
    vehicle_bus: 'audio/vehicle_bus.mp3',
    vehicle_train: 'audio/vehicle_train.mp3',
    vehicle_airplane: 'audio/vehicle_airplane.mp3',
    vehicle_boat: 'audio/vehicle_boat.mp3',
    vehicle_bicycle: 'audio/vehicle_bicycle.mp3',

    // 🎨 Colors
    color_red: 'audio/color_red.mp3',
    color_blue: 'audio/color_blue.mp3',
    color_yellow: 'audio/color_yellow.mp3',
    color_green: 'audio/color_green.mp3',
    color_purple: 'audio/color_purple.mp3',
    color_pink: 'audio/color_pink.mp3',

    // 🍼 Feeding Activity
    feed_prompt: 'audio/feed_prompt.mp3',
    feed_yum: 'audio/feed_yum.mp3',
    feed_monkey_ask: 'audio/feed_monkey_ask.mp3',
    feed_bear_ask: 'audio/feed_bear_ask.mp3',
    feed_rabbit_ask: 'audio/feed_rabbit_ask.mp3',

    // 🎵 Songs (Real Vocal Singing with Melodic Music)
    song_twinkle: 'audio/song_twinkle.m4a',
    song_abc: 'audio/song_abc.m4a',
    song_macdonald: 'audio/song_macdonald.m4a',
    song_row: 'audio/song_row.m4a',

    // Nature
    sun: 'audio/sun.mp3',
    cloud: 'audio/cloud.mp3',
    flower: 'audio/flower.mp3',
    rainbow: 'audio/rainbow.mp3',
    butterfly: 'audio/butterfly.mp3',

    // Praise & Prompts
    praise_great: 'audio/praise_great.mp3',
    praise_yay: 'audio/praise_yay.mp3',
    praise_super: 'audio/praise_super.mp3',
    praise_highfive: 'audio/praise_highfive.mp3',

    welcome: 'audio/welcome.mp3',
    mode_explore: 'audio/mode_explore.mp3',
    mode_find: 'audio/mode_find.mp3',
    mode_bubbles: 'audio/mode_bubbles.mp3'
  };

  function getAudioContext() {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    return audioCtx;
  }

  var soundBuffers = {};
  var currentBufferSource = null;

  // Pre-load and decode audio buffers for instant zero-latency Web Audio playback
  function loadBuffer(key, url) {
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0) {
          ctx.decodeAudioData(xhr.response, function(buffer) {
            soundBuffers[key] = buffer;
          }, function(err) {
            console.warn('decodeAudioData error for ' + key, err);
          });
        }
      };
      xhr.onerror = function() {};
      xhr.send();
    } catch (e) {
      // Safely ignore on local file:// or restricted networks
    }
  }

  // Pre-instantiate audio tags and buffer cache for fast reuse on iOS 12 & Mac
  function initAudioTags() {
    for (var key in audioFiles) {
      if (audioFiles.hasOwnProperty(key)) {
        try {
          var a = new Audio();
          a.src = audioFiles[key];
          a.preload = 'auto';
          audioElements[key] = a;
          loadBuffer(key, audioFiles[key]);
        } catch (err) {}
      }
    }
  }

  // Unlock audio on iOS Safari on user gesture
  function unlock() {
    if (isUnlocked) return;
    
    var ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      // Play a short silent buffer to unlock iOS 12 webkit audio
      try {
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      } catch (e) {
        console.warn('AudioContext buffer unlock error:', e);
      }
    }

    initAudioTags();
    isUnlocked = true;
  }

  // Play pre-recorded American English audio
  function playClip(key, onEnded) {
    unlock();
    
    // Stop any ongoing voice audio to prevent overlapping speech
    if (currentBufferSource) {
      try {
        currentBufferSource.stop(0);
      } catch (e) {}
      currentBufferSource = null;
    }
    if (currentVoiceAudio) {
      try {
        currentVoiceAudio.pause();
        currentVoiceAudio.currentTime = 0;
      } catch (err) {}
      currentVoiceAudio = null;
    }

    var ctx = getAudioContext();
    // 1. Try zero-latency Web Audio AudioBuffer if decoded
    if (ctx && soundBuffers[key]) {
      try {
        var bSource = ctx.createBufferSource();
        bSource.buffer = soundBuffers[key];
        bSource.connect(ctx.destination);
        currentBufferSource = bSource;

        bSource.onended = function() {
          if (currentBufferSource === bSource) {
            currentBufferSource = null;
          }
          if (typeof onEnded === 'function') {
            onEnded();
          }
        };

        bSource.start(0);
        return;
      } catch (err) {
        console.warn('Buffer play failed, using Audio tag fallback', err);
      }
    }

    // 2. Fallback to HTML5 Audio Element
    var audio = audioElements[key];
    if (!audio && audioFiles[key]) {
      audio = new Audio(audioFiles[key]);
      audioElements[key] = audio;
    }

    if (audio) {
      currentVoiceAudio = audio;
      audio.currentTime = 0;
      
      var endedHandler = function() {
        audio.removeEventListener('ended', endedHandler);
        if (currentVoiceAudio === audio) {
          currentVoiceAudio = null;
        }
        if (typeof onEnded === 'function') {
          onEnded();
        }
      };
      audio.addEventListener('ended', endedHandler);

      var playPromise = audio.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function(err) {
          console.warn('Audio play failed, falling back to speech synthesis:', err);
          fallbackSpeech(key, onEnded);
        });
      }
    } else {
      // 3. Fallback to SpeechSynthesis
      fallbackSpeech(key, onEnded);
    }
  }

  // Fallback to SpeechSynthesis with explicit en-US voice
  function fallbackSpeech(textOrKey, onEnded) {
    if (!('speechSynthesis' in window)) {
      if (typeof onEnded === 'function') onEnded();
      return;
    }

    window.speechSynthesis.cancel();

    var text = textOrKey;
    // Map known keys to readable text if a key was passed
    var textMap = {
      lion_phrase: "Lion! L is for Lion. Roar!",
      elephant_phrase: "Elephant! E is for Elephant. Pawoo!",
      monkey_phrase: "Monkey! M is for Monkey. Ooh ooh aah aah!",
      duck_phrase: "Duck! D is for Duck. Quack quack quack!",
      frog_phrase: "Frog! F is for Frog. Ribbit ribbit!",
      bear_phrase: "Bear! B is for Bear. Big warm hug!",
      word_lion: "Lion",
      word_elephant: "Elephant",
      word_monkey: "Monkey",
      word_duck: "Duck",
      word_frog: "Frog",
      word_bear: "Bear",
      sun: "Sunny day! Good morning, sun!",
      cloud: "Puffy cloud! Raindrops falling down!",
      flower: "Pretty flower! Bloom bloom bloom!",
      rainbow: "Look! A beautiful rainbow!",
      butterfly: "Butterfly! Flutter flutter by!",
      praise_great: "Great job! You found it!",
      praise_yay: "Yay! Awesome work!",
      praise_super: "You are a superstar!",
      praise_highfive: "High five! Woohoo!"
    };

    if (textMap[textOrKey]) {
      text = textMap[textOrKey];
    }

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85; // Pleasant, articulated speed for 2-3 yo
    utterance.pitch = 1.1; // Cheerful, friendly tone

    // Pick best American English voice available
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
      var v = voices[i];
      if (v.lang === 'en-US' && (v.name === 'Samantha' || v.name === 'Ava' || v.name === 'Alex' || v.name === 'Victoria')) {
        utterance.voice = v;
        break;
      }
    }

    if (typeof onEnded === 'function') {
      utterance.onend = onEnded;
    }

    window.speechSynthesis.speak(utterance);
  }

  // ==========================================
  // REAL-TIME SYNTHESIZED SOUND EFFECTS
  // (Instant zero-load-time feedback for toddlers)
  // ==========================================

  // Juicy bubble pop sound
  function playPop() {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'sine';
      var now = ctx.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.08);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // Sweet marimba / bell chime note (pentatonic scale for pleasing musical exploration)
  function playChime(freq) {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var f = freq || 523.25; // C5 default
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'triangle';
      var now = ctx.currentTime;
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  // Bouncy cartoon boing
  function playBoing() {
    var ctx = getAudioContext();
    if (!ctx) return;
    try {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      var now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.3);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Magic fairy sparkle (ascending gentle chime arpeggio)
  function playSparkle() {
    var ctx = getAudioContext();
    if (!ctx) return;
    var notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C E G C E
    for (var i = 0; i < notes.length; i++) {
      (function(idx) {
        setTimeout(function() {
          playChime(notes[idx]);
        }, idx * 60);
      })(i);
    }
  }

  // Celebratory trumpet / success chord
  function playFanfare() {
    var ctx = getAudioContext();
    if (!ctx) return;
    var chords = [
      { f: 523.25, d: 0 },    // C5
      { f: 659.25, d: 90 },   // E5
      { f: 783.99, d: 180 },  // G5
      { f: 1046.50, d: 270 }  // C6
    ];
    for (var i = 0; i < chords.length; i++) {
      (function(item) {
        setTimeout(function() {
          playChime(item.f);
        }, item.d);
      })(chords[i]);
    }
  }

  // Playful animal sounds synthesis
  function playAnimalSFX(type) {
    var ctx = getAudioContext();
    if (!ctx) return;
    var now = ctx.currentTime;

    try {
      if (type === 'lion') {
        // Playful cartoon roar rumble
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.4);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'frog') {
        // Frog croak double-pulse
        for (var p = 0; p < 2; p++) {
          (function(offset) {
            setTimeout(function() {
              var o = ctx.createOscillator();
              var g = ctx.createGain();
              var t = ctx.currentTime;
              o.type = 'square';
              o.frequency.setValueAtTime(150, t);
              o.frequency.exponentialRampToValueAtTime(90, t + 0.12);
              g.gain.setValueAtTime(0.2, t);
              g.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
              o.connect(g);
              g.connect(ctx.destination);
              o.start(t);
              o.stop(t + 0.12);
            }, offset);
          })(p * 140);
        }
      } else if (type === 'duck') {
        // Duck quack
        for (var q = 0; q < 2; q++) {
          (function(offset) {
            setTimeout(function() {
              var o = ctx.createOscillator();
              var g = ctx.createGain();
              var t = ctx.currentTime;
              o.type = 'sawtooth';
              o.frequency.setValueAtTime(320, t);
              o.frequency.linearRampToValueAtTime(240, t + 0.15);
              g.gain.setValueAtTime(0.25, t);
              g.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
              o.connect(g);
              g.connect(ctx.destination);
              o.start(t);
              o.stop(t + 0.15);
            }, offset);
          })(q * 160);
        }
      } else if (type === 'elephant') {
        // Elephant trumpet sweep
        var oscE = ctx.createOscillator();
        var gainE = ctx.createGain();
        oscE.type = 'sawtooth';
        oscE.frequency.setValueAtTime(300, now);
        oscE.frequency.linearRampToValueAtTime(620, now + 0.25);
        oscE.frequency.linearRampToValueAtTime(540, now + 0.4);
        gainE.gain.setValueAtTime(0.25, now);
        gainE.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        oscE.connect(gainE);
        gainE.connect(ctx.destination);
        oscE.start(now);
        oscE.stop(now + 0.45);
      } else if (type === 'monkey') {
        // High playful chatter
        for (var m = 0; m < 3; m++) {
          (function(offset, idx) {
            setTimeout(function() {
              var o = ctx.createOscillator();
              var g = ctx.createGain();
              var t = ctx.currentTime;
              o.type = 'triangle';
              var f = idx % 2 === 0 ? 580 : 720;
              o.frequency.setValueAtTime(f, t);
              o.frequency.exponentialRampToValueAtTime(f - 100, t + 0.08);
              g.gain.setValueAtTime(0.25, t);
              g.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
              o.connect(g);
              g.connect(ctx.destination);
              o.start(t);
              o.stop(t + 0.08);
            }, offset);
          })(m * 90, m);
        }
      } else if (type === 'bear') {
        // Warm friendly growl/hum
        var oscB = ctx.createOscillator();
        var gainB = ctx.createGain();
        oscB.type = 'sine';
        oscB.frequency.setValueAtTime(95, now);
        oscB.frequency.linearRampToValueAtTime(115, now + 0.2);
        oscB.frequency.linearRampToValueAtTime(80, now + 0.4);
        gainB.gain.setValueAtTime(0.3, now);
        gainB.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        oscB.connect(gainB);
        gainB.connect(ctx.destination);
        oscB.start(now);
        oscB.stop(now + 0.45);
      }
    } catch (e) {}
  }

  return {
    unlock: unlock,
    playClip: playClip,
    playPop: playPop,
    playChime: playChime,
    playBoing: playBoing,
    playSparkle: playSparkle,
    playFanfare: playFanfare,
    playAnimalSFX: playAnimalSFX,
    speak: fallbackSpeech
  };
})();
