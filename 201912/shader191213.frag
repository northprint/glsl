precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718


float shape(vec2 p,float radius){
    float at = atan(p.x,p.y) + PI;
    float ar = TWO_PI/float(5);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) - time * 0.5;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  float lng = length(st);
  float at = atan(st.y, st.x) + 0.2 * time;
  st = vec2(cos(at) * lng , sin(at) * lng);
  st /= 0.1 + dot(lng, lng);

  st *= 2.0;
  st = mod(st,1.0);
  st -= 0.5;

  vec3 color = vec3(shape(st,2.0),step(shape(st,0.2),1.0),shape(st,2.0));
  color *= vec3(0.2,0.2,length(st));

  gl_FragColor = vec4(color, 1.0);
}
