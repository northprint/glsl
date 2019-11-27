precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float hex(vec2 p,float radius){

    float at = atan(p.x,p.y) - time * 0.5 + PI;
    float ar = TWO_PI/float(6);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 st2 = st * 5.0;

  float lng = length(st);
  float at = atan(st.y, st.x);
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 5.0 + dot(lng, lng) * 0.5;

  vec3 color = vec3(hex(st, 0.5));
  color *= vec3(0.0,0.2,0.8);
  color *= vec3(hex(st2, 1.0) + sin(time * 2.0));

  gl_FragColor = vec4(color * 0.8, 1.0);

}
