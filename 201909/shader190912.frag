precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= rotate(time * 0.1);
    st *= 2.5;

    vec2 a = mod(st, 1.0);
    vec2 id = st + a * 4.0 + time;

    float f1 = fract(st.x + id.y);
    float f2 = sin(st.y - id.x);

    vec3 color = vec3(f1 * f2, f1 * f2 * 0.5 , f2);

    gl_FragColor = vec4(color, 1.0);
}
