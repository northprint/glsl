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
    st *= 2.5;
    st *= rotate(time);

    float f = abs(length(st.y) + length(st.x)) + time;

    vec2 p = st * rotate(PI);
    float f2 = abs(length(p.y) + length(p.x)) + time;

    return vec3(sin(f + f2) * 0.8,0.25,0.1) + vec3(sin(f));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= rotate(PI/4.0);
    st *= 8.0;

    st = mod(st,2.0);
    st -= 1.0;

    vec3 color = tex(st);
    gl_FragColor = vec4(color, 1.0);
}
