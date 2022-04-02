//first class for the clear/eraser function
//it turns the background white
class Eraser {
  constructor(size, color, shape) {
    this.shape = shape;
    this.px = pwinMouseX;
    this.py = pwinMouseY;
    this.x = mouseX;
    this.y = mouseY;

    this.size = size;
    this.color = color;
  }

  paint() {
    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 20);
  }
}
var eraser1 = [];

//class for the brush stroke
//uses current and previous x and y coordinates to draw a line
class Brush {
  constructor(strokeweight, penColor) {
    this.px = pwinMouseX;
    this.py = pwinMouseY;
    this.x = winMouseX;
    this.y = winMouseY;

    this.strokeweight = strokeWeight;

    this.penColor = penColor;
  }

  //this is the part that "paints"
  //the stroke is the drawing and its pen colour
  paint() {
    stroke(this.penColor);
    line(this.px, this.py, this.x, this.y);
  }
}

//list of variables, the brush, pen colour, strokeweight (of pen), posX, posY and speedX, speedY for the welcome screen imagery
var brush1 = [];
var penColor;
var strokeweight;
var posX, posY;
var speedX;

function setup() {
  createCanvas(600, 600);
  background(255);

  //setting initial position for the decorative ellipse
  posX = 0;
  posY = 100;

  //speed of the ellipses
  speedX = 1;

  //color picker to change the pen's color
  let div = createDiv("color");
  {
    div.style("display", "none");
    div.show();
  }

  penColor = createColorPicker("#ed225d");
  penColor.position(20, height - 50);

  eraser1 = new Eraser(20, 255, ellipse);

  welcome = 0;
}

function draw() {
  clear();
  //initial welcome screen, if = to 0 it will play, when ENTER is pressed,
  // welcome = 1 and access to the drawing tool
  if (welcome == 0) {
    background(50);

    textSize(50);
    fill(255);
    text("Welcome", 175, height / 2);
    textSize(30);
    text("Press ENTER to start", 145, height / 2 + 50);

    //updating positions according to speed
    posX += speedX;

    //edges
    if (posX >= 700) {
      posX = -480;
    }

    //blending the colours of the overlapping ellipses
    blendMode(ADD);

    fill(247, 231, 161);
    ellipse(posX + 160, posY - 20, 150, 100);
    fill(209, 96, 179);
    ellipse(posX, posY, 200, 150);
    fill(107, 237, 194);
    ellipse(posX + 20, posY + 100, 100, 150);
    fill(190, 104, 150);
    ellipse(posX + 300, posY + 400, 200, 245);
    fill(90, 129, 230);
    ellipse(posX + 390, posY + 360, 175, 150);
    fill(255, 184, 84);
    ellipse(posX + 200, posY + 440, 250, 100);
  }

  if (welcome == 1) {
    //text to tell user what does what
    textSize(24);
    text("Press mouse to draw", 10, 30);
    fill(0, 102, 153);

    textSize(24);
    text("Press any key to clear", width / 2 + 50, 30);
    fill(0, 102, 153);

    textSize(20);
    text("Change Pen Color", 80, height - 30);

    // if key is pressed it will paint the background white
    if (keyIsPressed) {
      eraser1.paint(line);
      background(255);
      clearBackground = true;
      brush1 = [];
    }
    // when the mouse is pressed it will draw a stroke
    if (mouseIsPressed) {
      var line = new Brush(4, penColor.value());
      brush1.push(line);
    }

    for (var line of brush1) {
      line.paint();
    }
  }
}
//if the ENTER key is pressed, welcome = 1 and the welcome screen disapears
function keyPressed() {
  if (keyCode === ENTER) {
    welcome = 1;
  }
}
