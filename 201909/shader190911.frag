precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec3 tex(vec2 st){
    st *= rotate(time * 0.5);
    float a = sin(length(st.x) + length(st.y)) - (8.0 - length(st));
    return vec3(abs(a) * 0.5, a * 0.2, a);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= rotate(-time * 0.2);
    st *= 5.0;

    vec2 a = mod(st, 2.0);
    vec2 id = st + a;

    st -= 1.0;

    vec3 color = tex(st + id);

    gl_FragColor = vec4(color, 1.0);
}
