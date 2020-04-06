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
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= 0.2 + dot(lng, lng);

  st = mod(st,1.0);
  st -= 0.5;

  st *= 2.0;
  float p1 = abs(sin(st.x) * sin(st.x/0.8 + time));
  float p2 = (sin(st.x) + sin(st.x/0.8 + time)) - 2.0;
  float p3 = abs(sin(st.x) + sin(st.x/0.8 + time * 0.2)) - 3.0;
  float p4 = (sin(st.x) + sin(st.x/0.8 + time * 1.5)) - 1.2;

  p1 *= (sin(st.x - time) * 5.0) * fract(st.x);
  p2 *= (sin(st.x) * 0.5);
  p3 *= (sin(st.x - time) * 2.0);
  p4 *= (sin(st.x - time) * 3.0) * fract(st.x);

  vec3 color = vec3(1.0);

  color += vec3(plot(st,p1),plot(st,p2),plot(st,p3));
  color *= vec3(plot(st,p2),plot(st,p3),plot(st,p4));
  color += vec3(0.2,0.5,0.5);

  gl_FragColor = vec4(color, 1.0);
}
