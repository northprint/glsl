precision mediump float;
uniform float time;
uniform vec2 resolution;

const float pi = acos(-1.0);
const float pi2 = pi * 2.0;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec2 pmod(vec2 p, float r) {
    float a =  atan(p.x, p.y) + (pi / r);
    float n = pi2 / r;
    a = floor(a / n) * n;
    return p * rotate(-a);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // bump
  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 1.5;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.1);
  st *= 3.0 + dot(lng, lng) * 0.5;

  vec2 id = pmod(st,8.0) * rotate(time * 0.2);
  vec3 color = vec3(sin(length(id * 2.0) * id.x + time));
  color += vec3(0.85,0.55,0.34) * 1.2;
  color *= vec3(0.97,0.79,0.47) * 1.5;

  gl_FragColor = vec4(color, 1.0);

}
