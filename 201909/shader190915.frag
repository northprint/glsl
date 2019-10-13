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

    st *= 5.0;
    st *= rotate(PI/4.0);

    vec2 a = mod(st, 1.0);
    vec2 id = st - a;

    id *= rotate(time * 0.5);

    float f1 = fract(st.x + id.y);
    float f2 = sin(st.y - id.x);

    vec3 color = vec3(f2, f1 , f1 - f2);

    gl_FragColor = vec4(color, 1.0);
}
