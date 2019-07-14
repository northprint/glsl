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
    float a =  atan(p.x, p.y) + (pi / r);
    float n = pi2 / r;
    a = floor(a / n) * n;
    return p * rotate(-a);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    vec2 st2 = st;
    vec3 color = vec3(1.0);

    st *= 20.0 * rotate(time * 0.5);
    st = pmod(st, 8.0) * rotate(time);
    color = vec3(vec2(fract(st.x),fract(st.y)),1.0);

    st2 *= 5.0 * rotate(time * 0.4);
    st2 = pmod(st2, 3.0) * rotate(-time * 0.5);
    color += vec3(0.5,sin(st2.x),cos(st2.y));

    gl_FragColor = vec4(color * 0.5,1.0);
}
