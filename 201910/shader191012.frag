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

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  // First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );


  // Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);

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

    pct = snoise(vec2(pct));

    return step(0.5,pct);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float rows = 10.0;
    vec2 ipos = floor(st * rows);
    vec2 fpos = fract(st * rows);

    ipos += vec2(0.5, floor( time * 1.0 * rand(ipos.y + 6.0)));
    float pct = rand(ipos);

    st  *= 20.0;
    vec2 m = mod(st, 1.0);
    vec2 id = st * vec2(rand(st - m));

    id= vec2(snoise(id));

    vec3 color = vec3( abs(cos(id.y + time)),
      abs(cos(id.y + time * 3.0)),
      abs(cos(id.y + time * 6.0)));

      color *= vec3(pattern(fpos,100.0 * pct));
    gl_FragColor = vec4(color, 1.0);
}
