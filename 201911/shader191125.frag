precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/5.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius * 10.0;
    float a = atan(length(p)) - time;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 st2 = st * 20.0;

  float lng = length(st);
  float at = atan(st.y, st.x) + lng;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 10.0 + dot(lng, lng) * 0.5;

  vec3 color = vec3(shape(st, 0.1),shape(st, 0.12),shape(st, 0.14));

  color += vec3(
    sin(st2.x) + cos(st2.y + time),
    cos(st2.x) + cos(st2.y + time),
    cos(st2.x) + sin(st2.y + time)
  );

  gl_FragColor = vec4(color, 1.0);

}
