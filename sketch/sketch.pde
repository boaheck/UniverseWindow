int amount = 100;

void setup() {
  size(512,512);
  noStroke();
  ellipseMode(RADIUS);
  background(randColor());
  for(int i = 0; i < amount; i++) {
    float x = random(width);
    float y = random(height);
    float size = random(10,512);
    fill(randColor());
    ellipse(x,y,size,size);
  }
  save("output.png");
}

color randColor(){
  int r = round(random(255));
  int g = round(random(255));
  int b = round(random(255));
  int a = round(random(100));
  return color(r,g,b,a);
}