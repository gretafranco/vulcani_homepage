let lines = [];
const numLines = 100;
const noiseScale = 0.008;
let timeOffset = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Sfondo: dietro a tutto
  canvas.style('pointer-events', 'none'); // Non interferisce con click/touch
  background(5, 0, 0); // Nero con traccia di rosso

  // Genera linee iniziali
  for (let i = 0; i < numLines; i++) {
    lines[i] = [];
    const yStart = map(i, 0, numLines - 1, height * 0.1, height * 0.9);
    for (let x = 0; x < width; x += 8) {
      lines[i].push(x);
    }
  }
}

function draw() {
  // Imposta lo sfondo del canvas su bianco o quasi bianco.
  // background(255); per bianco solido.
  // background(255, 255, 255, 15); per bianco con effetto trascinamento leggero.
  background(255, 255, 255, 15);
  timeOffset += 0.01;

  for (let i = 0; i < lines.length; i++) {
    stroke('#ff2a00ff');
    strokeWeight(2);
    noFill();

    beginShape();
    for (let j = 0; j < lines[i].length; j++) {
      const x = lines[i][j];
      const yBase = map(i, 0, lines.length - 1, height * 0.1, height * 0.9);
      const noiseVal = noise(
        x * noiseScale,
        yBase * noiseScale,
        timeOffset + i * 0.05
      );
      const yOffset = map(noiseVal, 0, 1, -40, 40);
      const y = yBase + yOffset;
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}