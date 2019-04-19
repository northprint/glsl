precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec3 color = vec3(0.0);
//  for(int i=0;i<5;i++) {
    vec2 pos = vec2(0.5)-st;
    float r = length(pos)*2.;
    float a = atan(pos.y,pos.x)+(time*0.5);
    float f = abs(cos(a*2.5))*.5+.3;
    float fa = abs(cos(a*2.5))*.3+.3;
    vec3 flower = vec3(1.-smoothstep(f,f+0.1,r),0.5-smoothstep(f,f+0.1,r),1.-smoothstep(f,f+0.1,r));
    vec3 white = vec3( 1.-smoothstep(fa*0.5,fa,r));
    color = flower;
    color += white;
//  }

gl_FragColor = vec4(color, 1.0);

}
