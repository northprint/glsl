precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.1, pct, st.y) -
          smoothstep( pct, pct+0.1, st.y);
}

void main() {
	vec2 st = ((gl_FragCoord.xy * 0.02 * resolution) / resolution.xy);

  float y = clamp(tan((st.x/.5)+(time*8.))*1.5,0.0,1.0);
  vec3 color = vec3(0.);

  for(int i=0;i<10;i++) {
    float float_i = float(i);
    float pct = plot(st - (float_i),y);
    color = (1.0-pct)*color+pct*vec3(float_i*.2,1.0,1.0/(float_i*.2));
  }

	gl_FragColor = vec4(color,1.0);
}
