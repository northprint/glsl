
precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

const float pi = acos(-1.0);
const float pi2 = pi * 2.0;

vec2 pmod(vec2 p, float r) {
    float a =  atan(p.x, p.y) + pi / r;
    float n = pi2 / r;
    a = floor(a / n) * n;
    return p * rotate( -a);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 st2 = st;
    st = pmod(st * rotate(time * 0.2), 10.0);

    st *= 10.0 + (sin(time) * 2.0);
    st = mod(st, 1.0);
    st -= 0.5;

    vec3 color = vec3(1.0);

    color.r *= sin(st.x);
    color.g *= cos(st.y);
    color += vec3(0.8,0.2,0.2) * 0.5;

    color -= length(st) - sin(time);
    color -= length(st2) - 1.0;
    color.r += length(st2) - 0.5;

    gl_FragColor = vec4(color * 0.7, 1.0);
}
