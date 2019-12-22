precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = (gl_FragCoord.xy
     * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.1 * time;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st /= 0.1 + dot(lng, lng) * 1.5;

  st *= 10.0;
  st = mod(st,2.0);
  st -= 1.0;

  vec2 a = mod(st, 1.0);
  vec2 id = st - a;

  vec3 color = vec3(step(length(st) - 0.1,0.5),0.0,0.0);
  color -= vec3(length(id));
  color += vec3(sin(st.x + time) * cos(st.y + time));

  gl_FragColor = vec4(color, 1.0);
}
