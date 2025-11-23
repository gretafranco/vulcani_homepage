
let t = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.id("p5-background-canvas");
  pixelDensity(1);
  noStroke();
}

function draw() {
  loadPixels();

  let scale = 0.0013;     // leggermente più grande → forme più “morbide”
  let flow = 0.002;       // t cresce più velocemente → movimento più visibile
  t += flow;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      // coordinate base
      let nx = x * scale;
      let ny = y * scale;

      // --- DOMAIN WARP POTENZIATO ---
      let warp1x = (noise(nx + t * 0.8, ny, t * 0.4) * 2 - 1) * 1.2;
      let warp1y = (noise(nx, ny + t * 0.8, t * 0.4) * 2 - 1) * 1.2;

      // secondo warp per effetto “melting”
      let warp2x = (noise(nx * 0.6 + t * 0.5, ny * 0.6, t) * 2 - 1) * 0.9;
      let warp2y = (noise(nx * 0.6, ny * 0.6 + t * 0.5, t) * 2 - 1) * 0.9;

      // coordinate finali deformate
      let fx = nx + warp1x + warp2x;
      let fy = ny + warp1y + warp2y;

      // noise finale
      let n = noise(fx, fy, t * 0.3);

      // smoothstep
      n = smoothstep(0.22, 0.82, n);

      // curva luminosa
      let heat = pow(n, 1.7);

      // colore lava
      let col = lavaColor(heat);

      let idx = (x + y * width) * 4;
      pixels[idx] = col[0];
      pixels[idx + 1] = col[1];
      pixels[idx + 2] = col[2];
      pixels[idx + 3] = 255;
    }
  }

  updatePixels();
}


// --- funzioni di supporto --- //

function smoothstep(a, b, x) {
  x = constrain((x - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
}

function lavaColor(h) {
  // FF2B00 → (255, 43, 0)
  let r = lerp(10, 255, h);
  let g = lerp(2, 43, pow(h, 0.6));
  let b = lerp(0, 0, h);

  if (h > 0.7) {
    let k = map(h, 0.7, 1.0, 0, 1);
    r = lerp(r, 255, k);
    g = lerp(g, 220, k);
    b = lerp(b, 150, k);
  }

  return [r, g, b];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

