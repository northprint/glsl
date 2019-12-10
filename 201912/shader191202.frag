precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v, v + 0.1, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) * 2.0;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 3.0 + dot(lng, lng) * 0.5 + 2.0;

  vec2 st2 = st * rotate(4.7);

  st *= 1.0;
  st = mod(st,2.0);
  st -= 0.5;

  st2 *= 1.0;
  st2 = mod(st2,2.0);
  st2 -= 0.5;

  vec3 color = vec3(plot(st , pow(sin((PI * st.x + time) / 2.0), 2.0)),
  plot(st , pow(sin((PI * st.x - time) / 2.0), 2.0)),
  plot(st , pow(sin((PI * st.x + time * 2.0) / 2.0), 2.0)));

  color += vec3(plot(st , pow(cos((PI * st.x + time) / 2.0), 2.0)),
  plot(st , pow(cos((PI * st.x - time) / 2.0), 2.0)),
  plot(st , pow(cos((PI * st.x + time * 2.0) / 2.0), 2.0)));

  color += vec3(plot(st2 , pow(sin((PI * st2.x + time) / 2.0), 2.0)),
  plot(st2 , pow(sin((PI * st2.x - time) / 2.0), 2.0)),
  plot(st2 , pow(sin((PI * st2.x + time * 2.0) / 2.0), 2.0)));

  color += vec3(plot(st2 , pow(cos((PI * st2.x + time) / 2.0), 2.0)),
  plot(st2 , pow(cos((PI * st2.x - time) / 2.0), 2.0)),
  plot(st2 , pow(cos((PI * st2.x + time * 2.0) / 2.0), 2.0)));

  gl_FragColor = vec4(color, 1.0);
}
