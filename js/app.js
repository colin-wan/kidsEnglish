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

    // Bubble Tap Listeners (Zero-delay, works on both iPad Safari touch and Mac click)
    var onBubbleInteraction = function(e) {
      if (currentMode !== 'bubbles') return;
      var clientX = e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches && e.touches[0] ? e.touches[0].clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      var hitBubble = ParticleSystem.checkBubbleTap(clientX, clientY);
      if (hitBubble) {
        AudioEngine.playPop();
        AudioEngine.playChime(783.99);
        addStar(1);
        bubblePopCount++;
        var countEl = document.getElementById('bubble-pop-count');
        if (countEl) countEl.innerText = bubblePopCount;

        if (hitBubble.key) {
          AudioEngine.playClip(hitBubble.key);
        }
        // Spawn immediate replacement bubble
        spawnNextBubble();
      } else {
        // Playful little splash sparkle on empty tap
        ParticleSystem.burst(clientX, clientY, 6);
      }
    };

    var handleBubblesModeTap = function(e) {
      if (currentMode !== 'bubbles') return;
      var target = e.target;
      var isBtn = target && (
        target.tagName === 'BUTTON' || 
        (target.closest && target.closest('button')) || 
        (target.classList && target.classList.contains('theme-pill')) || 
        (target.closest && target.closest('.theme-pill'))
      );
      if (isBtn) return; // Allow buttons and theme pills to click freely!
      onBubbleInteraction(e);
    };

    var appContainer = document.getElementById('app-container');
    if (appContainer) {
      appContainer.addEventListener('click', handleBubblesModeTap, false);
      appContainer.addEventListener('touchend', function(e) {
        if (currentMode === 'bubbles') {
          var target = e.target;
          var isBtn = target && (
            target.tagName === 'BUTTON' || 
            (target.closest && target.closest('button')) || 
            (target.classList && target.classList.contains('theme-pill')) || 
            (target.closest && target.closest('.theme-pill'))
          );
          if (isBtn) return;
          if (e.cancelable) e.preventDefault();
          onBubbleInteraction(e);
        }
      }, false);
    }
  }

  // ==========================================
  // THEME SWITCHING & RENDERING
  // ==========================================
  function updateThemePills(theme) {
    var pills = document.querySelectorAll('.theme-pill');
    for (var i = 0; i < pills.length; i++) {
      if (pills[i].getAttribute('data-theme') === theme) {
        pills[i].className = 'theme-pill active';
      } else {
        pills[i].className = 'theme-pill';
      }
    }
  }

  function setTheme(theme) {
    currentTheme = theme;
    targetItem = null;
    updateThemePills(theme);
    AudioEngine.playChime(783.99);

    if (theme === 'feed' || theme === 'songs') {
      currentMode = 'explore';
      if (modeExploreBtn) modeExploreBtn.className = 'mode-btn active';
      if (modeFindBtn) modeFindBtn.className = 'mode-btn';
      if (modeBubblesBtn) modeBubblesBtn.className = 'mode-btn';
      var canvasEl = document.getElementById('particles-canvas');
      if (canvasEl) canvasEl.style.pointerEvents = 'none';
      clearInterval(bubbleSpawnTimer);
      bubbleSpawnTimer = null;
      ParticleSystem.clearBubbles();
      renderCurrentTheme();
      return;
    }

    if (currentMode === 'find') {
      renderFindStage();
    } else if (currentMode === 'bubbles') {
      renderBubblesStage();
    } else {
      renderCurrentTheme();
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

  function getCurrentThemeItems() {
    if (currentTheme === 'animals') return ContentData.animals;
    if (currentTheme === 'fruits') return ContentData.fruits;
    if (currentTheme === 'vehicles') return ContentData.vehicles;
    if (currentTheme === 'colors') return ContentData.colors;
    return ContentData.animals;
  }

  // ==========================================
  // DEDICATED FIND GAME STAGE
  // ==========================================
  var isFindTransitioning = false;

  function renderFindStage() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = '';

    var items = getCurrentThemeItems();
    if (!items || items.length === 0) return;

    // Pick target (avoid repeating immediate same item)
    var next;
    do {
      next = items[Math.floor(Math.random() * items.length)];
    } while (items.length > 1 && targetItem && next.id === targetItem.id);
    targetItem = next;

    // Pick 3 distractors from the current theme
    var pool = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id !== targetItem.id) {
        pool.push(items[i]);
      }
    }
    // Shuffle pool
    for (var j = pool.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = pool[j];
      pool[j] = pool[k];
      pool[k] = tmp;
    }
    var options = [targetItem];
    for (var p = 0; p < Math.min(3, pool.length); p++) {
      options.push(pool[p]);
    }
    // Shuffle options array
    for (var s = options.length - 1; s > 0; s--) {
      var r = Math.floor(Math.random() * (s + 1));
      var t = options[s];
      options[s] = options[r];
      options[r] = t;
    }

    var stage = document.createElement('div');
    stage.className = 'find-stage';

    var questionBox = document.createElement('div');
    questionBox.className = 'find-question-box';
    questionBox.innerHTML = (
      '<div class="find-question-text">' +
        '<span>Can you find the <strong>' + targetItem.name + '</strong>?</span>' +
        '<span class="find-question-emoji">' + (targetItem.bubbleEmoji || '⭐') + '</span>' +
      '</div>' +
      '<button class="find-replay-btn" id="find-replay-btn">' +
        '<span>🔊 Listen</span>' +
      '</button>' +
      '<button class="bubbles-back-btn" id="find-back-btn">' +
        '<span>🌟 Exit</span>' +
      '</button>'
    );
    stage.appendChild(questionBox);

    var grid = document.createElement('div');
    grid.className = 'find-options-grid';

    for (var o = 0; o < options.length; o++) {
      var opt = options[o];
      var card = document.createElement('div');
      card.className = 'find-option-card';
      card.id = 'find-card-' + opt.id;
      card.setAttribute('data-id', opt.id);

      if (currentTheme === 'colors') {
        card.innerHTML = (
          '<div class="color-splash-box" style="background-color:' + opt.hex + '">' + opt.bubbleEmoji + '</div>' +
          '<div class="animal-name-tag" style="color:' + opt.hex + '">' + opt.name + '</div>'
        );
      } else {
        card.innerHTML = (
          '<div class="letter-badge" style="background-color:' + (opt.color || '#FF5722') + '">' + opt.letter + '</div>' +
          '<div class="animal-svg-box">' + opt.svg + '</div>' +
          '<div class="animal-name-tag">' + opt.name + '</div>'
        );
      }

      attachTouchOrClick(card, (function(optItem, cardEl) {
        return function(e) {
          handleFindOptionTap(optItem, cardEl, e);
        };
      })(opt, card));

      grid.appendChild(card);
    }

    stage.appendChild(grid);
    playgroundEl.appendChild(stage);

    var replayBtn = document.getElementById('find-replay-btn');
    if (replayBtn) {
      attachTouchOrClick(replayBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        playTargetPrompt();
      });
    }

    var findBackBtn = document.getElementById('find-back-btn');
    if (findBackBtn) {
      attachTouchOrClick(findBackBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        setMode('explore');
      });
    }

    showPrompt("Can you find the " + targetItem.name + "?", targetItem.bubbleEmoji);

    // Audio hint after short delay
    setTimeout(function() {
      playTargetPrompt();
    }, 280);
  }

  function playTargetPrompt() {
    if (!targetItem) return;
    if (targetItem.promptKey) {
      AudioEngine.playClip(targetItem.promptKey);
    } else if (targetItem.phraseKey) {
      AudioEngine.playClip(targetItem.phraseKey);
    }
  }

  function handleFindOptionTap(item, cardEl, e) {
    if (isFindTransitioning || !targetItem) return;

    var rect = cardEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    if (item.id === targetItem.id) {
      // SUCCESS: Toddler found the item!
      isFindTransitioning = true;
      cardEl.classList.add('correct-celebrate');
      ParticleSystem.burst(cx, cy, 26);
      AudioEngine.playFanfare();
      addStar(3);

      var praises = ['praise_great', 'praise_yay', 'praise_super', 'praise_highfive'];
      var praiseClip = praises[Math.floor(Math.random() * praises.length)];

      setTimeout(function() {
        AudioEngine.playClip(praiseClip, function() {
          setTimeout(function() {
            isFindTransitioning = false;
            renderFindStage(); // Advance to next fun question
          }, 600);
        });
      }, 350);
    } else {
      // Friendly, non-punitive guidance
      cardEl.classList.remove('wrong-wobble');
      void cardEl.offsetWidth;
      cardEl.classList.add('wrong-wobble');
      ParticleSystem.burst(cx, cy, 10);
      AudioEngine.playBoing();

      if (item.phraseKey) {
        AudioEngine.playClip(item.phraseKey, function() {
          setTimeout(playTargetPrompt, 500);
        });
      } else {
        setTimeout(playTargetPrompt, 500);
      }
    }
  }

  // ==========================================
  // DEDICATED BUBBLES POP STAGE
  // ==========================================
  var bubblePopCount = 0;

  function renderBubblesStage() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = '';

    clearInterval(bubbleSpawnTimer);
    bubbleSpawnTimer = null;
    ParticleSystem.clearBubbles();

    var stage = document.createElement('div');
    stage.className = 'bubbles-stage';
    stage.innerHTML = (
      '<div class="bubbles-info-bar">' +
        '<span class="bubbles-info-title">🫧 Pop the Bubbles!</span>' +
        '<span class="bubbles-pop-counter-pill">⭐ <span id="bubble-pop-count">' + bubblePopCount + '</span> Popped</span>' +
        '<button id="bubbles-back-btn" class="bubbles-back-btn">🌟 Exit</button>' +
      '</div>' +
      '<div class="bubbles-sky-tap-hint">Tap floating bubbles to hear words! 🫧</div>'
    );
    playgroundEl.appendChild(stage);

    var backBtn = document.getElementById('bubbles-back-btn');
    if (backBtn) {
      attachTouchOrClick(backBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        setMode('explore');
      });
    }

    showPrompt("Pop the bubbles! Pop pop pop!", "🫧");

    // Spawn 4 immediate bubbles at varying heights
    var viewHeight = window.innerHeight || 600;
    spawnNextBubble(viewHeight * 0.75);
    spawnNextBubble(viewHeight * 0.50);
    spawnNextBubble(viewHeight * 0.30);
    spawnNextBubble(viewHeight * 0.15);

    bubbleSpawnTimer = setInterval(function() {
      if (currentMode === 'bubbles') {
        spawnNextBubble();
      }
    }, 1100);
  }

  function spawnNextBubble(startY) {
    if (currentMode !== 'bubbles') return;
    var list = getCurrentThemeItems();
    if (!list || list.length === 0) return;
    var randomObj = list[Math.floor(Math.random() * list.length)];

    ParticleSystem.spawnBubble({
      letter: randomObj.letter || '',
      emoji: randomObj.bubbleEmoji || '⭐',
      word: randomObj.name || '',
      key: randomObj.phraseKey || ''
    }, startY);
  }

  // ==========================================
  // MODE SWITCHING (Explore, Find, Bubbles)
  // ==========================================
  function setMode(mode) {
    currentMode = mode;
    clearInterval(bubbleSpawnTimer);
    bubbleSpawnTimer = null;
    isFindTransitioning = false;

    if (modeExploreBtn) modeExploreBtn.className = 'mode-btn' + (mode === 'explore' ? ' active' : '');
    if (modeFindBtn) modeFindBtn.className = 'mode-btn' + (mode === 'find' ? ' active' : '');
    if (modeBubblesBtn) modeBubblesBtn.className = 'mode-btn' + (mode === 'bubbles' ? ' active' : '');

    if (mode === 'explore') {
      ParticleSystem.clearBubbles();
      AudioEngine.playClip('mode_explore');
      renderCurrentTheme();
    } else if (mode === 'find') {
      ParticleSystem.clearBubbles();
      if (currentTheme === 'feed' || currentTheme === 'songs') {
        currentTheme = 'animals';
        updateThemePills('animals');
      }
      AudioEngine.playClip('mode_find');
      renderFindStage();
    } else if (mode === 'bubbles') {
      if (currentTheme === 'feed' || currentTheme === 'songs') {
        currentTheme = 'animals';
        updateThemePills('animals');
      }
      AudioEngine.playClip('mode_bubbles');
      renderBubblesStage();
    }
  }

  function repeatPrompt() {
    if (currentMode === 'find') {
      playTargetPrompt();
    } else if (currentTheme === 'feed' && currentFeedingAnimal && currentFeedingAnimal.askClip) {
      AudioEngine.playClip(currentFeedingAnimal.askClip);
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
