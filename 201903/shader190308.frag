precision mediump float;
uniform float time;
uniform vec2 resolution;

float rnd(float seed){
  return fract(sin(seed) * 43758.5453);
}

float circle(vec2 r,vec2 center,float radius){
  return 1.0 - smoothstep(radius - 0.005, radius + 0.005, length(r-center));
}

void main() {

  vec2 st = 2.0 * vec2(gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
  vec3 bgCol = vec3(1.0);
  vec3 col1 = vec3(0.2, 0.4, 0.7);
  vec3 col2 = vec3(1.00, 0.4, 0.8);

  vec3 ret = bgCol;

  for(float i=0.0; i<100.0; i++) {
    float seed = i * 0.5;
    float radius = rnd(seed + 3.5) + sin( 5.0 * time * rnd(seed * i));
    vec2 pos = vec2(0.0);
    if (radius > 0.8){
      pos = (vec2(rnd(seed), rnd(seed + 0.5)) - 0.5) * 3.0;
    } else {
      pos = (vec2(rnd(seed), rnd(seed + 0.5) + fract(time)) - 0.5) * 3.0;
    }
    vec3 col = vec3(0.0);
    if (i > 80.0){
      col = col1;
    } else {
      col = col2;
    }
    ret = mix(ret, col, circle(st, pos, 0.1 * radius));
  }
  gl_FragColor = vec4(ret,1.0);
}
