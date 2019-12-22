precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v + 0.1, v, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 3.0 + time * 0.5;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st /= 0.2 + dot(lng, lng);

  st *= 3.0;

  float p1 = sin(st.x + 1.5) + sin(st.x/0.2 + time * -1.0);
  float p2 = sin(st.x + 1.6) + sin(st.x/0.5 + time) + sin(st.y + 0.5);
  float p3 = sin(st.x + 2.0) + sin(st.x/0.5 + time * 2.0) + sin(st.y + 2.5);
  float p4 = sin(st.x + 3.0) + sin(st.x/0.5 + time * 1.5);

  vec3 color = vec3(1.0);

  color *= vec3(plot(st,p1),plot(st,p2),plot(st,p2));
  color *= vec3(plot(st,p3),plot(st,p4),plot(st,p4));
  color *= vec3(0.8,0.5,1.0);

  gl_FragColor = vec4(color, 1.0);
}
