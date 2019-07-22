precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    st *= 2.0 * rotate(time * 0.5);
    vec3 color = vec3(
    length(cos(st.x + cos(time)) * sin(st.y + sin(time))),
    length(sin(st.x + sin(time)) * cos(st.y + cos(time))),
    length(sin(st.x + cos(time)) * cos(st.y + sin(time)))
    );

    gl_FragColor = vec4(color,1.0);
}
