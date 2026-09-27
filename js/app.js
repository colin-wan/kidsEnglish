/**
 * Toddler Safari - Multi-Theme Enlightenment Logic
 * Designed for Toddlers (2-3 yo) & iOS 12.5.8 Safari iPad
 * - Standard American English pronunciation
 * - Multi-Themes: Animals, Fruits, Vehicles, Colors, Feed Friends, Sing Songs
 * - No ES2020 syntax (no ?., no ??)
 */

var App = (function() {
  var currentTheme = 'animals'; // 'animals' | 'fruits' | 'vehicles' | 'colors' | 'feed' | 'songs'
  var currentMode = 'explore';  // 'explore' | 'find' | 'bubbles'
  var stars = 0;
  var targetItem = null;
  var bubbleSpawnTimer = null;
  var tapCounters = {};
  var speechTimeout = null;
  var currentFeedingAnimal = null;

  // DOM Elements
  var playgroundEl;
  var starCountEl;
  var promptBannerEl;
  var promptTextEl;
  var promptIconEl;
  var splashOverlayEl;
  var modeExploreBtn;
  var modeFindBtn;
  var modeBubblesBtn;
  var themeNavEl;

  function init() {
    playgroundEl = document.getElementById('playground');
    starCountEl = document.getElementById('star-count');
    promptBannerEl = document.getElementById('prompt-banner');
    promptTextEl = document.getElementById('prompt-text');
    promptIconEl = document.getElementById('prompt-icon');
    splashOverlayEl = document.getElementById('splash-overlay');
    modeExploreBtn = document.getElementById('mode-explore');
    modeFindBtn = document.getElementById('mode-find');
    modeBubblesBtn = document.getElementById('mode-bubbles');
    themeNavEl = document.getElementById('theme-nav');

    // Initialize Canvas Particle System
    var canvasEl = document.getElementById('particles-canvas');
    if (canvasEl && typeof ParticleSystem !== 'undefined') {
      ParticleSystem.init(canvasEl);
    }

    renderCurrentTheme();
    bindEvents();
  }

  // Universal click & touch listener (rock-solid on Mac & iPad)
  function attachTouchOrClick(element, handler) {
    if (!element) return;
    var lastTrigger = 0;
    var onTrigger = function(e) {
      var now = Date.now();
      if (now - lastTrigger < 250) return;
      lastTrigger = now;
      handler(e);
    };

    element.addEventListener('click', onTrigger, false);
    element.addEventListener('pointerup', onTrigger, false);
    element.addEventListener('touchend', function(e) {
      if (e.cancelable) e.preventDefault();
      onTrigger(e);
    }, false);
  }

  function bindEvents() {
    // Splash screen click dismissal
    var startBtn = document.getElementById('start-btn');
    if (startBtn) {
      attachTouchOrClick(startBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        startApp();
      });
    }
    if (splashOverlayEl) {
      attachTouchOrClick(splashOverlayEl, function() {
        startApp();
      });
    }

    // Theme Pills
    var themePills = document.querySelectorAll('.theme-pill');
    for (var t = 0; t < themePills.length; t++) {
      (function(pill) {
        attachTouchOrClick(pill, function() {
          var theme = pill.getAttribute('data-theme');
          setTheme(theme);
        });
      })(themePills[t]);
    }

    // Mode Buttons
    if (modeExploreBtn) {
      attachTouchOrClick(modeExploreBtn, function() {
        setMode('explore');
      });
    }
    if (modeFindBtn) {
      attachTouchOrClick(modeFindBtn, function() {
        setMode('find');
      });
    }
    if (modeBubblesBtn) {
      attachTouchOrClick(modeBubblesBtn, function() {
        setMode('bubbles');
      });
    }

    // Scenery: Sun, Clouds, Singing Flowers
    var sunEl = document.getElementById('sun-item');
    if (sunEl) attachTouchOrClick(sunEl, triggerSun);

    var cloud1 = document.getElementById('cloud-1');
    var cloud2 = document.getElementById('cloud-2');
    if (cloud1) attachTouchOrClick(cloud1, triggerCloud);
    if (cloud2) attachTouchOrClick(cloud2, triggerCloud);

    var flowers = document.querySelectorAll('.flower-touchable');
    var flowerNotes = [523.25, 587.33, 659.25, 783.99, 880.00];
    for (var f = 0; f < flowers.length; f++) {
      (function(idx) {
        attachTouchOrClick(flowers[idx], function(e) {
          triggerFlower(flowers[idx], flowerNotes[idx % flowerNotes.length], e);
        });
      })(f);
    }

    // Repeat Prompt Banner
    if (promptBannerEl) {
      attachTouchOrClick(promptBannerEl, function() {
        repeatPrompt();
      });
    }

    // Bubble Taps
    var containerEl = document.getElementById('app-container');
    if (containerEl) {
      var handleContainerTap = function(e) {
        if (currentMode !== 'bubbles') return;
        var clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
        var clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
        if (clientX === undefined || clientY === undefined) return;

        var hitBubble = ParticleSystem.checkBubbleTap(clientX, clientY);
        if (hitBubble) {
          AudioEngine.playPop();
          AudioEngine.playChime(659.25);
          addStar(1);

          if (hitBubble.key) {
            AudioEngine.playClip(hitBubble.key);
          }
        }
      };

      containerEl.addEventListener('click', handleContainerTap, false);
      containerEl.addEventListener('touchend', handleContainerTap, false);
    }
  }

  // ==========================================
  // THEME SWITCHING & RENDERING
  // ==========================================
  function setTheme(theme) {
    currentTheme = theme;
    targetItem = null;

    // Update active theme pills
    var pills = document.querySelectorAll('.theme-pill');
    for (var i = 0; i < pills.length; i++) {
      if (pills[i].getAttribute('data-theme') === theme) {
        pills[i].className = 'theme-pill active';
      } else {
        pills[i].className = 'theme-pill';
      }
    }

    AudioEngine.playChime(783.99);
    renderCurrentTheme();

    if (currentMode === 'find') {
      pickNextTarget();
    } else if (currentMode === 'bubbles') {
      startBubbleSpawner();
    }
  }

  function renderCurrentTheme() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = '';

    if (currentTheme === 'animals') {
      renderStandardGrid(ContentData.animals, '🦁');
      showPrompt("Tap the animals to explore!", "🦁");
    } else if (currentTheme === 'fruits') {
      renderStandardGrid(ContentData.fruits, '🍎');
      showPrompt("Yummy fruits and food! Tap to taste!", "🍎");
    } else if (currentTheme === 'vehicles') {
      renderStandardGrid(ContentData.vehicles, '🚗');
      showPrompt("Things with wheels! Beep beep!", "🚗");
    } else if (currentTheme === 'colors') {
      renderColorsGrid();
      showPrompt("Rainbow colors! Tap to splash!", "🎨");
    } else if (currentTheme === 'feed') {
      renderFeedingStage();
      showPrompt("Feed the hungry animal friends!", "🍼");
      AudioEngine.playClip('feed_prompt');
    } else if (currentTheme === 'songs') {
      renderSongsGrid();
      showPrompt("Sing along to classic nursery rhymes!", "🎵");
    }
  }

  // Render Standard Card Grid (Animals, Fruits, Vehicles)
  function renderStandardGrid(items, defaultEmoji) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      tapCounters[item.id] = 0;

      var pod = document.createElement('div');
      pod.className = 'animal-pod';
      pod.id = 'pod-' + item.id;
      pod.setAttribute('data-id', item.id);

      pod.innerHTML = (
        '<div class="letter-badge" style="background-color:' + (item.color || '#FF5722') + '">' + item.letter + '</div>' +
        '<div class="animal-svg-box">' + item.svg + '</div>' +
        '<div class="animal-name-tag">' + item.name + '</div>' +
        '<div class="speech-bubble" id="speech-' + item.id + '" style="display:none;"></div>'
      );

      attachTouchOrClick(pod, (function(obj) {
        return function(e) {
          handleItemTap(obj, e);
        };
      })(item));

      playgroundEl.appendChild(pod);
    }
  }

  // Render Colors Grid
  function renderColorsGrid() {
    var colors = ContentData.colors;
    for (var i = 0; i < colors.length; i++) {
      var c = colors[i];
      var pod = document.createElement('div');
      pod.className = 'animal-pod';
      pod.id = 'pod-' + c.id;

      pod.innerHTML = (
        '<div class="color-splash-box" style="background-color:' + c.hex + '">' + c.bubbleEmoji + '</div>' +
        '<div class="animal-name-tag" style="color:' + c.hex + '">' + c.name + '</div>' +
        '<div class="speech-bubble" id="speech-' + c.id + '" style="display:none;"></div>'
      );

      attachTouchOrClick(pod, (function(colorItem) {
        return function(e) {
          handleColorTap(colorItem, e);
        };
      })(c));

      playgroundEl.appendChild(pod);
    }
  }

  // Render Feeding Mini-Game
  var currentFeedingIndex = 0;
  var isFeeding = false;
  var hungryAnimals = [
    { id: 'monkey', name: 'Milo', askClip: 'feed_monkey_ask', targetFood: 'banana', prompt: 'Milo wants a banana! 🍌', emoji: '🐒' },
    { id: 'bear', name: 'Barnaby', askClip: 'feed_bear_ask', targetFood: 'honey', prompt: 'Barnaby wants sweet honey! 🍯', emoji: '🐻' },
    { id: 'rabbit', name: 'Bunny', askClip: 'feed_rabbit_ask', targetFood: 'carrot', prompt: 'Bunny wants a carrot! 🥕', emoji: '🐰' }
  ];

  function renderFeedingStage() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = ''; // CRITICAL: Clear previous stage content!

    isFeeding = false;
    currentFeedingAnimal = hungryAnimals[currentFeedingIndex % hungryAnimals.length];

    var stage = document.createElement('div');
    stage.className = 'feeding-stage';

    stage.innerHTML = (
      '<div id="hungry-box" class="hungry-character-box">' +
        '<span style="font-size: 80px;">' + currentFeedingAnimal.emoji + '</span>' +
      '</div>' +
      '<div class="prompt-banner" style="position:static; transform:none; margin: 10px 0;">' +
        '<span>' + currentFeedingAnimal.prompt + '</span>' +
      '</div>' +
      '<div class="food-tray">' +
        '<div class="food-item" data-food="banana">' +
          '<span class="food-item-icon">🍌</span>' +
          '<span class="food-item-name">Banana</span>' +
        '</div>' +
        '<div class="food-item" data-food="honey">' +
          '<span class="food-item-icon">🍯</span>' +
          '<span class="food-item-name">Honey</span>' +
        '</div>' +
        '<div class="food-item" data-food="carrot">' +
          '<span class="food-item-icon">🥕</span>' +
          '<span class="food-item-name">Carrot</span>' +
        '</div>' +
      '</div>'
    );

    playgroundEl.appendChild(stage);

    // Audio hint
    setTimeout(function() {
      if (currentFeedingAnimal && currentFeedingAnimal.askClip) {
        AudioEngine.playClip(currentFeedingAnimal.askClip);
      }
    }, 350);

    // Attach food item handlers
    var foodButtons = stage.querySelectorAll('.food-item');
    for (var i = 0; i < foodButtons.length; i++) {
      (function(btn) {
        attachTouchOrClick(btn, function(e) {
          var chosen = btn.getAttribute('data-food');
          handleFoodFeed(chosen, btn);
        });
      })(foodButtons[i]);
    }
  }

  function handleFoodFeed(foodName, btn) {
    if (!currentFeedingAnimal || isFeeding) return;
    var rect = btn.getBoundingClientRect();
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 14);

    var hungryBox = document.getElementById('hungry-box');

    if (foodName === currentFeedingAnimal.targetFood) {
      // SUCCESS: Animal eats food!
      isFeeding = true;
      if (hungryBox) hungryBox.classList.add('chewing');
      AudioEngine.playFanfare();
      AudioEngine.playClip('feed_yum');
      addStar(3);

      // AUTOMATIC PROGRESSION: guaranteed advance to next animal after chewing
      setTimeout(function() {
        if (hungryBox) hungryBox.classList.remove('chewing');
        AudioEngine.playClip('praise_great');

        setTimeout(function() {
          currentFeedingIndex = (currentFeedingIndex + 1) % hungryAnimals.length;
          renderFeedingStage(); // Flip to next hungry animal!
        }, 900);
      }, 1500);
    } else {
      // Gentle friendly hint
      AudioEngine.playBoing();
      AudioEngine.playClip(currentFeedingAnimal.askClip);
    }
  }

  // Render Nursery Rhymes Jukebox
  function renderSongsGrid() {
    var songs = ContentData.songs;
    var grid = document.createElement('div');
    grid.className = 'songs-grid';

    for (var i = 0; i < songs.length; i++) {
      var song = songs[i];
      var card = document.createElement('div');
      card.className = 'song-card';
      card.id = 'song-' + song.id;

      card.innerHTML = (
        '<span class="song-icon">' + song.icon + '</span>' +
        '<span class="song-title">' + song.title + '</span>' +
        '<span class="song-badge">▶ Sing Along</span>'
      );

      attachTouchOrClick(card, (function(s, cardEl) {
        return function() {
          handleSongPlay(s, cardEl);
        };
      })(song, card));

      grid.appendChild(card);
    }

    playgroundEl.appendChild(grid);
  }

  function handleSongPlay(song, cardEl) {
    var allCards = document.querySelectorAll('.song-card');
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].classList.remove('playing');
    }

    cardEl.classList.add('playing');
    var rect = cardEl.getBoundingClientRect();
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);

    showPrompt(song.title, song.icon);
    AudioEngine.playSparkle();

    // Play melody notes synthesized then neural sung phrase
    AudioEngine.playClip(song.phraseKey, function() {
      cardEl.classList.remove('playing');
    });

    addStar(2);
  }

  // ==========================================
  // TAP & INTERACTION HANDLING
  // ==========================================
  function handleItemTap(item, event) {
    var pod = document.getElementById('pod-' + item.id);
    var rect = pod ? pod.getBoundingClientRect() : { left: 100, top: 100, width: 80, height: 80 };
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    ParticleSystem.burst(cx, cy, 14);

    if (currentMode === 'find') {
      handleFindModeTap(item, pod, cx, cy);
    } else {
      // Explore Mode
      tapCounters[item.id] = (tapCounters[item.id] || 0) + 1;
      var count = tapCounters[item.id];

      if (pod) {
        pod.classList.remove('anim-jump', 'anim-wobble');
        void pod.offsetWidth;
        pod.classList.add(count % 2 === 1 ? 'anim-jump' : 'anim-wobble');
      }

      showSpeech(item.id, item.name + "! " + (item.tagline || ''));

      // Play Phrase with gentle neural voice
      if (item.phraseKey) {
        AudioEngine.playClip(item.phraseKey);
      }
      AudioEngine.playChime(659.25);
      addStar(1);
    }
  }

  function handleColorTap(colorItem, event) {
    var pod = document.getElementById('pod-' + colorItem.id);
    if (pod) {
      pod.classList.remove('anim-jump');
      void pod.offsetWidth;
      pod.classList.add('anim-jump');
    }

    var rect = pod ? pod.getBoundingClientRect() : { left: 100, top: 100, width: 80, height: 80 };
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);

    showSpeech(colorItem.id, colorItem.name + "! " + colorItem.bubbleEmoji);
    AudioEngine.playClip(colorItem.phraseKey);
    AudioEngine.playChime(783.99);
    addStar(1);
  }

  function handleFindModeTap(item, pod, cx, cy) {
    if (!targetItem) return;

    if (item.id === targetItem.id) {
      AudioEngine.playFanfare();
      ParticleSystem.burst(cx, cy, 24);
      addStar(3);

      if (pod) {
        pod.classList.remove('anim-jump');
        void pod.offsetWidth;
        pod.classList.add('anim-jump');
      }

      showSpeech(item.id, "You found me! ⭐⭐⭐");

      var praises = ['praise_great', 'praise_yay', 'praise_super', 'praise_highfive'];
      var praiseClip = praises[Math.floor(Math.random() * praises.length)];
      setTimeout(function() {
        AudioEngine.playClip(praiseClip, function() {
          setTimeout(pickNextTarget, 600);
        });
      }, 300);
    } else {
      AudioEngine.playBoing();
      showSpeech(item.id, "I am " + item.name + "!");
      if (item.phraseKey) {
        AudioEngine.playClip(item.phraseKey, function() {
          setTimeout(repeatPrompt, 400);
        });
      }
    }
  }

  function getCurrentThemeItems() {
    if (currentTheme === 'animals') return ContentData.animals;
    if (currentTheme === 'fruits') return ContentData.fruits;
    if (currentTheme === 'vehicles') return ContentData.vehicles;
    if (currentTheme === 'colors') return ContentData.colors;
    return ContentData.animals;
  }

  function pickNextTarget() {
    if (currentMode !== 'find') return;
    var list = getCurrentThemeItems();
    if (!list || list.length === 0) return;

    var next;
    do {
      next = list[Math.floor(Math.random() * list.length)];
    } while (list.length > 1 && targetItem && next.id === targetItem.id);

    targetItem = next;
    showPrompt("Can you find the " + targetItem.name + "?", targetItem.bubbleEmoji);

    // Play prompt clip if exists, otherwise announce word
    if (targetItem.promptKey) {
      AudioEngine.playClip(targetItem.promptKey);
    } else if (targetItem.phraseKey) {
      AudioEngine.playClip(targetItem.phraseKey);
    }
  }

  function repeatPrompt() {
    if (currentMode === 'find' && targetItem) {
      if (targetItem.promptKey) {
        AudioEngine.playClip(targetItem.promptKey);
      } else if (targetItem.phraseKey) {
        AudioEngine.playClip(targetItem.phraseKey);
      }
    }
  }

  function showPrompt(text, icon) {
    if (promptBannerEl) promptBannerEl.classList.remove('hidden');
    if (promptTextEl) promptTextEl.innerText = text;
    if (promptIconEl && icon) promptIconEl.innerText = icon;
  }

  function showSpeech(id, text) {
    var bubble = document.getElementById('speech-' + id);
    if (!bubble) return;
    bubble.innerText = text;
    bubble.style.display = 'block';

    if (speechTimeout) clearTimeout(speechTimeout);
    speechTimeout = setTimeout(function() {
      bubble.style.display = 'none';
    }, 2800);
  }

  function setMode(mode) {
    currentMode = mode;
    clearInterval(bubbleSpawnTimer);
    bubbleSpawnTimer = null;
    ParticleSystem.clearBubbles();

    if (modeExploreBtn) modeExploreBtn.className = 'mode-btn' + (mode === 'explore' ? ' active' : '');
    if (modeFindBtn) modeFindBtn.className = 'mode-btn' + (mode === 'find' ? ' active' : '');
    if (modeBubblesBtn) modeBubblesBtn.className = 'mode-btn' + (mode === 'bubbles' ? ' active' : '');

    if (mode === 'explore') {
      AudioEngine.playClip('mode_explore');
      showPrompt("Tap any item to explore!", "🌟");
    } else if (mode === 'find') {
      AudioEngine.playClip('mode_find', function() {
        pickNextTarget();
      });
      showPrompt("Listen and find it!", "❓");
    } else if (mode === 'bubbles') {
      AudioEngine.playClip('mode_bubbles');
      showPrompt("Pop the bubbles! Pop pop pop!", "🫧");
      startBubbleSpawner();
    }
  }

  function startBubbleSpawner() {
    spawnNextBubble();
    bubbleSpawnTimer = setInterval(spawnNextBubble, 1400);
  }

  function spawnNextBubble() {
    if (currentMode !== 'bubbles') return;
    var list = getCurrentThemeItems();
    var randomObj = list[Math.floor(Math.random() * list.length)];

    ParticleSystem.spawnBubble({
      letter: randomObj.letter || '',
      emoji: randomObj.bubbleEmoji || '⭐',
      word: randomObj.name || '',
      key: randomObj.phraseKey || ''
    });
  }

  function addStar(count) {
    stars += count;
    if (starCountEl) {
      starCountEl.innerText = stars;
      starCountEl.style.transform = 'scale(1.35)';
      setTimeout(function() {
        starCountEl.style.transform = 'scale(1)';
      }, 200);
    }
  }

  function triggerSun(e) {
    var sun = document.getElementById('sun-item');
    if (sun) {
      var rect = sun.getBoundingClientRect();
      ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
    }
    AudioEngine.playChime(783.99);
    AudioEngine.playClip('sun');
    addStar(1);
  }

  function triggerCloud() {
    AudioEngine.playBoing();
    AudioEngine.playClip('cloud');
    addStar(1);
  }

  function triggerFlower(element, noteFreq, event) {
    var rect = element.getBoundingClientRect();
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + 10, 8);
    AudioEngine.playChime(noteFreq);
    addStar(1);
  }

  function startApp() {
    try {
      AudioEngine.unlock();
      AudioEngine.playSparkle();
    } catch (err) {}

    if (splashOverlayEl) {
      splashOverlayEl.classList.add('fade-out');
      setTimeout(function() {
        splashOverlayEl.style.display = 'none';
      }, 400);
    }

    setTimeout(function() {
      try {
        AudioEngine.playClip('welcome', function() {
          showPrompt("Tap any item to explore!", "🦁");
        });
      } catch (err2) {
        showPrompt("Tap any item to explore!", "🦁");
      }
    }, 400);
  }

  return {
    init: init,
    startApp: startApp,
    setTheme: setTheme,
    setMode: setMode
  };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
