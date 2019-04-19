precision mediump float;
uniform float time;
uniform vec2 resolution;

float random(in float x){ return fract(sin(x)*43758.5453); }

float plot (vec2 st,float pct){
	return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution.x;
  vec3 color = vec3(1.0);
  float pct = 0.0;

  for(float i=-5.0; i<5.0; i++) {
    float a = st.y + (i * 0.2 * random(sin(time))) + 0.05 * sin(100.0 * st.x - 0.1 * i + (time * 5.0));
		pct += a;
  }

  color = (1.0 - pct) * color + pct * vec3(0.8, 0.2, 0.5);
	color += pct * color;
  gl_FragColor = vec4(color,1.0);
}
