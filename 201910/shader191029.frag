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
  float at = atan(st.y, st.x) + lng * 0.01;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.05);
  st *= 2.0 + dot(lng, lng) * 0.5 + sin(time * 2.0);

  vec2 id = st;
  vec3 color = vec3(
    sin(length(id * 2.0) * id.x),
    cos(length(id * 2.0) * id.x - 1.0),
    sin(length(id * 2.0) * id.x + 1.0));

color *= 1.0 - vec3(length(st));

  gl_FragColor = vec4(color, 1.0);

}
