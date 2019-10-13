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

    float f = sin(abs(atan(st.x,st.y)));
    float g = cos(abs(atan(st.y,st.x)));
    vec2 a = 0.2 - st * rotate(time);

    vec3 color = vec3(a.x + f, a.y - g, f * g + abs(cos(time)));

    gl_FragColor = vec4(color * 0.8, 1.0);
}
