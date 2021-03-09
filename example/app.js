// @ts-nocheck

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
  textFont("Times New Roman")
}

function draw() {
  background(0);
  markupText("<b>Hello</b>, World!", 50, 50)
}