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
  float at = atan(st.y, st.x) + lng * 2.5;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.2);
  st *= 3.0 + dot(lng, lng) * 0.5;

  vec2 id = st;
  vec3 color = vec3(
    sin(length(id * 4.0) * id.x + time * 1.0),
    sin(length(id * 4.0) * id.x + time * 2.0),
    sin(length(id * 4.0) * id.x + time));

  color += 1.0 - vec3(
    sin(length(id * 4.0) * id.y + time * 2.0),
    sin(length(id * 4.0) * id.y + time * 2.0),
    sin(length(id * 4.0) * id.y + time));

  color += 1.0 - vec3(length(st.x * st.y));

  gl_FragColor = vec4(color, 1.0);

}
