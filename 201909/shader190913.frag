precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 5.0;

    vec2 a = mod(st, 1.0);
    vec2 id = st - a + time;

    float f1 = cos(st.x + id.y);
    float f2 = sin(st.y + id.x);

    vec3 color = vec3(f1, f2, f1);

    gl_FragColor = vec4(color, 1.0);
}
