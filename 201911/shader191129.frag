precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float shape(vec2 p,float radius,float pt){

    float at = atan(p.x,p.y) + time + PI;
    //float at = atan(p.x,p.y) + time + PI;
    float ar = TWO_PI/pt;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  vec2 st2 = st;
  st2 = mod(st2,2.0);
  st2 -= 1.0;

  // bump
  float lng = length(st);
  float at = atan(st.y, st.x) + lng;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.2);
  st *= 10.0 + dot(lng, lng) * 0.5;

  vec3 color = vec3(shape(st, 0.1, 3.0),0.6,shape(st, 1.0, 5.0));

  gl_FragColor = vec4(color, 1.0);

}
