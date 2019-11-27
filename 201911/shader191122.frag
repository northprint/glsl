precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float shape(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/4.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 st2 = st * 10.0;

  float lng = length(st);
  float at = atan(st.y, st.x) + lng * rand(vec2(st.x));
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 2.0 + dot(lng, lng) * 0.5;

  vec3 color = vec3(shape(st, 0.1));
  color *= vec3(shape(st2, 0.1),shape(st2, 0.12),shape(st2, 0.14));
  color *= vec3(0.1,0.2,0.8);

  gl_FragColor = vec4(color, 1.0);

}
