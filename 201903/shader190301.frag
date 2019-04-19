precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.4, pct, st.y) -
          smoothstep( pct, pct+0.2, st.y);
}

void main() {
	vec2 st = (gl_FragCoord.xy * 8. - resolution.xy) / min(resolution.x, resolution.y);

  float y = (1.-pow(abs(st.x - 5.),.5))-1.5-(fract(time*3.));
  vec3 color = vec3(0.);

  for(int i=0;i<12;i++) {
    float float_i = float(i);
    float pct = plot(st - (float_i),y);
    color = (1.0-pct)*color+pct*vec3(float_i*.6,float_i*.1,float_i*.3);
  }

	gl_FragColor = vec4(color,1.0);
}
