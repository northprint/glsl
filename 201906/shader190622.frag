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

    st *= 30.0;
    st *= rotate(time * 0.1);

    vec2 a = mod(st - time, 8.0);
    vec2 b = mod(vec2(st.x - 4.0 + time,st.y - 4.0 - time), 8.0);

    vec2 gv = length(a) < length(b) ? a : b;
    vec2 id = st - gv;

    vec3 color1 = vec3(cos(id.x),sin(id.y),sin(id.y));
    vec3 color2 = vec3(sin(id.x),cos(id.y),cos(id.x));

    gl_FragColor = vec4(color1 * color2 * 2.0, 1.0);
}
