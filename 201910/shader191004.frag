precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st  *= 5.0;
    vec2 m = mod(st, 1.0);
    m -= 0.5;
    vec2 id = st - m;

    vec3 color = vec3(sin(id.y + time) + sin(st.y * 10.0), cos(id.y + time) + cos(st.y * 20.0), 0.5);
    color += vec3(sin(id.x + time) + sin(st.x * 10.0), cos(id.x + time) + cos(st.x * 20.0), 0.5);
    gl_FragColor = vec4(color, 1.0);
}
