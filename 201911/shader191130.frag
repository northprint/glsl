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
    float ar = TWO_PI/pt;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  // bump
  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 0.01;
  st = vec2(cos(at) * lng, sin(at) * lng);
  st *= 1.0 + dot(lng, lng) * 0.5 + sin(time * 2.0) + 1.1;

  vec2 st2 = st * 2.0 * rotate(time * 0.2);
  st2 = mod(st2,2.0);
  st2 -= 1.0;

  vec3 color = vec3(shape(st2, 1.5, 6.0),0.0,shape(st2, 1.0, 6.0));
  color -= vec3(shape(st2, 1.0, 6.0),0.0,shape(st2, 0.1, 6.0));;

  gl_FragColor = vec4(color, 1.0);

}
