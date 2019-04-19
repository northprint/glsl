precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359


vec3 flower( vec2 p ) {
  vec2 pos = vec2(0.5)-p;
  float r = length(pos)*2.;
  float a = atan(pos.y,pos.x)+(time * 1.);
  float f = abs(cos(a*2.5))*.5+.3;
  float fa = abs(cos(a*2.5))*.3+.3;
  return vec3(1.-smoothstep(f,f+0.1,r),.5-smoothstep(f,f+0.1,r),1.-smoothstep(f,f+.2,r))+ vec3( 1.-smoothstep(fa*0.5,fa,r));
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  st.x += (resolution.x/resolution.y)*(tan(time));
  st.y += (resolution.x/resolution.y)*(tan(time));
  vec3 color = vec3(0.,0.6*sin(time),0.6*sin(time/0.5));
  st *= 3.;
  vec2 i_st = floor(st);
  vec2 f_st = fract(st);

  color += vec3(flower(f_st));
  gl_FragColor = vec4(color,1.0);
}
