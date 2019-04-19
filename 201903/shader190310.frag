precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359

float polygon(vec2 st,int vert,float size){
  float a = atan(st.x,st.y) + PI + (time * 0.1);
  float r = PI * 2.0 / float(vert);
  float d = cos(floor(.5 + a/r) * r - a ) * length(st) - size;
  return (1.0 - smoothstep(.4,.41, d) - (1.0 - smoothstep(.3,.4, d)));
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec3 color = vec3(0.0);
  float poly = 0.0;
  st.x *= resolution.x/resolution.y;

  for(float i=0.0; i<10.0; i++) {
    vec2 p = st * 2.0 - 1.0;
    p.x = p.x - 0.5;
    poly += polygon(p,8, -0.15 + (i*0.15));
  }

  color = mix(vec3(.745,.784,.82),vec3(.882,.157,.522),poly);
  gl_FragColor = vec4(color,1.0);
}
