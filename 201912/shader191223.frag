precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v + 0.1, v, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) * 12.0 + time;
  float at2 = atan(st.y, st.x) * 6.0 + time * 2.0;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= 1.0 + dot(lng, lng);

  vec2 st2 = vec2(cos(at2) * lng , sin(at2) * lng);
  st2 *= 1.0 + dot(lng, lng);

  st = mod(st,1.0);
  st -= 0.5;
  st *= 2.0;
  vec3 color = vec3(1.0);
  color *= vec3(plot(st, 0.1),plot(st, st.x + st.y),plot(st, 0.5));
  color -= vec3(plot(st2, 0.3),plot(st2, st2.x + st2.y),plot(st2, 1.0));

  gl_FragColor = vec4(color, 1.0);
}
