class Waves {
  constructor(options) {
    this.container = options.dom;

    this.perlin = new SimplexNoise();

    this.randomness = [];
    this.parameters = [];
    this.parameters.factor = 0.075;
    this.parameters.variation = 0.001;
    this.parameters.amplitude = 10;
    this.parameters.lines = 2;
    this.parameters.waveColor = { r: 225, g: 29, b: 72, a: 1 };
    this.parameters.shadowColor = { r: 13, g: 14, b: 76, a: 1 };
    this.parameters.shadowBlur = 1;
    this.parameters.lineStroke = 2;
    this.parameters.speed = 0.01;

    this.mouse = new Mouse(0, 0);

    this.setupCanvas();
    this.setSizes();
    this.setupRandomness();
    this.drawPaths();
    this.render();
    this.setupResize();
    this.setupMouseEvent();
  }

  setupCanvas() {
    this.context = this.container.getContext("2d");
    this.container.width = this.width * this.pixelRatio;
    this.container.height = this.height * this.pixelRatio;
    this.context.scale(this.pixelRatio, this.pixelRatio);
  }

  setSizes() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.container.width = this.width;
    this.container.height = this.height;
  }

  setupRandomness() {
    for (
      let i = 0, rand = 0;
      i < this.parameters.lines;
      i++, rand += this.parameters.factor
    ) {
      this.randomness[i] = rand;
    }
  }

  drawPaths() {
    this.context.shadowColor =
      "rgba(" +
      this.parameters.shadowColor.r +
      ", " +
      this.parameters.shadowColor.g +
      ", " +
      this.parameters.shadowColor.b +
      "," +
      this.parameters.shadowColor.a +
      ")";
    this.context.shadowBlur = this.parameters.shadowBlur;
    this.context.lineWidth = this.parameters.lineStroke;

    for (let i = 0; i <= this.parameters.lines; i++) {
      this.context.beginPath();
      this.context.moveTo(0, this.height / 2);

      let randomY = 0;
      for (let x = 0; x <= this.width; x++) {
        randomY = this.perlin.noise3D(
          x * this.parameters.variation + this.randomness[i],
          x * this.parameters.variation,
          1
        );
        this.context.lineTo(
          x,
          this.height / 2 +
            (this.parameters.amplitude + Math.random() * 0.005) * randomY
        );
      }

      this.alpha = 0.1;
      this.context.strokeStyle =
        "rgba(" +
        this.parameters.waveColor.r +
        ", " +
        this.parameters.waveColor.g +
        ", " +
        this.parameters.waveColor.b +
        "," +
        this.alpha * 2 +
        ")";
      this.context.stroke();
      this.context.closePath();
      this.randomness[i] += this.parameters.speed;
    }
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  setupMouseEvent() {
    window.addEventListener("mousemove", (evt) => {
      if (evt.pageY != this.mouse.y && evt.pageX != this.mouse.x) {
        let diffX = Math.abs(evt.pageX - this.mouse.x);
        let diffY = Math.abs(evt.pageY - this.mouse.y);

        this.mouse.setPosition(diffX, diffY);

        let diff = this.mouse.getMagnitude();

        this.parameters.amplitude += diff / 500;

        this.mouseY = evt.pageY;
      }
    });
  }

  changeColor(hex) {
    var color = hexToRgbA(hex);
    this.parameters.waveColor = {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a,
    };
  }

  resize() {
    this.setSizes();
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);

    //change params
    this.parameters.amplitude -= 0.4;

    if (this.parameters.amplitude < 5) {
      this.parameters.amplitude = 5;
    }
    if (this.parameters.amplitude > 50) {
      this.parameters.amplitude = 50;
    }

    this.drawPaths();

    window.requestAnimationFrame(this.render.bind(this));
  }
}

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");

    var obj = { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255, a: 1 };
    return obj;
  }
  throw new Error("Bad Hex");
}
