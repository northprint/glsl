precision mediump float;
uniform float time;
uniform vec2 resolution;

float rand(in float x){ return fract(sin(x)*43758.5453); }
highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float pattern(vec2 st, float n){
    n = floor(mod(n,10.0));
    float pct = 0.0;
    if (n < 1. ) { pct = st.y-st.x+0.5;; }
    else if (n < 2.0 ) { pct = st.x; }
    else if (n < 3.0 ) { pct = st.y; }
    else if (n < 4.0 ) {  pct = max(st.x,st.y); }
    else if (n < 5.0 ) {  pct = circle(st-1.0,0.5); }
    else if (n < 6.0 ) {  pct = circle(st,0.5); }
    else if (n < 7.0 ) {  pct = min(st.x,st.y); }
    else if (n < 8.0 ) {  pct = st.x-st.y+0.5; }
    else if (n < 9.0 ) {  pct = circle(vec2(st.x-0.5,st.y-1.0),0.01); }
    else if (n < 10.0 ) { pct = circle(vec2(st.x-0.5,st.y),0.01); }

    return step(0.5,fract(pct));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float rows = 3.0;
    vec2 ipos = floor(st * rows);
    vec2 fpos = fract(st * rows);

    ipos += vec2(0.5, floor( time * 5.0 * rand(ipos.y + 3.0)));
    float pct = rand(ipos);

    st  *= 20.0;
    vec2 m = mod(st, 1.0);
    vec2 id = st * vec2(rand(st - m));


    vec3 color = vec3( cos(id.y + time),
      cos(id.y + time * 3.0),
      cos(id.y + time * 6.0));

      color += vec3(sin(id.x + time) + sin(st.y * 10.0) * 1.5,
        cos(id.x + time * 2.0) * cos(st.y * 8.0) * 1.5,
        cos(id.x + time * 6.0) * cos(st.y * 5.0) * 3.0);

      color *= vec3(pattern(fpos,100.0 * pct));
    gl_FragColor = vec4(color, 1.0);
}
