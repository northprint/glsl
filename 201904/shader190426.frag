precision mediump float;
uniform float time;
uniform vec2 resolution;

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
// Author: @patriciogv
// Title: CellularNoise

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

vec2 box(vec2 st, float size) {
    size = 0.5 + size * 0.5;
    vec2 st2 = vec2(step(st.x, size) * step(1.0 - (st.y), size))
     * vec2(step(st.y, size) * step(1.0 - (st.x), size));
    return st2;
}

float wave(vec2 st, float n) {
    st = vec2(noise((floor(st * n) + 0.5) / n));
    float d = distance(0.5, st.x + st.y) + distance(0.0, -st.x + st.y);
    return (noise(vec2(d * 5.0 - time * 5.0))) * 0.5;
}

float box_wave(vec2 uv, float n){
    vec2 st = fract(uv * n);
    float size = wave(uv, n);
    return box(st, size).y;
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    vec3 color = vec3(0.0);
    st *= 10.0;

    color = vec3(box_wave(st, 48.0),box_wave(st, 0.0),box_wave(st, 12.0));
    color = mix(color,vec3(1.0,0.0,0.0), box_wave(st, 24.0));

    gl_FragColor = vec4(color, 1.0);
}
