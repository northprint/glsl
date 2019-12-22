precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.1 * time;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= dot(lng, lng) + 0.5;

  st = mod(st,1.0);
  st -= 0.5;
  float p = 0.05 / abs(0.5 - length(st));

  vec3 color = vec3(smoothstep(p - 0.5,p,1.0));

  for (float i = -1.0; i < 2.0; ++i) {
    p = 0.05 / abs(0.5 - length(st + (i * 0.5)));
    color *= vec3(smoothstep(p - 0.5, p ,0.8),smoothstep(p - 0.5, p ,0.5),smoothstep(p - 0.5, p ,0.2));
  }

  gl_FragColor = vec4(color, 1.0);
}
