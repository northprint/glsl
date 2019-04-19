precision mediump float;
uniform float time;
uniform vec2 resolution;

float random(in float x){ return fract(sin(x)*43758.5453); }
float random(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float pattern(vec2 st, float n){
    vec2 grid = vec2(3.,5.);

    vec2 ipos = floor(st*grid);
    vec2 fpos = fract(st*grid);

    n = floor(mod(n,10.));
    float pct = 0.0;
    if (n < 1. ) { pct = st.y-st.x+0.5;; }
    else if (n < 2. ) { pct = st.x; }
    else if (n < 3. ) { pct = st.y; }
    else if (n < 4. ) {  pct = max(st.x,st.y); }
    else if (n < 5. ) {  pct = circle(st-1.0,0.5); }
    else if (n < 6. ) {  pct = circle(st,0.5); }
    else if (n < 7. ) {  pct = min(st.x,st.y); }
    else if (n < 8. ) {  pct = st.x-st.y+0.5; }
    else if (n < 9. ) {  pct = circle(vec2(st.x-0.5,st.y-1.0),0.01); }
    else if (n < 10. ) { pct = circle(vec2(st.x-0.5,st.y),0.01); }

    return step(.5,1.0-pct);
}

float linearstep(float begin, float end, float t) {
  return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

vec3 rndColoer(float t){

  float rndNum = abs(random(linearstep(0.0, 0.5, mod(t, 2.0))) * 5.0);
  int num = int(sign(rndNum) * floor(abs(rndNum)));


  vec3 mikuColors[5];
  mikuColors[0] = vec3(.075,.478,.498);
  mikuColors[1] = vec3(.525,.808,.796);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  vec3 mixColor = vec3(1.0);
  if (num == 0) {mixColor = mikuColors[0];}
  if (num == 1) {mixColor = mikuColors[1];}
  if (num == 2) {mixColor = mikuColors[2];}
  if (num == 3) {mixColor = mikuColors[3];}
  if (num == 4) {mixColor = mikuColors[4];}

  return mixColor;
}

void main(){
    vec2 st = gl_FragCoord.st/resolution.x;
    float rows = 30.0;
    vec2 ipos = floor(st*rows);
    vec2 fpos = fract(st*rows);

    ipos += vec2(floor(time*random(ipos.x)),floor(time*random(ipos.y)));
    float pct = random(ipos);
    float a = atan(ipos.y,ipos.x)+(time*0.05);
    vec3 color = vec3(pattern(fpos,100.*pct*a));

    color = mix(color,rndColoer(ipos.x * ipos.y),pct);

    gl_FragColor = vec4( color , 1.0);
}
