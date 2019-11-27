precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // bump
  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 0.8;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.2);
  st *= 5.0 + dot(lng, lng) * 0.5 + sin(time) + 1.2;

  vec2 id = st * 1.0 + time * 2.0;
  vec3 color = vec3(
    sin(length(id.x)),
    sin(length(id.x) - 2.0),
    sin(length(id.x) + 2.0));

  color += vec3(sin(st.x) + 0.2);
  color += vec3(cos(st.y) + 0.2);

  gl_FragColor = vec4(color, 1.0);

}
