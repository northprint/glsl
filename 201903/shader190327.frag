precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot (vec2 st,float pct){
	return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution.x;
  vec3 color = vec3(1.0);
  float pct = 0.0;

  for(float i=-10.0; i<10.0; i++) {
    float a = st.x + (i * 0.1) + 0.05 * sin(100.0 * st.y -2.0 * i * time);
    pct += plot(st,a);
  }

  color = (1.0 -pct) * color + pct * vec3(0.8, 0.2, 0.5);
  gl_FragColor = vec4(color,1.0);
}
