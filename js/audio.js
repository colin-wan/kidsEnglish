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

    // Nature & Weather
    sun: 'audio/sun.mp3',
    cloud: 'audio/cloud.mp3',
    flower: 'audio/flower.mp3',
    rainbow: 'audio/rainbow.mp3',
    butterfly: 'audio/butterfly.mp3',
    weather_day: 'audio/weather_day.mp3',
    weather_night: 'audio/weather_night.mp3',
    weather_rain: 'audio/weather_rain.mp3',
    sfx_splash: 'audio/sfx_splash.mp3',
    sfx_firefly: 'audio/sfx_firefly.mp3',

    // Praise & Prompts
    praise_great: 'audio/praise_great.mp3',
    praise_yay: 'audio/praise_yay.mp3',
    praise_super: 'audio/praise_super.mp3',
    praise_highfive: 'audio/praise_highfive.mp3',

    welcome: 'audio/welcome.mp3',
    mode_explore: 'audio/mode_explore.mp3',
    mode_find: 'audio/mode_find.mp3',
    mode_bubbles: 'audio/mode_bubbles.mp3',

    // Expanded Animals
    panda_phrase: 'audio/panda_phrase.mp3',
    cow_phrase: 'audio/cow_phrase.mp3',
    sheep_phrase: 'audio/sheep_phrase.mp3',
    word_panda: 'audio/word_panda.mp3',
    word_cow: 'audio/word_cow.mp3',
    word_sheep: 'audio/word_sheep.mp3',
    phonics_p: 'audio/phonics_p.mp3',
    phonics_s: 'audio/phonics_s.mp3',
    find_panda: 'audio/find_panda.mp3',
    find_cow: 'audio/find_cow.mp3',
    find_sheep: 'audio/find_sheep.mp3',

    // Expanded Foods
    fruit_grapes: 'audio/fruit_grapes.mp3',
    fruit_corn: 'audio/fruit_corn.mp3',
    fruit_cheese: 'audio/fruit_cheese.mp3',
    fruit_honey: 'audio/fruit_honey.mp3',
    fruit_fish: 'audio/fruit_fish.mp3',
    fruit_bone: 'audio/fruit_bone.mp3',
    fruit_bamboo: 'audio/fruit_bamboo.mp3',

    // Expanded Vehicles
    vehicle_firetruck: 'audio/vehicle_firetruck.mp3',
    vehicle_helicopter: 'audio/vehicle_helicopter.mp3',

    // Expanded Colors
    color_orange: 'audio/color_orange.mp3',
    color_brown: 'audio/color_brown.mp3',
    color_white: 'audio/color_white.mp3',
    color_black: 'audio/color_black.mp3',

    // Expanded Feeding Friends
    feed_dog_ask: 'audio/feed_dog_ask.mp3',
    feed_cat_ask: 'audio/feed_cat_ask.mp3',
    feed_panda_ask: 'audio/feed_panda_ask.mp3',
    feed_elephant_ask: 'audio/feed_elephant_ask.mp3',
    feed_duck_ask: 'audio/feed_duck_ask.mp3',

    // Pause & Rest Mode
    pause_take_break: 'audio/pause_take_break.mp3',
    pause_resume: 'audio/pause_resume.mp3',

    // Expanded Nursery Rhymes
    song_wheels: 'audio/song_wheels.m4a',
    song_happy: 'audio/song_happy.m4a',

    // 🔤 Alphabet A-Z Phonics & Prompts
    song_abc: 'audio/song_abc.mp3',
    theme_alphabet: 'audio/theme_alphabet.mp3',
    letter_phrase_a: 'audio/letter_phrase_a.mp3',
    letter_phrase_b: 'audio/letter_phrase_b.mp3',
    letter_phrase_c: 'audio/letter_phrase_c.mp3',
    letter_phrase_d: 'audio/letter_phrase_d.mp3',
    letter_phrase_e: 'audio/letter_phrase_e.mp3',
    letter_phrase_f: 'audio/letter_phrase_f.mp3',
    letter_phrase_g: 'audio/letter_phrase_g.mp3',
    letter_phrase_h: 'audio/letter_phrase_h.mp3',
    letter_phrase_i: 'audio/letter_phrase_i.mp3',
    letter_phrase_j: 'audio/letter_phrase_j.mp3',
    letter_phrase_k: 'audio/letter_phrase_k.mp3',
    letter_phrase_l: 'audio/letter_phrase_l.mp3',
    letter_phrase_m: 'audio/letter_phrase_m.mp3',
    letter_phrase_n: 'audio/letter_phrase_n.mp3',
    letter_phrase_o: 'audio/letter_phrase_o.mp3',
    letter_phrase_p: 'audio/letter_phrase_p.mp3',
    letter_phrase_q: 'audio/letter_phrase_q.mp3',
    letter_phrase_r: 'audio/letter_phrase_r.mp3',
    letter_phrase_s: 'audio/letter_phrase_s.mp3',
    letter_phrase_t: 'audio/letter_phrase_t.mp3',
    letter_phrase_u: 'audio/letter_phrase_u.mp3',
    letter_phrase_v: 'audio/letter_phrase_v.mp3',
    letter_phrase_w: 'audio/letter_phrase_w.mp3',
    letter_phrase_x: 'audio/letter_phrase_x.mp3',
    letter_phrase_y: 'audio/letter_phrase_y.mp3',
    letter_phrase_z: 'audio/letter_phrase_z.mp3',

    find_letter_a: 'audio/find_letter_a.mp3',
    find_letter_b: 'audio/find_letter_b.mp3',
    find_letter_c: 'audio/find_letter_c.mp3',
    find_letter_d: 'audio/find_letter_d.mp3',
    find_letter_e: 'audio/find_letter_e.mp3',
    find_letter_f: 'audio/find_letter_f.mp3',
    find_letter_g: 'audio/find_letter_g.mp3',
    find_letter_h: 'audio/find_letter_h.mp3',
    find_letter_i: 'audio/find_letter_i.mp3',
    find_letter_j: 'audio/find_letter_j.mp3',
    find_letter_k: 'audio/find_letter_k.mp3',
    find_letter_l: 'audio/find_letter_l.mp3',
    find_letter_m: 'audio/find_letter_m.mp3',
    find_letter_n: 'audio/find_letter_n.mp3',
    find_letter_o: 'audio/find_letter_o.mp3',
    find_letter_p: 'audio/find_letter_p.mp3',
    find_letter_q: 'audio/find_letter_q.mp3',
    find_letter_r: 'audio/find_letter_r.mp3',
    find_letter_s: 'audio/find_letter_s.mp3',
    find_letter_t: 'audio/find_letter_t.mp3',
    find_letter_u: 'audio/find_letter_u.mp3',
    find_letter_v: 'audio/find_letter_v.mp3',
    find_letter_w: 'audio/find_letter_w.mp3',
    find_letter_x: 'audio/find_letter_x.mp3',
    find_letter_y: 'audio/find_letter_y.mp3',
    find_letter_z: 'audio/find_letter_z.mp3',

    // 🔤 26 Letter Exclusive Fun Sound Effects (Authentic American Voice Acting & Onomatopoeia)
    sfx_letter_a: 'audio/sfx_letter_a.mp3',
    sfx_letter_b: 'audio/sfx_letter_b.mp3',
    sfx_letter_c: 'audio/sfx_letter_c.mp3',
    sfx_letter_d: 'audio/sfx_letter_d.mp3',
    sfx_letter_e: 'audio/sfx_letter_e.mp3',
    sfx_letter_f: 'audio/sfx_letter_f.mp3',
    sfx_letter_g: 'audio/sfx_letter_g.mp3',
    sfx_letter_h: 'audio/sfx_letter_h.mp3',
    sfx_letter_i: 'audio/sfx_letter_i.mp3',
    sfx_letter_j: 'audio/sfx_letter_j.mp3',
    sfx_letter_k: 'audio/sfx_letter_k.mp3',
    sfx_letter_l: 'audio/sfx_letter_l.mp3',
    sfx_letter_m: 'audio/sfx_letter_m.mp3',
    sfx_letter_n: 'audio/sfx_letter_n.mp3',
    sfx_letter_o: 'audio/sfx_letter_o.mp3',
    sfx_letter_p: 'audio/sfx_letter_p.mp3',
    sfx_letter_q: 'audio/sfx_letter_q.mp3',
    sfx_letter_r: 'audio/sfx_letter_r.mp3',
    sfx_letter_s: 'audio/sfx_letter_s.mp3',
    sfx_letter_t: 'audio/sfx_letter_t.mp3',
    sfx_letter_u: 'audio/sfx_letter_u.mp3',
    sfx_letter_v: 'audio/sfx_letter_v.mp3',
    sfx_letter_w: 'audio/sfx_letter_w.mp3',
    sfx_letter_x: 'audio/sfx_letter_x.mp3',
    sfx_letter_y: 'audio/sfx_letter_y.mp3',
    sfx_letter_z: 'audio/sfx_letter_z.mp3'
  };

  function getAudioContext() {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      try {
        audioCtx.resume();
      } catch (e) {}
    }
    return audioCtx;
  }

  var soundBuffers = {};
  var loadingBuffers = {};
  var currentBufferSource = null;
  var voicePool = [null, null];
  var voicePoolIdx = 0;
  var musicAudio = null;

  // On-demand audio buffer loading with callback queueing and deduplication
  function getOrLoadBuffer(key, callback) {
    if (soundBuffers[key]) {
      if (typeof callback === 'function') callback(soundBuffers[key]);
      return;
    }
    if (loadingBuffers[key]) {
      if (typeof callback === 'function') {
        loadingBuffers[key].push(callback);
      }
      return;
    }
    var url = audioFiles[key];
    if (!url) return;
    var ctx = getAudioContext();
    if (!ctx) return;

    loadingBuffers[key] = callback ? [callback] : [];

    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function() {
        if (xhr.status === 200 || xhr.status === 0) {
          ctx.decodeAudioData(xhr.response, function(buffer) {
            soundBuffers[key] = buffer;
            var cbs = loadingBuffers[key] || [];
            delete loadingBuffers[key];
            for (var i = 0; i < cbs.length; i++) {
              try { cbs[i](buffer); } catch (e) {}
            }
          }, function() {
            delete loadingBuffers[key];
          });
        } else {
          delete loadingBuffers[key];
        }
      };
      xhr.onerror = function() {
        delete loadingBuffers[key];
      };
      xhr.send();
    } catch (e) {
      delete loadingBuffers[key];
    }
  }

  // Preload an array of audio keys sequentially in small batches
  var themeAudioKeys = {
    animals: [
      'welcome', 'lion_phrase', 'elephant_phrase', 'monkey_phrase',
      'duck_phrase', 'frog_phrase', 'bear_phrase', 'rabbit_phrase',
      'cat_phrase', 'dog_phrase', 'panda_phrase', 'cow_phrase', 'sheep_phrase'
    ],
    fruits: [
      'fruit_apple', 'fruit_banana', 'fruit_orange', 'fruit_strawberry',
      'fruit_watermelon', 'fruit_carrot', 'fruit_milk', 'fruit_cookie',
      'fruit_grapes', 'fruit_corn', 'fruit_cheese', 'fruit_honey'
    ],
    vehicles: [
      'vehicle_car', 'vehicle_bus', 'vehicle_train', 'vehicle_airplane',
      'vehicle_boat', 'vehicle_bicycle', 'vehicle_firetruck', 'vehicle_helicopter'
    ],
    colors: [
      'color_red', 'color_blue', 'color_yellow', 'color_green', 'color_purple',
      'color_pink', 'color_orange', 'color_brown', 'color_white', 'color_black'
    ],
    feed: [
      'feed_prompt', 'feed_yum', 'feed_monkey_ask', 'feed_bear_ask',
      'feed_rabbit_ask', 'feed_cat_ask', 'feed_dog_ask', 'feed_panda_ask',
      'feed_elephant_ask', 'feed_duck_ask', 'praise_great', 'praise_yay'
    ],
    alphabet: [
      'song_abc',
      'theme_alphabet',
      'letter_phrase_a', 'letter_phrase_b', 'letter_phrase_c', 'letter_phrase_d',
      'letter_phrase_e', 'letter_phrase_f', 'letter_phrase_g', 'letter_phrase_h',
      'letter_phrase_i', 'letter_phrase_j', 'letter_phrase_k', 'letter_phrase_l',
      'letter_phrase_m', 'letter_phrase_n', 'letter_phrase_o', 'letter_phrase_p',
      'letter_phrase_q', 'letter_phrase_r', 'letter_phrase_s', 'letter_phrase_t',
      'letter_phrase_u', 'letter_phrase_v', 'letter_phrase_w', 'letter_phrase_x',
      'letter_phrase_y', 'letter_phrase_z',
      'sfx_letter_a', 'sfx_letter_b', 'sfx_letter_c', 'sfx_letter_d',
      'sfx_letter_e', 'sfx_letter_f', 'sfx_letter_g', 'sfx_letter_h',
      'sfx_letter_i', 'sfx_letter_j', 'sfx_letter_k', 'sfx_letter_l',
      'sfx_letter_m', 'sfx_letter_n', 'sfx_letter_o', 'sfx_letter_p',
      'sfx_letter_q', 'sfx_letter_r', 'sfx_letter_s', 'sfx_letter_t',
      'sfx_letter_u', 'sfx_letter_v', 'sfx_letter_w', 'sfx_letter_x',
      'sfx_letter_y', 'sfx_letter_z',
      'find_letter_a', 'find_letter_b', 'find_letter_c', 'find_letter_d',
      'find_letter_e', 'find_letter_f', 'find_letter_g', 'find_letter_h',
      'find_letter_i', 'find_letter_j', 'find_letter_k', 'find_letter_l',
      'find_letter_m', 'find_letter_n', 'find_letter_o', 'find_letter_p',
      'find_letter_q', 'find_letter_r', 'find_letter_s', 'find_letter_t',
      'find_letter_u', 'find_letter_v', 'find_letter_w', 'find_letter_x',
      'find_letter_y', 'find_letter_z',
      'praise_great', 'praise_yay', 'praise_super', 'praise_highfive'
    ]
  };

  function preloadTheme(themeName) {
    var keys = themeAudioKeys[themeName];
    if (!keys || !keys.length) return;
    var index = 0;
    function loadNext() {
      if (index >= keys.length) return;
      var k = keys[index++];
      getOrLoadBuffer(k, function() {
        setTimeout(loadNext, 35);
      });
    }
    loadNext();
  }

  // Lightweight 2-element voice pool for HTMLAudioElement fallback
  function initAudioTags() {
    try {
      if (!voicePool[0]) {
        voicePool[0] = new Audio();
        voicePool[0].preload = 'auto';
      }
      if (!voicePool[1]) {
        voicePool[1] = new Audio();
        voicePool[1].preload = 'auto';
      }
      if (!musicAudio) {
        musicAudio = new Audio();
        musicAudio.preload = 'auto';
      }
    } catch (err) {}
  }

  function getNextVoiceAudio() {
    initAudioTags();
    var a = voicePool[voicePoolIdx];
    voicePoolIdx = (voicePoolIdx + 1) % voicePool.length;
    return a;
  }

  // Unlock audio on iOS Safari on user gesture (Web Audio + HTMLAudio elements)
  function unlock() {
    var ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      try { ctx.resume(); } catch (e) {}
    }

    if (isUnlocked) return;

    if (ctx) {
      try {
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);
      } catch (e) {}
    }

    initAudioTags();
    isUnlocked = true;

    // Preload welcome, yum, and essential sounds
    getOrLoadBuffer('welcome');
    getOrLoadBuffer('feed_yum');
    getOrLoadBuffer('praise_great');
  }

  // Global touch capture to wake up AudioContext on ANY screen tap
  if (typeof window !== 'undefined') {
    var wakeAudio = function() {
      unlock();
      var c = getAudioContext();
      if (c && c.state === 'suspended') {
        try { c.resume(); } catch (e) {}
      }
    };
    window.addEventListener('touchstart', wakeAudio, { capture: true, passive: true });
    window.addEventListener('touchend', wakeAudio, { capture: true, passive: true });
    window.addEventListener('click', wakeAudio, { capture: true, passive: true });
  }

  var currentVoiceCallback = null;

  // Immediately terminate any active voice playback, reading, or song
  function stopVoice() {
    currentVoiceCallback = null;

    // 1. Web Audio buffer source: clear callback first, then stop and disconnect
    if (currentBufferSource) {
      try {
        currentBufferSource.onended = null;
        currentBufferSource.stop(0);
        currentBufferSource.disconnect();
      } catch (e) {}
      currentBufferSource = null;
    }

    // 2. Immediately pause and reset all HTMLAudio elements in the voice pool
    for (var i = 0; i < voicePool.length; i++) {
      var tag = voicePool[i];
      if (tag) {
        try {
          tag.onended = null;
          tag.pause();
          tag.currentTime = 0;
        } catch (e) {}
      }
    }

    // 3. Immediately pause and reset song/music audio
    if (musicAudio) {
      try {
        musicAudio.onended = null;
        musicAudio.pause();
        musicAudio.currentTime = 0;
      } catch (e) {}
    }

    // 4. Cancel any ongoing SpeechSynthesis
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // Instantly silence all active speech, music, synthesized notes, and buffers
  function stopAll() {
    stopVoice();
  }

  function pauseAll() {
    stopVoice();
  }

  // Play pre-recorded American English audio or nursery rhyme
  function playClip(key, onEnded) {
    try {
      unlock();

      // ALWAYS terminate any ongoing reading, voice, or song immediately!
      stopVoice();

      var ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        try { ctx.resume(); } catch (e) {}
      }

      // Check if this is a nursery rhyme song
      var isSong = key && key.indexOf('song_') === 0;

      if (isSong) {
        var songUrl = audioFiles[key];
        if (!songUrl) {
          if (typeof onEnded === 'function') onEnded();
          return;
        }

        if (!musicAudio) {
          musicAudio = new Audio();
        }

        currentVoiceCallback = onEnded;

        try {
          if (musicAudio.src && musicAudio.src.indexOf(songUrl) !== -1) {
            if (musicAudio.readyState >= 1) {
              musicAudio.currentTime = 0;
            }
          } else {
            musicAudio.src = songUrl;
          }
        } catch (e) {}

        musicAudio.onended = function() {
          var cb = currentVoiceCallback;
          currentVoiceCallback = null;
          if (typeof cb === 'function') {
            cb();
          }
        };

        var playPromise = musicAudio.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function(err) {
            if (err && err.name === 'AbortError') return;
            console.warn('Music play failed:', err);
          });
        }
        return;
      }

      currentVoiceCallback = onEnded;

      // 1. Instant zero-latency Web Audio playback if buffer is ready
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
            var cb = currentVoiceCallback;
            currentVoiceCallback = null;
            if (typeof cb === 'function') {
              cb();
            }
          };

          bSource.start(0);
          return;
        } catch (err) {
          console.warn('Buffer playback failed, using audio tag fallback', err);
        }
      }

      // 2. Play via audio tag pool while fetching buffer for next time
      var voiceUrl = audioFiles[key];
      if (voiceUrl) {
        var audioTag = getNextVoiceAudio();
        if (audioTag) {
          try {
            if (audioTag.src && audioTag.src.indexOf(voiceUrl) !== -1) {
              if (audioTag.readyState >= 1) {
                audioTag.currentTime = 0;
              }
            } else {
              audioTag.src = voiceUrl;
            }

            audioTag.onended = function() {
              var cb = currentVoiceCallback;
              currentVoiceCallback = null;
              if (typeof cb === 'function') {
                cb();
              }
            };

            var p = audioTag.play();
            if (p && p.catch) {
              p.catch(function(err) {
                if (err && (err.name === 'AbortError' || err.name === 'NotAllowedError')) return; // User tapped another card, do not clobber
                fallbackSpeech(key, onEnded);
              });
            }
          } catch (errPlay) {
            fallbackSpeech(key, onEnded);
          }
        } else {
          fallbackSpeech(key, onEnded);
        }

        // Cache buffer lazily for subsequent instant playback
        getOrLoadBuffer(key);
      } else {
        fallbackSpeech(key, onEnded);
      }
    } catch (outerErr) {
      console.warn('playClip fatal error intercepted safely:', outerErr);
      if (typeof onEnded === 'function') {
        try { onEnded(); } catch (e) {}
      }
    }
  }

  // Fallback to SpeechSynthesis with explicit en-US voice
  function fallbackSpeech(textOrKey, onEnded) {
    if (!('speechSynthesis' in window)) {
      if (typeof onEnded === 'function') onEnded();
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch (e) {}

    currentVoiceCallback = onEnded;

    var text = textOrKey;
    // Comprehensive text map for all content items
    var textMap = {
      // 🦁 Animals
      lion_phrase: "Lion! L is for Lion. Roar!",
      elephant_phrase: "Elephant! E is for Elephant. Pawoo!",
      monkey_phrase: "Monkey! M is for Monkey. Ooh ooh aah aah!",
      duck_phrase: "Duck! D is for Duck. Quack quack quack!",
      frog_phrase: "Frog! F is for Frog. Ribbit ribbit!",
      bear_phrase: "Bear! B is for Bear. Big warm hug!",
      rabbit_phrase: "Rabbit! R is for Rabbit. Hop hop hop!",
      cat_phrase: "Cat! C is for Cat. Meow meow!",
      dog_phrase: "Dog! D is for Dog. Woof woof!",
      panda_phrase: "Panda! P is for Panda. Crunch crunch bamboo!",
      cow_phrase: "Cow! C is for Cow. Moo moo!",
      sheep_phrase: "Sheep! S is for Sheep. Baa baa!",

      word_lion: "Lion",
      word_elephant: "Elephant",
      word_monkey: "Monkey",
      word_duck: "Duck",
      word_frog: "Frog",
      word_bear: "Bear",
      word_rabbit: "Rabbit",
      word_cat: "Cat",
      word_dog: "Dog",
      word_panda: "Panda",
      word_cow: "Cow",
      word_sheep: "Sheep",

      // 🍎 Foods
      fruit_apple: "Apple! Sweet red apple!",
      fruit_banana: "Banana! Yummy yellow banana!",
      fruit_orange: "Orange! Juicy orange!",
      fruit_strawberry: "Strawberry! Berry berry sweet!",
      fruit_watermelon: "Watermelon! Fresh and cool!",
      fruit_carrot: "Carrot! Crunchy orange carrot!",
      fruit_milk: "Milk! Healthy white milk!",
      fruit_cookie: "Cookie! Delicious chocolate cookie!",
      fruit_grapes: "Grapes! Sweet purple grapes!",
      fruit_corn: "Corn! Golden sweet corn!",
      fruit_cheese: "Cheese! Tasty yellow cheese!",
      fruit_honey: "Honey! Sweet golden honey!",
      fruit_fish: "Fish! Fresh little fish!",
      fruit_bone: "Bone! Crunchy tasty bone!",
      fruit_bamboo: "Bamboo! Fresh green bamboo!",

      // 🚗 Vehicles
      vehicle_car: "Car! Beep beep! Let's go for a ride!",
      vehicle_bus: "Bus! The wheels on the bus go round and round!",
      vehicle_train: "Train! Choo choo! All aboard!",
      vehicle_airplane: "Airplane! Flying high in the sky! Whoosh!",
      vehicle_boat: "Boat! Floating on the gentle water! Splish splash!",
      vehicle_bicycle: "Bicycle! Ring ring! Happy pedals go round!",
      vehicle_firetruck: "Fire Truck! Wee woo wee woo! Brave and fast!",
      vehicle_helicopter: "Helicopter! Chop chop chop! Flying up so high!",

      // 🎨 Colors
      color_red: "Red! Bright red apple!",
      color_blue: "Blue! Ocean blue!",
      color_yellow: "Yellow! Sunny yellow!",
      color_green: "Green! Green grass!",
      color_purple: "Purple! Royal purple!",
      color_pink: "Pink! Pretty pink flower!",
      color_orange: "Orange! Bright orange!",
      color_brown: "Brown! Teddy bear brown!",
      color_white: "White! Puffy white cloud!",
      color_black: "Black! Shiny black night!",

      // 🍼 Feed Friends
      feed_prompt: "Feed the hungry animal friends!",
      feed_yum: "Yummy! Nom nom nom! Thank you!",
      feed_monkey_ask: "Milo wants a yellow banana!",
      feed_bear_ask: "Barnaby wants sweet honey!",
      feed_rabbit_ask: "Bunny wants a crunchy carrot!",
      feed_cat_ask: "Cleo wants a tasty fish!",
      feed_dog_ask: "Buster wants a crunchy bone!",
      feed_panda_ask: "Panpan wants green bamboo!",
      feed_elephant_ask: "Ellie wants juicy watermelon!",
      feed_duck_ask: "Ducky wants sweet golden corn!",

      // Nature, Prompts & Modes
      sun: "Sunny day! Good morning, sun!",
      cloud: "Puffy cloud! Floating in the sky!",
      flower: "Pretty flower! Bloom bloom bloom!",
      rainbow: "Look! A beautiful rainbow!",
      butterfly: "Butterfly! Flutter flutter by!",
      praise_great: "Great job! You found it!",
      praise_yay: "Yay! Awesome work!",
      praise_super: "You are a superstar!",
      praise_highfive: "High five! Woohoo!",
      welcome: "Welcome to Toddler Safari! Tap any friend to play!",
      pause_take_break: "Time for a break! Rest your eyes and have some water.",
      pause_resume: "Welcome back! Let's play!",

      // 🔤 Alphabet A-Z Phonics & Prompts
      theme_alphabet: "Let's learn the ABC alphabet!",
      letter_phrase_a: "A! A says ah, ah, Apple!",
      letter_phrase_b: "B! B says buh, buh, Bear!",
      letter_phrase_c: "C! C says kuh, kuh, Cat!",
      letter_phrase_d: "D! D says duh, duh, Duck!",
      letter_phrase_e: "E! E says eh, eh, Elephant!",
      letter_phrase_f: "F! F says fff, fff, Frog!",
      letter_phrase_g: "G! G says guh, guh, Grapes!",
      letter_phrase_h: "H! H says huh, huh, Honey!",
      letter_phrase_i: "I! I says ih, ih, Igloo!",
      letter_phrase_j: "J! J says juh, juh, Jellyfish!",
      letter_phrase_k: "K! K says kuh, kuh, Kangaroo!",
      letter_phrase_l: "L! L says lll, lll, Lion!",
      letter_phrase_m: "M! M says mmm, mmm, Monkey!",
      letter_phrase_n: "N! N says nnn, nnn, Nest!",
      letter_phrase_o: "O! O says ah, ah, Orange!",
      letter_phrase_p: "P! P says puh, puh, Panda!",
      letter_phrase_q: "Q! Q says kwuh, kwuh, Queen!",
      letter_phrase_r: "R! R says rrr, rrr, Rabbit!",
      letter_phrase_s: "S! S says sss, sss, Sun!",
      letter_phrase_t: "T! T says tuh, tuh, Train!",
      letter_phrase_u: "U! U says uh, uh, Umbrella!",
      letter_phrase_v: "V! V says vvv, vvv, Van!",
      letter_phrase_w: "W! W says wuh, wuh, Watermelon!",
      letter_phrase_x: "X! X says ks, ks, Xylophone!",
      letter_phrase_y: "Y! Y says yuh, yuh, Yo-yo!",
      letter_phrase_z: "Z! Z says zzz, zzz, Zebra!",

      find_letter_a: "Can you find the letter A?",
      find_letter_b: "Can you find the letter B?",
      find_letter_c: "Can you find the letter C?",
      find_letter_d: "Can you find the letter D?",
      find_letter_e: "Can you find the letter E?",
      find_letter_f: "Can you find the letter F?",
      find_letter_g: "Can you find the letter G?",
      find_letter_h: "Can you find the letter H?",
      find_letter_i: "Can you find the letter I?",
      find_letter_j: "Can you find the letter J?",
      find_letter_k: "Can you find the letter K?",
      find_letter_l: "Can you find the letter L?",
      find_letter_m: "Can you find the letter M?",
      find_letter_n: "Can you find the letter N?",
      find_letter_o: "Can you find the letter O?",
      find_letter_p: "Can you find the letter P?",
      find_letter_q: "Can you find the letter Q?",
      find_letter_r: "Can you find the letter R?",
      find_letter_s: "Can you find the letter S?",
      find_letter_t: "Can you find the letter T?",
      find_letter_u: "Can you find the letter U?",
      find_letter_v: "Can you find the letter V?",
      find_letter_w: "Can you find the letter W?",
      find_letter_x: "Can you find the letter X?",
      find_letter_y: "Can you find the letter Y?",
      find_letter_z: "Can you find the letter Z?"
    };

    if (textMap[textOrKey]) {
      text = textMap[textOrKey];
    }

    try {
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Pleasant, articulated speed for 2-3 yo
      utterance.pitch = 1.1; // Cheerful, friendly tone

      var voices = window.speechSynthesis.getVoices();
      for (var i = 0; i < voices.length; i++) {
        var v = voices[i];
        if (v.lang === 'en-US' && (v.name === 'Samantha' || v.name === 'Ava' || v.name === 'Alex' || v.name === 'Victoria')) {
          utterance.voice = v;
          break;
        }
      }

      utterance.onend = function() {
        var cb = currentVoiceCallback;
        currentVoiceCallback = null;
        if (typeof cb === 'function') {
          cb();
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      if (typeof onEnded === 'function') onEnded();
    }
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

  // 🔤 Interactive sound effects for 26 alphabet items (Studio-grade American audio)
  function playAlphabetObjectSFX(id, onEnded) {
    if (!id) return;
    var letter = id.toLowerCase().replace('letter_', '').trim();
    var sfxKey = 'sfx_letter_' + letter;
    stopVoice();
    if (audioFiles[sfxKey]) {
      playClip(sfxKey, onEnded);
    } else {
      playPop();
      if (typeof onEnded === 'function') onEnded();
    }
  }

  // Satisfying wooden badge stamp sound
  function playStampSound() {
    var ctx = getAudioContext();
    if (!ctx) return;
    var now = ctx.currentTime;
    try {
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(260, now);
      osc1.frequency.exponentialRampToValueAtTime(60, now + 0.12);
      gain1.gain.setValueAtTime(0.45, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      setTimeout(function() {
        playChime(1046.50);
      }, 70);
    } catch (e) {}
  }

  // 💧 Water droplet splash sound
  function playSplashSound() {
    stopVoice();
    playClip('sfx_splash');
  }

  // 🌙 Gentle Music Box Lullaby (Twinkle Twinkle style)
  function playLullabyMelody() {
    var ctx = getAudioContext();
    if (!ctx) return;
    var melody = [
      { f: 523.25, d: 350 }, { f: 523.25, d: 350 },
      { f: 783.99, d: 350 }, { f: 783.99, d: 350 },
      { f: 880.00, d: 350 }, { f: 880.00, d: 350 },
      { f: 783.99, d: 700 }
    ];
    var delay = 0;
    for (var i = 0; i < melody.length; i++) {
      (function(note, t) {
        setTimeout(function() {
          var now = ctx.currentTime;
          var osc = ctx.createOscillator();
          var gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, now);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + (note.d / 1000));
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + (note.d / 1000));
        }, t);
      })(melody[i], delay);
      delay += melody[i].d + 60;
    }
  }

  return {
    unlock: unlock,
    playClip: playClip,
    preloadTheme: preloadTheme,
    preloadClip: getOrLoadBuffer,
    playPop: playPop,
    playChime: playChime,
    playBoing: playBoing,
    playSparkle: playSparkle,
    playFanfare: playFanfare,
    playSplashSound: playSplashSound,
    playLullabyMelody: playLullabyMelody,
    playAnimalSFX: playAnimalSFX,
    playAlphabetObjectSFX: playAlphabetObjectSFX,
    playStampSound: playStampSound,
    speak: fallbackSpeech,
    stopVoice: stopVoice,
    pauseAll: pauseAll,
    stopAll: stopAll
  };
})();
