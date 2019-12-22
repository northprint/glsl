precision mediump float;
uniform float time;
uniform vec2 resolution;

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float wave(vec2 st, float n) {
    vec2 st2 = st * n;
    float d = length(st * 2.0) - 0.5;
    return d * 0.1 + (sin(st2.x + time) * sin(st2.y + time)) + (sin(-st2.x + time) * sin(st2.y + time));
}

float circle_wave(vec2 uv, float n){
    vec2 st = fract(uv * n) - 0.5;
    float size = wave(uv, n);
    return 1.0 - circle(st, size);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.1 * time * 2.0;
  st = vec2(cos(at) * lng , sin(at) * lng);

  vec2 st2 = st / (0.01 + dot(lng, lng));
  st *= sin(time * 0.5) + dot(lng, lng);

  st = mod(st,1.0);
  st -= 0.5;

  st2 *= 2.0;
  st2 = mod(st2,1.0);
  st2 -= 0.5;

  vec3 color = vec3(abs(cos(st2.x + time)) * abs(cos(st2.y + time)));
  color *= vec3(length(st2),0.5,0.8);
  color *= vec3(circle_wave(st, 5.0),circle_wave(st, 2.0),circle_wave(st, 1.0));


  gl_FragColor = vec4(color, 1.0);
}
