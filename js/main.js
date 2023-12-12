const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class DigitalDropplet {
  constructor(x, y, fontSize, canvasHeight) {
    this.characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.jpnCharacters = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    this.numbers = '0123456789';
    this.allCharacters = this.characters + this.jpnCharacters + this.numbers;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
    this.text = '';
  }
  draw(context) {
    this.text = this.allCharacters[Math.floor(Math.random() * this.allCharacters.length)];
    ctx.shadowColor="#32CD32";
    ctx.shadowBlur=7;
    ctx.lineWidth=4;
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
    ctx.shadowBlur=0;
    ctx.lineWidth=0;
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.975) {
      this.y = 0;
    } else {
      this.y++;
    }
  }
}

class Manager {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.fontSize = 25;
    this.nearFontSize = 60;
    this.numOfDroplets = this.canvasWidth / this.fontSize;
    this.nearNumOfDroplets = this.canvasWidth / this.nearFontSize;
    this.droplets = [];
    this.nearDroplets = [];
    this.#init();
    console.log(this.droplets);
  }
  #init() {
    for (let i = 0; i < this.numOfDroplets; i++) {
      this.droplets.push(new DigitalDropplet(i, this.canvasHeight, this.fontSize, this.canvasHeight));
    }
    for (let i = 0; i < this.nearNumOfDroplets; i++) {
      this.nearDroplets.push(new DigitalDropplet(i, this.canvasHeight, this.nearFontSize, this.canvasHeight));
    }
  }
  windowResize(width, height) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.numOfDroplets = this.canvasWidth / this.fontSize;
    this.nearNumOfDroplets = this.canvasWidth / this.nearFontSize;
    this.droplets = [];
    this.nearDroplets = [];
    this.#init();
  }
}

const manager = new Manager(canvas.width, canvas.height);
let lastTime = 0;
const fps = 25;
const nextTime = 1000 / fps;
let timer = 0;

let animate = (timeStamp) => {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if (timer > nextTime) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#32CD32";
    ctx.textAlign = 'center';

    ctx.font = manager.fontSize + 'px trebuchet ms';
    manager.droplets.forEach(droplet => {
      if (Math.random() > 0.05) {
        droplet.draw(ctx);
      }
    });
    ctx.font = manager.nearFontSize + 'px trebuchet ms';
    manager.nearDroplets.forEach(nearDroplet => {
      if (Math.random() > 0.05) {
        nearDroplet.draw(ctx);
      }
    });
    timer = 0;
  } else {
    timer += deltaTime;
  }
  requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  manager.windowResize(canvas.width, canvas.height);
});
