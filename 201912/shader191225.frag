precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v + 0.1, v, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) * 8.0 - time * 3.0 + lng * 10.0;
  float at2 = atan(st.y, st.x) * 30.0 + time * 2.0;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= 1.0 + dot(lng, lng);

  vec2 st2 = vec2(cos(at2) * lng , sin(at2) * lng);
  st2 *= 1.0 + dot(lng, lng);

  vec3 color = vec3(1.0);
  color *= vec3(plot(st, st.x + st.y),plot(st, sin(time)),plot(st, cos(time)));
  color += vec3(plot(st2, sin(st2.x - time) - 1.0));
  color -= vec3(length(st2 + 1.0));

  gl_FragColor = vec4(color, 1.0);
}
