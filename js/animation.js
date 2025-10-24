const app = new PIXI.Application({
  resizeTo: window,
  backgroundAlpha: 0, 
});

document.body.appendChild(app.view);

app.view.style.position = "fixed";
app.view.style.top = 0;
app.view.style.left = 0;
app.view.style.width = "100vw";
app.view.style.height = "100vh";
app.view.style.zIndex = -1;
app.view.style.pointerEvents = "none";

const container = new PIXI.Container();
app.stage.addChild(container);

const themePalettes = {
  'black-lava': ["ff0015", "8B0000", "900603", "A52A2A", "b22222"],
  'ocean-green': ["0EA5E9", "06B6D4", "38BDF8", "2DD4BF", "22D3EE"]
};

let currentColors = themePalettes['black-lava'];

const blurFilter2 = new PIXI.BlurFilter();
blurFilter2.blur = 300;
blurFilter2.quality = 35;
container.filters = [blurFilter2];

function setOrbColors(themeName) {
  if (themePalettes[themeName]) {
    currentColors = themePalettes[themeName];
  }
}

function randomCircle() {
  const circle = new PIXI.Graphics();
  const randomColor = Math.floor(Math.random() * currentColors.length);
  circle.beginFill(parseInt(currentColors[randomColor], 16));
  circle.drawCircle(0, 0, (Math.random() * app.screen.width) / 4);
  circle.endFill();
  const texture = app.renderer.generateTexture(circle);
  return { texture };
}

const orbs = [];
const padding = app.screen.width / 3;
const bounds = new PIXI.Rectangle(
  -padding,
  -padding,
  app.screen.width + padding * 2,
  app.screen.height + padding * 2
);

for (let i = 0; i < 20; i++) {
  const orb = PIXI.Sprite.from(randomCircle().texture);
  orb.anchor.set(0.5);
  orb.x = Math.random() * bounds.width;
  orb.y = Math.random() * bounds.height;
  orb.direction = Math.random() * Math.PI * 2;
  orb.speed = 1;
  orb.turnSpeed = Math.random() - 0.8;
  orb.scale.set(1 + Math.random() * 0.3);
  orb.original = new PIXI.Point();
  orb.original.copyFrom(orb.scale);
  container.addChild(orb);
  orbs.push(orb);
}

let count = 0;
app.ticker.add(() => {
  count += 0.02;
  for (let i = 0; i < orbs.length; i++) {
    const orb = orbs[i];
    orb.direction += orb.turnSpeed * 0.01;
    orb.x += Math.sin(orb.direction) * orb.speed;
    orb.y += Math.cos(orb.direction) * orb.speed;
    orb.rotation = -orb.direction - Math.PI / 2;
    orb.scale.x = orb.original.x + Math.sin(count) * 0.2;

    if (orb.x < bounds.x) orb.x += bounds.width;
    if (orb.x > bounds.x + bounds.width) orb.x -= bounds.width;
    if (orb.y < bounds.y) orb.y += bounds.height;
    if (orb.y > bounds.y + bounds.height) orb.y -= bounds.height;
  }
});

function updateOrbs() {
  orbs.forEach(orb => {
    const circle = new PIXI.Graphics();
    const randomColor = Math.floor(Math.random() * currentColors.length);
    circle.beginFill(parseInt(currentColors[randomColor], 16));
    circle.drawCircle(0, 0, (Math.random() * app.screen.width) / 4);
    circle.endFill();
    orb.texture = app.renderer.generateTexture(circle);
  });
}

window.updateOrbsForTheme = function(themeName) {
  console.log(`Atualizando orbes para o tema: ${themeName}`);
  setOrbColors(themeName);
  updateOrbs();
};

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'black-lava';
  setOrbColors(savedTheme);
});
