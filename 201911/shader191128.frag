precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float radius){

    float at = atan(p.x,p.y);
    //float at = atan(p.x,p.y) + time + PI;
    float ar = TWO_PI/12.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) - (time * 2.0);
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

  st *= 20.0;
  vec2 st2 = st;
  st2 = mod(st2,2.0);
  st2 -= 1.0;

  vec3 color = vec3(shape(st, 1.0),shape(st, 1.1),shape(st, 1.0 + sin(time * 0.1)));
  color *= 1.0 - (length(st2)-0.5);

  gl_FragColor = vec4(color, 1.0);

}
