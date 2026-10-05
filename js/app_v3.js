/**
 * Toddler Safari - Multi-Theme Enlightenment Logic
 * Designed for Toddlers (2-3 yo) & iOS 12.5.8 Safari iPad
 * - Standard American English pronunciation
 * - Multi-Themes: Animals, Yummy Food, Vehicles, Colors, Feed Friends, Sing Songs
 * - Zero-lag, ultra-responsive theme switching between Feed and Sing
 * - Dedicated Top Bar Pause & Night-sky Sleep Mode
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
  var isPaused = false;

  // Feeding mini-game state & timers
  var currentFeedingIndex = 0;
  var isFeeding = false;
  var currentFeedingAnimal = null;
  var feedPromptTimer = null;
  var feedChewTimer = null;
  var feedAdvanceTimer = null;

  // Find mini-game state
  var isFindTransitioning = false;
  var findPromptTimer = null;

  // Bubbles mini-game state
  var bubblePopCount = 0;
  var lastBubblePopTime = 0;

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
  var pauseBtn;
  var pauseModalEl;
  var resumeBtn;

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
    pauseBtn = document.getElementById('pause-btn');
    pauseModalEl = document.getElementById('pause-modal');
    resumeBtn = document.getElementById('resume-btn');

    // Initialize Canvas Particle System
    var canvasEl = document.getElementById('particles-canvas');
    if (canvasEl && typeof ParticleSystem !== 'undefined') {
      ParticleSystem.init(canvasEl);
    }

    renderCurrentTheme();
    bindEvents();

    // Standalone & Fullscreen Detection for iPad Home Screen
    try {
      if (window.navigator.standalone || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)) {
        document.body.classList.add('ios-standalone');
      }
    } catch (eStand) {}

    try {
      AudioEngine.preloadTheme('animals');
    } catch (e) {}
  }

  // Universal click & touch listener (rock-solid on iPad iOS 12 & Mac)
  function attachTouchOrClick(element, handler) {
    if (!element) return;
    var lastTrigger = 0;
    var startX = 0;
    var startY = 0;
    var moved = false;
    var touchHandled = false;

    element.addEventListener('touchstart', function(e) {
      if (e.touches && e.touches[0]) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        moved = false;
        touchHandled = false;
      }
    }, false);

    element.addEventListener('touchmove', function(e) {
      if (e.touches && e.touches[0]) {
        var dx = Math.abs(e.touches[0].clientX - startX);
        var dy = Math.abs(e.touches[0].clientY - startY);
        if (dx > 25 || dy > 25) {
          moved = true;
        }
      }
    }, false);

    element.addEventListener('touchend', function(e) {
      if (moved) return;
      if (e.cancelable) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();
      var now = Date.now();
      if (now - lastTrigger < 300) return;
      lastTrigger = now;
      touchHandled = true;
      handler(e);
    }, false);

    element.addEventListener('click', function(e) {
      if (e.stopPropagation) e.stopPropagation();
      if (touchHandled) {
        touchHandled = false;
        return;
      }
      var now = Date.now();
      if (now - lastTrigger < 300) return;
      lastTrigger = now;
      handler(e);
    }, false);
  }

  // Reliable detection of UI interactive controls
  function isUiControlTap(target) {
    if (!target) return false;
    var el = target.nodeType === 3 ? target.parentNode : target;
    if (!el) return false;
    if (typeof el.closest === 'function') {
      return !!el.closest('button, .mode-btn, .theme-pill, .bubbles-back-btn, .bubbles-info-bar, .top-bar, .theme-nav-bar, .bottom-nature-bar, .flower-touchable, .sun-item, .cloud-item, #start-btn, .splash-overlay, .find-replay-btn, .pause-btn, .big-resume-btn, .pause-overlay, .feed-skip-btn, .alphabet-modal-overlay, .alphabet-modal-card');
    }
    while (el && el !== document.body && el !== document.documentElement) {
      var tag = (el.tagName || '').toLowerCase();
      var cls = el.className || '';
      if (tag === 'button' || tag === 'header' || tag === 'nav' || tag === 'footer') return true;
      if (typeof cls === 'string' && (
        cls.indexOf('mode-btn') !== -1 ||
        cls.indexOf('theme-pill') !== -1 ||
        cls.indexOf('bubbles-back-btn') !== -1 ||
        cls.indexOf('bubbles-info-bar') !== -1 ||
        cls.indexOf('top-bar') !== -1 ||
        cls.indexOf('theme-nav-bar') !== -1 ||
        cls.indexOf('flower-touchable') !== -1 ||
        cls.indexOf('sun-item') !== -1 ||
        cls.indexOf('cloud-item') !== -1 ||
        cls.indexOf('pause-btn') !== -1 ||
        cls.indexOf('big-resume-btn') !== -1 ||
        cls.indexOf('pause-overlay') !== -1 ||
        cls.indexOf('feed-skip-btn') !== -1 ||
        cls.indexOf('alphabet-modal') !== -1 ||
        cls.indexOf('alphabet-nav-btn') !== -1 ||
        cls.indexOf('alphabet-sound-btn') !== -1 ||
        cls.indexOf('alphabet-spotlight') !== -1
      )) return true;
      el = el.parentNode;
    }
    return false;
  }

  function bindEvents() {
    // Splash screen click dismissal
    var startBtn = document.getElementById('start-btn');
    if (startBtn) {
      attachTouchOrClick(startBtn, function() {
        startApp();
      });
    }
    if (splashOverlayEl) {
      attachTouchOrClick(splashOverlayEl, function() {
        startApp();
      });
    }

    // Pause / Break Button
    if (pauseBtn) {
      attachTouchOrClick(pauseBtn, function() {
        pauseApp();
      });
    }

    // Resume Button inside Pause Modal
    if (resumeBtn) {
      attachTouchOrClick(resumeBtn, function() {
        resumeApp();
      });
    }

    // Theme Pills
    var themePills = document.querySelectorAll('.theme-pill');
    for (var t = 0; t < themePills.length; t++) {
      (function(pill) {
        attachTouchOrClick(pill, function() {
          if (isPaused) return;
          var theme = pill.getAttribute('data-theme');
          setTheme(theme);
        });
      })(themePills[t]);
    }

    // Mode Buttons
    if (modeExploreBtn) {
      attachTouchOrClick(modeExploreBtn, function() {
        if (isPaused) return;
        setMode('explore');
      });
    }
    if (modeFindBtn) {
      attachTouchOrClick(modeFindBtn, function() {
        if (isPaused) return;
        setMode('find');
      });
    }
    if (modeBubblesBtn) {
      attachTouchOrClick(modeBubblesBtn, function() {
        if (isPaused) return;
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
          if (isPaused) return;
          triggerFlower(flowers[idx], flowerNotes[idx % flowerNotes.length], e);
        });
      })(f);
    }

    // Repeat Prompt Banner
    if (promptBannerEl) {
      attachTouchOrClick(promptBannerEl, function() {
        if (isPaused) return;
        repeatPrompt();
      });
    }

    // Alphabet Spotlight Modal Events
    var alphaCloseBtn = document.getElementById('alphabet-modal-close');
    if (alphaCloseBtn) {
      attachTouchOrClick(alphaCloseBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        closeAlphabetModal();
      });
    }

    var alphaPrevBtn = document.getElementById('alphabet-btn-prev');
    if (alphaPrevBtn) {
      attachTouchOrClick(alphaPrevBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        prevAlphabetLetter();
      });
    }

    var alphaNextBtn = document.getElementById('alphabet-btn-next');
    if (alphaNextBtn) {
      attachTouchOrClick(alphaNextBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        nextAlphabetLetter();
      });
    }

    var alphaSoundBtn = document.getElementById('alphabet-btn-sound');
    if (alphaSoundBtn) {
      attachTouchOrClick(alphaSoundBtn, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        replayAlphabetSound();
      });
    }

    var alphaLetterBox = document.getElementById('alphabet-spotlight-letter-box');
    if (alphaLetterBox) {
      attachTouchOrClick(alphaLetterBox, function(e) {
        if (e && e.stopPropagation) e.stopPropagation();
        replayAlphabetSoundWithBurst();
      });
    }

    var alphaModalEl = document.getElementById('alphabet-modal');
    if (alphaModalEl) {
      attachTouchOrClick(alphaModalEl, function(e) {
        if (e && e.target === alphaModalEl) {
          closeAlphabetModal();
        }
      });
    }

    // ==========================================
    // BUBBLE POPPING (ZERO-LATENCY TOUCH & CLICK)
    // ==========================================
    function popBubbleAt(clientX, clientY) {
      if (isPaused) return false;
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return false;
      var hitBubble = ParticleSystem.checkBubbleTap(clientX, clientY);
      if (hitBubble) {
        try {
          AudioEngine.playPop();
          AudioEngine.playChime(783.99);
        } catch (errPop) {}
        addStar(1);
        bubblePopCount++;
        var countEl = document.getElementById('bubble-pop-count');
        if (countEl) countEl.innerText = bubblePopCount;

        if (hitBubble.key) {
          try {
            AudioEngine.playClip(hitBubble.key);
          } catch (errClip) {}
        }
        spawnNextBubble();
        return true;
      } else {
        try {
          ParticleSystem.burst(clientX, clientY, 8);
        } catch (errBurst) {}
        return false;
      }
    }

    var appContainer = document.getElementById('app-container');
    if (appContainer) {
      appContainer.addEventListener('touchstart', function(e) {
        if (currentMode !== 'bubbles' || isPaused) return;
        if (isUiControlTap(e.target)) return;

        var touches = e.changedTouches || e.touches;
        if (!touches || touches.length === 0) return;

        lastBubblePopTime = Date.now();
        for (var i = 0; i < touches.length; i++) {
          popBubbleAt(touches[i].clientX, touches[i].clientY);
        }
        if (e.cancelable) {
          e.preventDefault();
        }
      }, false);

      appContainer.addEventListener('touchend', function(e) {
        if (currentMode !== 'bubbles' || isPaused) return;
        if (isUiControlTap(e.target)) return;
        if (Date.now() - lastBubblePopTime < 350) return;

        var touches = e.changedTouches || e.touches;
        if (!touches || touches.length === 0) return;
        for (var i = 0; i < touches.length; i++) {
          popBubbleAt(touches[i].clientX, touches[i].clientY);
        }
        if (e.cancelable) {
          e.preventDefault();
        }
      }, false);

      appContainer.addEventListener('click', function(e) {
        if (currentMode !== 'bubbles' || isPaused) return;
        if (isUiControlTap(e.target)) return;
        if (Date.now() - lastBubblePopTime < 400) return;
        popBubbleAt(e.clientX, e.clientY);
      }, false);
    }
  }

  // ==========================================
  // PAUSE & RESUME LOGIC (涨停/休息功能)
  // ==========================================
  function pauseApp() {
    if (isPaused) return;
    isPaused = true;

    clearFeedingTimers();
    clearFindTimers();
    clearSongPlayingStates();
    closeAlphabetModal();

    // 1. Halt all audio sources immediately
    try {
      AudioEngine.stopAll();
      AudioEngine.playClip('pause_take_break');
    } catch (e) {}

    // 2. Halt animation loops and bubble timers
    try {
      ParticleSystem.stopLoop();
    } catch (e) {}

    if (bubbleSpawnTimer) {
      clearInterval(bubbleSpawnTimer);
      bubbleSpawnTimer = null;
    }

    // 3. Show night-sky break modal
    if (pauseModalEl) {
      pauseModalEl.classList.remove('hidden');
    }
  }

  function resumeApp() {
    if (!isPaused) return;
    isPaused = false;

    // 1. Hide break modal
    if (pauseModalEl) {
      pauseModalEl.classList.add('hidden');
    }

    // 2. Resume particle loops
    try {
      ParticleSystem.startLoop();
      AudioEngine.playClip('pause_resume');
      AudioEngine.playChime(783.99);
    } catch (e) {}

    // 3. Resume mode-specific timers & prompts
    if (currentMode === 'bubbles') {
      spawnNextBubble();
      bubbleSpawnTimer = setInterval(function() {
        if (currentMode === 'bubbles' && !isPaused) {
          spawnNextBubble();
        }
      }, 1100);
    } else if (currentMode === 'find') {
      setTimeout(playTargetPrompt, 500);
    } else if (currentTheme === 'feed') {
      setTimeout(repeatPrompt, 500);
    }
  }

  // ==========================================
  // THEME SWITCHING & RENDERING (ZERO-LAG OPTIMIZED)
  // ==========================================
  function clearSongPlayingStates() {
    var allCards = document.querySelectorAll('.song-card');
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].classList.remove('playing');
    }
  }

  function clearFeedingTimers() {
    if (feedPromptTimer) {
      clearTimeout(feedPromptTimer);
      feedPromptTimer = null;
    }
    if (feedChewTimer) {
      clearTimeout(feedChewTimer);
      feedChewTimer = null;
    }
    if (feedAdvanceTimer) {
      clearTimeout(feedAdvanceTimer);
      feedAdvanceTimer = null;
    }
    isFeeding = false;
  }

  function clearFindTimers() {
    if (findPromptTimer) {
      clearTimeout(findPromptTimer);
      findPromptTimer = null;
    }
  }

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
    if (theme === currentTheme && currentMode === 'explore') return;

    // 1. Immediately silence any active speech, songs, and clear timers
    try {
      AudioEngine.stopAll();
    } catch (e) {}

    clearFeedingTimers();
    clearFindTimers();
    clearSongPlayingStates();
    closeAlphabetModal();

    currentTheme = theme;
    targetItem = null;
    updateThemePills(theme);

    try {
      AudioEngine.preloadTheme(theme);
    } catch (e) {}

    try {
      AudioEngine.playChime(783.99);
    } catch (e) {}

    // Exit bubbles mode cleanly if selecting theme
    if (currentMode === 'bubbles') {
      setMode('explore');
      return;
    }

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
    } else {
      renderCurrentTheme();
      if (theme === 'alphabet') {
        try {
          AudioEngine.playClip('theme_alphabet');
        } catch (e) {}
      }
    }
  }

  function renderCurrentTheme() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = '';

    if (currentTheme === 'animals') {
      renderStandardGrid(ContentData.animals, '🦁');
      showPrompt("Tap the animals to explore! (12 Animals)", "🦁");
    } else if (currentTheme === 'fruits') {
      renderStandardGrid(ContentData.fruits, '🍎');
      showPrompt("Yummy fruits and food! Tap to taste! (12 Foods)", "🍎");
    } else if (currentTheme === 'vehicles') {
      renderStandardGrid(ContentData.vehicles, '🚗');
      showPrompt("Things that go! Beep beep! (8 Vehicles)", "🚗");
    } else if (currentTheme === 'colors') {
      renderColorsGrid();
      showPrompt("Rainbow colors! Tap to splash! (10 Colors)", "🎨");
    } else if (currentTheme === 'alphabet') {
      renderAlphabetGrid();
      showPrompt("Learn the ABC Alphabet! Tap any letter! (26 Letters)", "🔤");
    } else if (currentTheme === 'feed') {
      renderFeedingStage();
      showPrompt("Feed the hungry animal friends! (8 Animals)", "🍼");
    } else if (currentTheme === 'songs') {
      renderSongsGrid();
      showPrompt("Sing along to classic nursery rhymes! (6 Songs)", "🎵");
    }
  }

  // Render Standard Card Grid (Animals, Fruits, Vehicles)
  function renderStandardGrid(items, defaultEmoji) {
    var frag = document.createDocumentFragment();
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
          if (isPaused) return;
          handleItemTap(obj, e);
        };
      })(item));

      frag.appendChild(pod);
    }
    playgroundEl.appendChild(frag);
  }

  // Render Colors Grid
  function renderColorsGrid() {
    var colors = ContentData.colors;
    var frag = document.createDocumentFragment();
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
          if (isPaused) return;
          handleColorTap(colorItem, e);
        };
      })(c));

      frag.appendChild(pod);
    }
    playgroundEl.appendChild(frag);
  }

  // ==========================================
  // EXPANDED FEEDING MINI-GAME (8 Animals & Dynamic Food Basket)
  // ==========================================
  function renderFeedingStage() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = '';

    clearFeedingTimers();

    var friends = ContentData.feedFriends;
    var allFoods = ContentData.allFoods;
    currentFeedingAnimal = friends[currentFeedingIndex % friends.length];

    // Find the target food object
    var targetFoodObj = null;
    for (var f = 0; f < allFoods.length; f++) {
      if (allFoods[f].id === currentFeedingAnimal.targetFood) {
        targetFoodObj = allFoods[f];
        break;
      }
    }
    if (!targetFoodObj) {
      targetFoodObj = { id: currentFeedingAnimal.targetFood, name: 'Food', emoji: '🍎' };
    }

    // Pick 3 random distractor foods from the basket
    var distractorPool = [];
    for (var d = 0; d < allFoods.length; d++) {
      if (allFoods[d].id !== currentFeedingAnimal.targetFood) {
        distractorPool.push(allFoods[d]);
      }
    }
    for (var j = distractorPool.length - 1; j > 0; j--) {
      var rk = Math.floor(Math.random() * (j + 1));
      var tmpD = distractorPool[j];
      distractorPool[j] = distractorPool[rk];
      distractorPool[rk] = tmpD;
    }

    // 4 choices = 1 target + 3 distractors
    var trayChoices = [targetFoodObj];
    for (var p = 0; p < Math.min(3, distractorPool.length); p++) {
      trayChoices.push(distractorPool[p]);
    }
    for (var s = trayChoices.length - 1; s > 0; s--) {
      var randIdx = Math.floor(Math.random() * (s + 1));
      var tempChoice = trayChoices[s];
      trayChoices[s] = trayChoices[randIdx];
      trayChoices[randIdx] = tempChoice;
    }

    var stage = document.createElement('div');
    stage.className = 'feeding-stage';

    var currentProgressText = (currentFeedingIndex % friends.length + 1) + ' / ' + friends.length;

    var headerBar = (
      '<div class="feeding-header-bar">' +
        '<span class="feed-progress-pill">🐾 ' + currentFeedingAnimal.name + ' (' + currentProgressText + ')</span>' +
        '<button id="feed-skip-btn" class="feed-skip-btn" type="button">' +
          '<span>Next Friend ➡️</span>' +
        '</button>' +
      '</div>'
    );

    var hungryBoxHtml = (
      '<div id="hungry-box" class="hungry-character-box">' +
        '<span style="font-size: 80px;">' + currentFeedingAnimal.emoji + '</span>' +
      '</div>'
    );

    var promptHtml = (
      '<div class="prompt-banner" style="position:static; transform:none; margin: 8px 0;">' +
        '<span>' + currentFeedingAnimal.prompt + '</span>' +
      '</div>'
    );

    var trayHtml = '<div class="food-tray-v3">';
    for (var c = 0; c < trayChoices.length; c++) {
      var item = trayChoices[c];
      trayHtml += (
        '<div class="food-item-v3" data-food="' + item.id + '">' +
          '<span class="food-item-icon-v3">' + item.emoji + '</span>' +
          '<span class="food-item-name-v3">' + item.name + '</span>' +
        '</div>'
      );
    }
    trayHtml += '</div>';

    stage.innerHTML = headerBar + hungryBoxHtml + promptHtml + trayHtml;
    playgroundEl.appendChild(stage);

    // Prompt the child with the animal's ask voice after 250ms (never overlaps with chime or theme sounds)
    feedPromptTimer = setTimeout(function() {
      if (currentTheme === 'feed' && currentFeedingAnimal && currentFeedingAnimal.askClip && !isPaused) {
        AudioEngine.playClip(currentFeedingAnimal.askClip);
      }
    }, 250);

    // Skip / Next Friend button handler
    var skipBtn = document.getElementById('feed-skip-btn');
    if (skipBtn) {
      attachTouchOrClick(skipBtn, function() {
        if (isPaused) return;
        clearFeedingTimers();
        currentFeedingIndex = (currentFeedingIndex + 1) % friends.length;
        AudioEngine.playChime(659.25);
        renderFeedingStage();
      });
    }

    // Attach food item handlers
    var foodButtons = stage.querySelectorAll('.food-item-v3');
    for (var i = 0; i < foodButtons.length; i++) {
      (function(btn) {
        attachTouchOrClick(btn, function(e) {
          if (isPaused) return;
          var chosen = btn.getAttribute('data-food');
          handleFoodFeed(chosen, btn);
        });
      })(foodButtons[i]);
    }
  }

  function handleFoodFeed(foodName, btn) {
    if (!currentFeedingAnimal || isFeeding || isPaused) return;

    if (feedPromptTimer) {
      clearTimeout(feedPromptTimer);
      feedPromptTimer = null;
    }
    clearSongPlayingStates();

    var rect = btn.getBoundingClientRect();
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);

    var hungryBox = document.getElementById('hungry-box');

    if (foodName === currentFeedingAnimal.targetFood) {
      // SUCCESS: Animal eats food happily!
      isFeeding = true;
      if (hungryBox) hungryBox.classList.add('chewing');
      AudioEngine.playFanfare();
      AudioEngine.playClip('feed_yum');
      addStar(3);

      feedChewTimer = setTimeout(function() {
        if (hungryBox) hungryBox.classList.remove('chewing');
        AudioEngine.playClip('praise_great');

        feedAdvanceTimer = setTimeout(function() {
          if (currentTheme === 'feed') {
            currentFeedingIndex = (currentFeedingIndex + 1) % ContentData.feedFriends.length;
            renderFeedingStage(); // Flip to next hungry animal!
          }
        }, 900);
      }, 1500);
    } else {
      // Friendly, encouraging hint
      btn.classList.remove('wrong-shake');
      void btn.offsetWidth;
      btn.classList.add('wrong-shake');
      AudioEngine.playBoing();
      AudioEngine.playClip(currentFeedingAnimal.askClip);
    }
  }

  // ==========================================
  // SONGS JUKEBOX GRID (6 Authentic Vocal Songs)
  // ==========================================
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
          if (isPaused) return;
          handleSongPlay(s, cardEl);
        };
      })(song, card));

      grid.appendChild(card);
    }

    playgroundEl.appendChild(grid);
  }

  function handleSongPlay(song, cardEl) {
    var isAlreadyPlaying = cardEl.classList.contains('playing');

    // Toggle behavior: if already playing, pause/stop it!
    if (isAlreadyPlaying) {
      AudioEngine.stopAll();
      cardEl.classList.remove('playing');
      return;
    }

    // Stop any other playing song
    AudioEngine.stopAll();
    clearSongPlayingStates();

    cardEl.classList.add('playing');
    var rect = cardEl.getBoundingClientRect();
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);

    showPrompt(song.title, song.icon);
    AudioEngine.playSparkle();

    AudioEngine.playClip(song.phraseKey, function() {
      cardEl.classList.remove('playing');
    });

    addStar(2);
  }

  // ==========================================
  // TAP & INTERACTION HANDLING
  // ==========================================
  function handleItemTap(item, event) {
    clearSongPlayingStates();
    var pod = document.getElementById('pod-' + item.id);
    var rect = pod ? pod.getBoundingClientRect() : { left: 100, top: 100, width: 80, height: 80 };
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    ParticleSystem.burst(cx, cy, 14);

    tapCounters[item.id] = (tapCounters[item.id] || 0) + 1;
    var count = tapCounters[item.id];

    if (pod) {
      pod.classList.remove('anim-jump', 'anim-wobble');
      void pod.offsetWidth;
      pod.classList.add(count % 2 === 1 ? 'anim-jump' : 'anim-wobble');
    }

    showSpeech(item.id, item.name + "! " + (item.tagline || ''));

    if (item.phraseKey) {
      AudioEngine.playClip(item.phraseKey);
    }
    AudioEngine.playChime(659.25);
    addStar(1);
  }

  function handleColorTap(colorItem, event) {
    clearSongPlayingStates();
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

  // ==========================================
  // 🔤 ALPHABET A-Z LEARNING & SPOTLIGHT MODAL
  // ==========================================
  var currentAlphabetIndex = 0;

  function renderAlphabetGrid() {
    var letters = ContentData.alphabet;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < letters.length; i++) {
      var item = letters[i];
      tapCounters[item.id] = 0;

      var pod = document.createElement('div');
      pod.className = 'animal-pod alphabet-pod';
      pod.id = 'pod-' + item.id;
      pod.setAttribute('data-id', item.id);

      pod.innerHTML = (
        '<div class="letter-badge alphabet-badge" style="background-color:' + (item.color || '#E65100') + '">' + item.letter + '</div>' +
        '<div class="animal-svg-box">' + item.svg + '</div>' +
        '<div class="animal-name-tag alphabet-name-tag"><span class="letter-display-pair">' + item.letter + item.lower + '</span> - ' + item.name + '</div>' +
        '<div class="speech-bubble" id="speech-' + item.id + '" style="display:none;"></div>'
      );

      attachTouchOrClick(pod, (function(obj, idx) {
        return function(e) {
          if (isPaused) return;
          handleAlphabetTap(obj, idx, e);
        };
      })(item, i));

      frag.appendChild(pod);
    }
    playgroundEl.appendChild(frag);
  }

  function handleAlphabetTap(item, index, event) {
    clearSongPlayingStates();
    var pod = document.getElementById('pod-' + item.id);
    if (pod) {
      pod.classList.remove('anim-jump');
      void pod.offsetWidth;
      pod.classList.add('anim-jump');
    }

    var rect = pod ? pod.getBoundingClientRect() : { left: 100, top: 100, width: 80, height: 80 };
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);

    showSpeech(item.id, item.letter + item.lower + " - " + item.name + " " + item.bubbleEmoji);
    addStar(1);

    // Open the rich spotlight modal for this letter
    openAlphabetModal(index);
  }

  function openAlphabetModal(index) {
    if (isPaused) return;
    var letters = ContentData.alphabet;
    if (!letters || letters.length === 0) return;
    updateAlphabetModal(index);

    var modal = document.getElementById('alphabet-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    }

    var item = letters[currentAlphabetIndex];
    if (item && item.phraseKey) {
      AudioEngine.playClip(item.phraseKey);
    }
  }

  function closeAlphabetModal() {
    var modal = document.getElementById('alphabet-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
    }
    try {
      AudioEngine.stopVoice();
    } catch (e) {}
  }

  function updateAlphabetModal(index) {
    var letters = ContentData.alphabet;
    if (!letters || letters.length === 0) return;

    var total = letters.length;
    var safeIdx = ((index % total) + total) % total;
    currentAlphabetIndex = safeIdx;
    var item = letters[safeIdx];

    var stepEl = document.getElementById('alphabet-spotlight-step');
    if (stepEl) {
      stepEl.textContent = 'Letter ' + (safeIdx + 1) + ' of ' + total;
    }

    var upperEl = document.getElementById('spotlight-upper');
    if (upperEl) {
      upperEl.textContent = item.letter;
      upperEl.style.color = item.color || '#E65100';
    }

    var lowerEl = document.getElementById('spotlight-lower');
    if (lowerEl) {
      lowerEl.textContent = item.lower;
      lowerEl.style.color = item.color || '#FF8F00';
    }

    var emojiEl = document.getElementById('spotlight-emoji');
    if (emojiEl) {
      emojiEl.textContent = item.bubbleEmoji || '⭐';
    }

    var wordEl = document.getElementById('spotlight-word');
    if (wordEl) {
      wordEl.textContent = item.name;
    }

    var phonicsEl = document.getElementById('spotlight-phonics');
    if (phonicsEl) {
      phonicsEl.textContent = item.tagline || (item.letter + " says " + item.phonics + ", " + item.phonics + ", " + item.name + "!");
    }

    var letterBox = document.getElementById('alphabet-spotlight-letter-box');
    if (letterBox) {
      letterBox.style.borderColor = item.color || '#FFA000';
    }
  }

  function nextAlphabetLetter() {
    if (isPaused) return;
    var letters = ContentData.alphabet;
    if (!letters || letters.length === 0) return;
    updateAlphabetModal(currentAlphabetIndex + 1);
    var item = letters[currentAlphabetIndex];
    if (item && item.phraseKey) {
      AudioEngine.playClip(item.phraseKey);
    }
    try {
      AudioEngine.playSparkle();
    } catch (e) {}
  }

  function prevAlphabetLetter() {
    if (isPaused) return;
    var letters = ContentData.alphabet;
    if (!letters || letters.length === 0) return;
    updateAlphabetModal(currentAlphabetIndex - 1);
    var item = letters[currentAlphabetIndex];
    if (item && item.phraseKey) {
      AudioEngine.playClip(item.phraseKey);
    }
    try {
      AudioEngine.playSparkle();
    } catch (e) {}
  }

  function replayAlphabetSound() {
    if (isPaused) return;
    var letters = ContentData.alphabet;
    if (!letters || letters.length === 0) return;
    var item = letters[currentAlphabetIndex];
    if (item && item.phraseKey) {
      AudioEngine.playClip(item.phraseKey);
    }
  }

  function replayAlphabetSoundWithBurst() {
    if (isPaused) return;
    var letterBox = document.getElementById('alphabet-spotlight-letter-box');
    if (letterBox) {
      var rect = letterBox.getBoundingClientRect();
      ParticleSystem.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
    }
    replayAlphabetSound();
  }

  function getCurrentThemeItems() {
    if (currentTheme === 'animals') return ContentData.animals;
    if (currentTheme === 'fruits') return ContentData.fruits;
    if (currentTheme === 'vehicles') return ContentData.vehicles;
    if (currentTheme === 'colors') return ContentData.colors;
    if (currentTheme === 'alphabet') return ContentData.alphabet;
    return ContentData.animals;
  }

  // ==========================================
  // DEDICATED FIND GAME STAGE
  // ==========================================
  function renderFindStage() {
    if (!playgroundEl) return;
    playgroundEl.innerHTML = '';

    var items = getCurrentThemeItems();
    if (!items || items.length === 0) return;

    var next;
    do {
      next = items[Math.floor(Math.random() * items.length)];
    } while (items.length > 1 && targetItem && next.id === targetItem.id);
    targetItem = next;

    var pool = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id !== targetItem.id) {
        pool.push(items[i]);
      }
    }
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
    var findTargetText = currentTheme === 'alphabet' ? ('Letter ' + targetItem.letter) : targetItem.name;
    questionBox.innerHTML = (
      '<div class="find-question-text">' +
        '<span>Can you find the <strong>' + findTargetText + '</strong>?</span>' +
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
      } else if (currentTheme === 'alphabet') {
        card.innerHTML = (
          '<div class="letter-badge alphabet-badge" style="background-color:' + (opt.color || '#E65100') + '">' + opt.letter + '</div>' +
          '<div class="animal-svg-box">' + opt.svg + '</div>' +
          '<div class="animal-name-tag alphabet-name-tag"><span class="letter-display-pair">' + opt.letter + opt.lower + '</span> - ' + opt.name + '</div>'
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
          if (isPaused) return;
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
        if (isPaused) return;
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

    var findPromptText = currentTheme === 'alphabet' ? ("Can you find the letter " + targetItem.letter + "?") : ("Can you find the " + targetItem.name + "?");
    showPrompt(findPromptText, targetItem.bubbleEmoji);

    clearFindTimers();
    findPromptTimer = setTimeout(function() {
      if (!isPaused) playTargetPrompt();
    }, 280);
  }

  function playTargetPrompt() {
    if (!targetItem || isPaused) return;
    if (targetItem.promptKey) {
      AudioEngine.playClip(targetItem.promptKey);
    } else if (targetItem.phraseKey) {
      AudioEngine.playClip(targetItem.phraseKey);
    }
  }

  function handleFindOptionTap(item, cardEl, e) {
    if (isFindTransitioning || !targetItem || isPaused) return;

    clearFindTimers();
    clearSongPlayingStates();

    var rect = cardEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;

    if (item.id === targetItem.id) {
      isFindTransitioning = true;
      cardEl.classList.add('correct-celebrate');
      ParticleSystem.burst(cx, cy, 26);
      AudioEngine.playFanfare();
      addStar(3);

      var praises = ['praise_great', 'praise_yay', 'praise_super', 'praise_highfive'];
      var praiseClip = praises[Math.floor(Math.random() * praises.length)];

      findPromptTimer = setTimeout(function() {
        AudioEngine.playClip(praiseClip, function() {
          findPromptTimer = setTimeout(function() {
            isFindTransitioning = false;
            renderFindStage();
          }, 600);
        });
      }, 350);
    } else {
      cardEl.classList.remove('wrong-wobble');
      void cardEl.offsetWidth;
      cardEl.classList.add('wrong-wobble');
      ParticleSystem.burst(cx, cy, 10);
      AudioEngine.playBoing();

      if (item.phraseKey) {
        AudioEngine.playClip(item.phraseKey, function() {
          findPromptTimer = setTimeout(playTargetPrompt, 500);
        });
      } else {
        findPromptTimer = setTimeout(playTargetPrompt, 500);
      }
    }
  }

  // ==========================================
  // DEDICATED BUBBLES POP STAGE
  // ==========================================
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
        '<button id="bubbles-back-btn" class="bubbles-back-btn" type="button">' +
          '<span class="bubbles-back-icon">🌟</span>' +
          '<span>Exit Bubbles</span>' +
        '</button>' +
      '</div>' +
      '<div class="bubbles-sky-tap-hint">Tap floating bubbles to hear words! 🫧</div>'
    );
    playgroundEl.appendChild(stage);

    var backBtn = document.getElementById('bubbles-back-btn');
    if (backBtn) {
      attachTouchOrClick(backBtn, function() {
        setMode('explore');
      });
    }

    showPrompt("Pop the bubbles! Pop pop pop!", "🫧");

    var viewHeight = window.innerHeight || 600;
    spawnNextBubble(viewHeight * 0.75);
    spawnNextBubble(viewHeight * 0.50);
    spawnNextBubble(viewHeight * 0.30);
    spawnNextBubble(viewHeight * 0.15);

    bubbleSpawnTimer = setInterval(function() {
      if (currentMode === 'bubbles' && !isPaused) {
        spawnNextBubble();
      }
    }, 1100);
  }

  function spawnNextBubble(startY) {
    if (currentMode !== 'bubbles' || isPaused) return;
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
    clearFeedingTimers();
    clearFindTimers();
    clearSongPlayingStates();
    closeAlphabetModal();

    if (modeExploreBtn) modeExploreBtn.className = 'mode-btn' + (mode === 'explore' ? ' active' : '');
    if (modeFindBtn) modeFindBtn.className = 'mode-btn' + (mode === 'find' ? ' active' : '');
    if (modeBubblesBtn) modeBubblesBtn.className = 'mode-btn' + (mode === 'bubbles' ? ' active' : '');

    try {
      if (mode === 'explore') {
        ParticleSystem.clearBubbles();
        try {
          AudioEngine.playClip('mode_explore');
        } catch (e) {}
        renderCurrentTheme();
      } else if (mode === 'find') {
        ParticleSystem.clearBubbles();
        if (currentTheme === 'feed' || currentTheme === 'songs') {
          currentTheme = 'animals';
          updateThemePills('animals');
        }
        try {
          AudioEngine.playClip('mode_find');
        } catch (e) {}
        renderFindStage();
      } else if (mode === 'bubbles') {
        if (currentTheme === 'feed' || currentTheme === 'songs') {
          currentTheme = 'animals';
          updateThemePills('animals');
        }
        try {
          AudioEngine.playClip('mode_bubbles');
        } catch (e) {}
        renderBubblesStage();
      }
    } catch (err) {
      console.error('Mode switch caught error:', err);
      if (mode === 'explore') renderCurrentTheme();
      else if (mode === 'find') renderFindStage();
      else if (mode === 'bubbles') renderBubblesStage();
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

  function hideAllSpeechBubbles() {
    var bubbles = document.querySelectorAll('.speech-bubble');
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].style.display = 'none';
    }
  }

  function showSpeech(id, text) {
    hideAllSpeechBubbles();
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
    if (isPaused) return;
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
    if (isPaused) return;
    AudioEngine.playBoing();
    AudioEngine.playClip('cloud');
    addStar(1);
  }

  function triggerFlower(element, noteFreq, event) {
    if (isPaused) return;
    var rect = element.getBoundingClientRect();
    ParticleSystem.burst(rect.left + rect.width / 2, rect.top + 10, 8);
    AudioEngine.playChime(noteFreq);
    addStar(1);
  }

  function startApp() {
    try {
      AudioEngine.unlock();
      AudioEngine.playSparkle();
      AudioEngine.preloadTheme('animals');
    } catch (err) {}

    try {
      var rootEl = document.documentElement;
      if (rootEl.requestFullscreen) {
        rootEl.requestFullscreen().catch(function(){});
      } else if (rootEl.webkitRequestFullscreen) {
        rootEl.webkitRequestFullscreen();
      }
    } catch (eFull) {}

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
    setMode: setMode,
    pauseApp: pauseApp,
    resumeApp: resumeApp
  };
})();

var AppV3 = App;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
