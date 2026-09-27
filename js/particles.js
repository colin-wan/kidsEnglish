/**
 * High-performance Canvas Particle & Bubble System
 * Compatible with iOS 12.5.8 Safari (A7/A8 chips, 1GB RAM)
 * - Tap Sparkles & Stars
 * - Floating Phonics & Animal Bubbles
 * - Water Drops & Hearts
 */

var ParticleSystem = (function() {
  var canvas, ctx;
  var width = 1024;
  var height = 768;
  var particles = [];
  var bubbles = [];
  var isRunning = false;

  function init(canvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', function() {
      setTimeout(resize, 200);
    }, false);
    startLoop();
  }

  function resize() {
    if (!canvas) return;
    var dpr = window.devicePixelRatio || 1;
    // Cap at 2 for performance on old iPads
    if (dpr > 2) dpr = 2;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
  }

  // Spawn star confetti burst at (x, y)
  function burst(x, y, count) {
    var num = count || 12;
    var colors = ['#FFD54F', '#FF7043', '#4DD0E1', '#81C784', '#BA68C8', '#FF4081'];
    for (var i = 0; i < num; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 3 + Math.random() * 6;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 8 + Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.02 + Math.random() * 0.02,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        type: Math.random() > 0.4 ? 'star' : 'circle'
      });
    }
  }

  // Draw 5-pointed star
  function drawStar(c, cx, cy, spikes, outerRadius, innerRadius) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    c.beginPath();
    c.moveTo(cx, cy - outerRadius);
    for (var i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      c.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      c.lineTo(x, y);
      rot += step;
    }
    c.lineTo(cx, cy - outerRadius);
    c.closePath();
    c.fill();
  }

  // Spawn floating bubble (for Bubble Pop Game mode or ambient play)
  function spawnBubble(data) {
    var radius = 42 + Math.random() * 12;
    var startX = radius + Math.random() * (width - radius * 2);
    bubbles.push({
      id: Math.random().toString(36).substr(2, 9),
      x: startX,
      y: height + radius + 10,
      radius: radius,
      speedY: 1.2 + Math.random() * 1.4,
      wobbleOffset: Math.random() * 10,
      wobbleSpeed: 0.03 + Math.random() * 0.02,
      letter: data && data.letter ? data.letter : '',
      emoji: data && data.emoji ? data.emoji : '',
      word: data && data.word ? data.word : '',
      key: data && data.key ? data.key : '',
      color: data && data.color ? data.color : 'rgba(255, 255, 255, 0.7)'
    });
  }

  function clearBubbles() {
    bubbles = [];
  }

  // Check if tap hit any bubble
  function checkBubbleTap(x, y) {
    for (var i = bubbles.length - 1; i >= 0; i--) {
      var b = bubbles[i];
      var dist = Math.sqrt((x - b.x) * (x - b.x) + (y - b.y) * (y - b.y));
      if (dist <= b.radius + 15) { // generous toddler hit area
        var hitBubble = bubbles.splice(i, 1)[0];
        burst(hitBubble.x, hitBubble.y, 16);
        return hitBubble;
      }
    }
    return null;
  }

  function update() {
    // Update particles
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // gravity
      p.life -= p.decay;
      p.rotation += p.vRot;
      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    }

    // Update bubbles
    for (var j = bubbles.length - 1; j >= 0; j--) {
      var b = bubbles[j];
      b.y -= b.speedY;
      b.wobbleOffset += b.wobbleSpeed;
      b.x += Math.sin(b.wobbleOffset) * 0.8;

      if (b.y < -b.radius * 2) {
        bubbles.splice(j, 1);
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw floating bubbles
    for (var j = 0; j < bubbles.length; j++) {
      var b = bubbles[j];
      ctx.save();
      ctx.translate(b.x, b.y);

      // Bubble outer sphere with shine
      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.stroke();

      // Top-left glossy highlight
      ctx.beginPath();
      ctx.ellipse(-b.radius * 0.35, -b.radius * 0.35, b.radius * 0.35, b.radius * 0.18, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.fill();

      // Bubble content: Letter or Emoji
      if (b.letter) {
        ctx.fillStyle = '#E91E63';
        ctx.font = 'bold ' + Math.round(b.radius * 0.9) + 'px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.letter, 0, 0);
      } else if (b.emoji) {
        ctx.font = Math.round(b.radius * 1.1) + 'px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.emoji, 0, 2);
      }

      ctx.restore();
    }

    // Draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;

      if (p.type === 'star') {
        drawStar(ctx, 0, 0, 5, p.size, p.size * 0.45);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function loop() {
    update();
    render();
    if (isRunning) {
      requestAnimationFrame(loop);
    }
  }

  function startLoop() {
    if (!isRunning) {
      isRunning = true;
      requestAnimationFrame(loop);
    }
  }

  return {
    init: init,
    burst: burst,
    spawnBubble: spawnBubble,
    checkBubbleTap: checkBubbleTap,
    clearBubbles: clearBubbles
  };
})();
