let Particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  for (let i = 0; i < 10; i++) {
    p = new Particle(random(width), random(height), 20);
    Particles.push(p);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < Particles.length; i++) {
    Particles[i].update(i);
    Particles[i].show();
    for(let j = 0; j < Particles.length; j++){
      if(i != j){
        Particles[i].atract(Particles[j]);
      }
    }
  }
}

class Particle {
  constructor(x, y, m) {
    this.index = Particles.length;
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0,0);
    this.color = color(random(255), random(255), random(255));
    this.mass = m;
  }

  show() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.mass/4);
  }

  update(i) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.index = i;
  }

  atract(p) {
    let force = createVector(this.pos.x - p.pos.x, this.pos.y - p.pos.y);
    let distance = force.mag();
    force.normalize();
    let strength = (this.mass * p.mass) / (distance * distance);
    if(strength > 3){strength = 3}
    force.mult(strength/5);
    this.acc.sub(force);
  }
}