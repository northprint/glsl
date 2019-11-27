precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= 5.0;
    vec2 id = st * 2.0 + time * 5.0;

    vec3 color = vec3(
      sin(length(id.x)),
      sin(length(id.x) - 2.0),
      sin(length(id.x) + 2.0));

    color += vec3(cos(st.x) + 0.5);

    gl_FragColor = vec4(color, 1.0);
}
