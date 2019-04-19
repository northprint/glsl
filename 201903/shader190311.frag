precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = gl_FragCoord.xy / resolution;

	float color = sin( st.x * cos( time / 15.0 ) * 80.0 ) + cos( st.y * cos( time / 15.0 ) * 10.0 );
	color *= sin(st.y * sin( time / 10.0 ) * 40.0 ) + sin( st.x * sin( time / 10.0 ) * 40.0 );
	color *= sin( st.x * sin( time / 5.0 ) * 10.0 ) + cos( st.y * sin( time / 35.0 ) * 80.0 );
	gl_FragColor = vec4( 1.0 - color/8.0, 1.0 - color/1.0, 1.0 - color/4.0, 1.0 );
}
