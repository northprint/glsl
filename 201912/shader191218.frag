precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v + 0.1, v, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x);
  st = vec2(cos(at) * lng , sin(at) * lng);
  st *= dot(lng, lng);

  vec2 st2 = st;

  st *= 2.0;
  float p = sin(st.x + 1.5) + sin(st.x/0.2 + time);
  float p2 = sin(st.x + 1.6) + sin(st.x/0.5 + time);

  vec3 color = vec3(1.0);

  color *= vec3(plot(st,p));
  color *= vec3(0.0,0.0,plot(st,p2));

  color -= vec3(smoothstep(length(st) - 2.0, length(st), 1.0));
  color += vec3(0.8,0.2,1.0);

  gl_FragColor = vec4(color, 1.0);
}
