precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.2 * time;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 15.0 + dot(lng, lng) * 0.5 + sin(time);

  vec2 a = mod(st, sin(time));
  vec2 id = st - a;

  vec3 color = vec3(0.0,sin(id.x),sin(id.y));

  st *= 20.0;
  vec2 id2 = st - mod(st, cos(time));
  color += 1.0 - vec3(sin(id2.x),sin(id.y),sin(id2.y));

  gl_FragColor = vec4(color, 1.0);
}
