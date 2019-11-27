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
  float at = atan(st.y, st.x) + lng * 10.0;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.2);
  st *= 2.0 + dot(lng, lng) * 0.1;

  vec2 id = st * rotate(time * 0.5) * 1.5;
  vec3 color = vec3(
    sin(length(id * 4.0) * id.x + time * 2.0) * 5.0,
    sin(length(id * 4.0) * id.x + time * 2.0) * 1.0,
    sin(length(id * 4.0) * id.x + time) * 0.2);

color += 1.5 - vec3(length(st.x));

  gl_FragColor = vec4(color * 0.4, 1.0);

}
