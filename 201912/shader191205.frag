precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v + 0.1, v, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.1 * time;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 1.0 + dot(lng, lng) * 0.5 + 2.0;

  st *= 1.0;
  st = mod(st,2.0);
  st -= 1.0;

  vec3 color = 1.0 - vec3(
    plot(st , sin((PI * st.x + time))),
    plot(st , sin((PI * st.x - time * 0.5))),
    plot(st , sin((PI * st.x + time * 4.0)))
  );

  color +=vec3(
    plot(st , cos(PI * st.x + time * 2.0)),
    plot(st , cos(PI * st.x - time * 2.5)),
    plot(st , cos(PI * st.x - time * 5.0))
  );

  color *= vec3(0.4,0.2,0.8);

  gl_FragColor = vec4(color, 1.0);
}
