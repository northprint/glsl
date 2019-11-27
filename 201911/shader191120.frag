precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float radius,float n){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/n;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 3.0;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 st2 = st * 10.0;

  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 20.0;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 2.0 + dot(lng, lng) * 0.5;

  vec3 color = vec3(shape(st, 0.1, 3.0));
  color *= vec3(shape(st2, 0.1, 5.0) + sin(time),
  shape(st2, 0.3, 5.0),
  shape(st2, 0.3, 5.0) + sin(time));
  color *= vec3(0.8,0.6,0.1);

  gl_FragColor = vec4(color, 1.0);

}
