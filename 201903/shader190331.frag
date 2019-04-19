precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
	vec2 st = gl_FragCoord.xy / resolution.y;

	st -= 0.5;
	float t = atan(st.y, st.x) + (time * 0.1);
	t = sin(t * 6.0);

	float u = abs(tan((atan(st.y, st.x) + time * -0.2) * 4.0)) * 0.01;

	for(float i=0.0; i<0.36; i+=0.04) {
		t += 0.01 / abs(0.5 + u - length(st) - (0.1 + i));
	}
	vec3 color = t * vec3(0.8, 0.2, 0.5);
	gl_FragColor = vec4(color,1.0);
}
