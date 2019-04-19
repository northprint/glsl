precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = gl_FragCoord.xy / resolution.xy;
  st -= 0.5;
  vec3 color = vec3(0.0);

	float u = sin((atan(st.y, 0.08)) * 50.0 * sin(time * 0.1)) * 0.1;
	float v = sin((atan(st.x, 0.08)) * 50.0 * fract(time * 0.1)) * 0.1;
  color = mix(color,vec3(1.0,1.0,0.0),u);
	color = mix(color,vec3(1.0,0.0,1.0),v) * 5.0;

  gl_FragColor = vec4(color,1.0);
}
