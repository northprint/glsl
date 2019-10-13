precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 3.0;
    float f = min(length(cos(st.x * 2.0) - sin(st.y + time)),length(cos(st.y * 2.0) - sin(st.x)));
    vec3 color = vec3(f + 0.5 * sin(time * 2.0),f - 0.5 * sin(time),f * sin(time));

    gl_FragColor = vec4(color * 0.5, 1.0);
}
