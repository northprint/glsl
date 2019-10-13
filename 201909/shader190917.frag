precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 20.0;
    vec2 a = mod(st, 1.0);
    vec2 id = st + a - 2.0;

    id *= rotate(time * 0.5);

    float f1 = sin(id.x) * sin(st.x);
    float f2 = sin(id.y) * sin(st.y);

    vec3 color = vec3(f1 - f2, f2 - f1 , 0.65);

    gl_FragColor = vec4(color, 1.0);
}
