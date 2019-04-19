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

void main(){
    vec2 st = gl_FragCoord.st/resolution.x;
    float rows = 20.0;
    vec2 ipos = floor(st*rows);
    vec2 fpos = fract(st*rows);

    ipos += vec2(0.5,floor(time*5.0*random(ipos.x+3.0)));
    float pct = random(ipos);
    vec3 color = vec3(pattern(fpos,100.*pct));
    color = mix(color,vec3(color.r,color.g*0.2,color.b*0.8),step(.5,pct));

    gl_FragColor = vec4( color , 1.0);
}
