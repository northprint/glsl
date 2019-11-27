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

  st*= 5.0 * rotate(time * 0.1);
  vec2 id = mod(st,2.0);
  id -= 1.0;

  float t = time * 3.0;
  vec3 color = vec3(
    sin(length(id) * st.x + t + 0.5),
    sin(length(id) * st.x + time),
    sin(length(id) * st.x + t - 0.5));
  color -=
    vec3(
      sin(length(id) * st.y - time + 0.5),
      sin(length(id) * st.y + t),
      sin(length(id) * st.y - time - 0.5)
    );
    color += vec3(0.8,0.3,0.5) * 0.5;

  gl_FragColor = vec4(color, 1.0);

}
