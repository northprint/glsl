precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v + 0.1, v, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 0.3;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= 0.8 + dot(lng, lng);

  st *= 5.0;
  st = mod(st,10.0);
  st -= 5.0;

  float p1 = abs(sin(st.x) + cos(st.x/0.8 + time * -1.0) + clamp(st.x, -5.0, 5.0));
  float p2 = abs(sin(st.x) + cos(st.x/0.8 + time) - clamp(st.x, -5.0, 5.0)) - 2.0;
  float p3 = abs(sin(st.x) + sin(st.x/0.8 + time * 0.2) + clamp(st.x, -5.0, 0.0)) - 3.0;
  float p4 = abs(sin(st.x) + sin(st.x/0.8 + time * 1.5) + clamp(st.x, 0.0, 5.0)) - 3.0;

  vec3 color = vec3(1.0);

  color += vec3(plot(st,p1),plot(st,p2),plot(st,p3));
  color *= vec3(plot(st,p2),plot(st,p3),plot(st,p4));
  color += vec3(0.0,0.5,1.0);

  gl_FragColor = vec4(color, 1.0);
}
