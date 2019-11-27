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
  float at = atan(st.y, st.x) + lng * 1.2;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.2);
  st *= 2.0 + dot(lng, lng) * 0.5 + sin(time) + 1.2;

  vec2 id = st * 1.0 + time;
  vec3 color = vec3(
    sin(length(id * 10.0)),
    sin(length(id * 20.0) - 3.0),
    sin(length(id * 10.0) + 3.0));

  gl_FragColor = vec4(color, 1.0);

}
