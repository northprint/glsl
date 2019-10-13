precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st  *= 5.0;
    vec2 m = mod(st, 1.0);
    vec2 id = st - m;

    vec3 color = vec3(sin(id.x + time) + sin(st.y * 20.0) * 1.5,
      cos(id.x + time * 2.0) + cos(st.y * 20.0) * 1.5,
      cos(id.x + time * 6.0) + cos(st.y * 5.0) * 3.0);
    gl_FragColor = vec4(color, 1.0);
}
