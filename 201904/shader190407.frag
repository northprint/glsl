precision mediump float;
uniform float time;
uniform vec2 resolution;

float rnd(float seed){
  return fract(sin(seed) * 43758.5453);
}
void main() {
    vec2 st = gl_FragCoord.xy/resolution.y;
    vec3 color = vec3(0.0);

    vec3 c = vec3(1.0);

    for(float i=10.0; i<30.0; i+=1.0) {
      float t = mod(time, i);
      vec2 p = vec2(0.0);

      if (t < (i/2.0)){
        p = vec2(cos(t * 1.5) *(0.1+( t * 0.05))+ 0.5, sin(t * 1.5)*(0.1+( t * 0.05)) + 0.5);
      } else {
        p = vec2(cos((i - t) * 1.5) *(0.1 + ((i - t) * 0.05)) + 0.5, sin((i - t) * 1.5)*(0.1 + ((i - t) * 0.05)) + 0.5);
      }
      color += mix(color,vec3(rnd(i)*0.01,0.00001,rnd(i)*0.01),1.0-smoothstep(0.8, 0.85, distance(st, p) * 10.0));
    }
    gl_FragColor = vec4(color, 1.0);
}
