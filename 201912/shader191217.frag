precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.5 * time;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= dot(lng, lng) + 1.0 + sin(time * 0.2);

  st *= 2.0;
  float p = length(sin(st + time));

  vec3 color = vec3(1.0);

  if (st.x < 1.0){
    color *= vec3(smoothstep(p - 0.5, p ,0.2),smoothstep(p - 0.5, p ,0.5),smoothstep(p - 0.5, p ,0.8));
  } else {
    color *= vec3(smoothstep(p - 0.5, p ,0.8),smoothstep(p - 0.5, p ,0.5),smoothstep(p - 0.5, p ,0.2));
  }

  gl_FragColor = vec4(color, 1.0);
}
