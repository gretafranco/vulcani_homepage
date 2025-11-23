let noiseScale = 0.002; // Riduci noiseScale per forme più GRANDI e meno dettagliate
let speed = 0.0003;    // Riduci la velocità per un movimento più lento e graduale
let t = 0;             // Variabile temporale per l'animazione

// Buffer per una maggiore fluidità nella transizione dei colori (opzionale, ma può aiutare)
// let graphics; 

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.id('p5-background-canvas');
    
    // Non abbiamo bisogno di frameRate esplicito, 60fps di default è ok
    noStroke(); 
    pixelDensity(1); // Importante per performance e consistenza su schermi ad alta densità
    
    // Inizializza il buffer (se usato)
    // graphics = createGraphics(width, height);
    // graphics.noStroke();
    // graphics.pixelDensity(1);
}

function draw() {
    // Aggiorna la variabile temporale per l'animazione
    t += speed;

    // Se usi un buffer:
    // graphics.loadPixels();
    // for (let x = 0; x < graphics.width; x++) {
    //     for (let y = 0; y < graphics.height; y++) {
    //         // ... (logica del rumore) ...
    //         // graphics.pixels[index] = r;
    //         // ...
    //     }
    // }
    // graphics.updatePixels();
    // image(graphics, 0, 0); // Disegna il buffer sul canvas principale


    loadPixels(); // Carica i pixel del canvas principale

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            
            // Generazione del valore di rumore di Perlin
            // Nota l'uso di una coordinata Y leggermente più compressa (y*1.5) per dare una direzione più "verticale"
            // al flusso, come la lava che sale/scende, e il rumore è leggermente offset in Y
            let noiseVal = noise(
                x * noiseScale, 
                y * noiseScale * 1.5 + t * 50, // Aggiungi un offset a Y legato al tempo per "flusso"
                t
            );

            let r, g, b;

            // Rivedi la mappatura dei colori per un effetto più sfumato e caldo
            // Mappiamo il rumore in un range che va da un nero profondo a un giallo brillante,
            // passando per rossi e arancioni.

            // Colori di riferimento:
            // Nero: (0,0,0)
            // Rosso Scuro: (150,0,0)
            // Arancione Scuro: (200,80,0)
            // Arancione Brillante: (255,165,0)
            // Giallo Caldo: (255,200,50)
            // Giallo Pallido/Bianco: (255,255,200)

            if (noiseVal < 0.3) {
                // Dal nero al rosso molto scuro
                r = map(noiseVal, 0.0, 0.3, 0, 150);
                g = map(noiseVal, 0.0, 0.3, 0, 0); // Verde sempre 0 qui
                b = map(noiseVal, 0.0, 0.3, 0, 0); // Blu sempre 0 qui
            } else if (noiseVal < 0.5) {
                // Dal rosso scuro all'arancione scuro
                r = map(noiseVal, 0.3, 0.5, 150, 200);
                g = map(noiseVal, 0.3, 0.5, 0, 80);
                b = map(noiseVal, 0.3, 0.5, 0, 0);
            } else if (noiseVal < 0.7) {
                // Dall'arancione scuro all'arancione brillante
                r = map(noiseVal, 0.5, 0.7, 200, 255);
                g = map(noiseVal, 0.5, 0.7, 80, 165);
                b = map(noiseVal, 0.5, 0.7, 0, 0);
            } else {
                // Dall'arancione brillante al giallo pallido/bianco
                r = map(noiseVal, 0.7, 1.0, 255, 255);
                g = map(noiseVal, 0.7, 1.0, 165, 255);
                b = map(noiseVal, 0.7, 1.0, 0, 200);
            }
            
            let index = (x + y * width) * 4;
            pixels[index] = r;      
            pixels[index + 1] = g;  
            pixels[index + 2] = b;  
            pixels[index + 3] = 255; 
        }
    }

    updatePixels(); 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}