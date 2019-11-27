precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // bump
  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 0.01;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 1.0 + dot(lng, lng) * 0.5 + sin(time) + 1.2;


  st *= 5.0 * rotate(time * 0.2);
  st = mod(st,2.0);
  st -= 1.0;

  vec2 pos = st;
  float r = length(pos);
  float a = atan(pos.y,pos.x)+(time*0.5);
  float f = abs(cos(a * 2.5)) * 0.5 + 0.3;
  float fa = abs(cos(a * 2.5)) * 0.3 + 0.3;
  vec3 color = vec3(1.0-smoothstep(f,f+0.1,r),0.5-smoothstep(f,f+0.1,r),1.-smoothstep(f,f+0.1,r));
  vec3 white = vec3(1.0-smoothstep(fa*0.5,fa,r));
  color += white;

  gl_FragColor = vec4(color, 1.0);

}
