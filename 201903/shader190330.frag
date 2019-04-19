precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
	vec2 st = gl_FragCoord.xy / resolution.x;

	st *= 20.0;
	st = mod(st,2.);

	float pct = st.y * (st.y * (sin(time)+1.0)) + st.x * (st.x * (cos(time)+1.0));

	vec3 color = pct * vec3(0.8, 0.2, 0.5);
	gl_FragColor = vec4(color,1.0);
}
