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
    //st *= 4.2;
    st *= rotate(time * 0.2);

    float f = abs(length(st.y) + length(st.x)) - time;
    vec2 p = st * rotate(PI/4.0);
    float f2 = abs(length(p.y) + length(p.x)) - time * 5.0;

    return vec3(sin(f2 + f)) * vec3(0.8,0.0,0.5);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= rotate(PI/4.0);
    st *= 30.0;

    vec2 a = mod(st, 2.0);
    vec2 id = st - a;

    st = mod(st,2.0);
    st -= 1.0;

    vec3 color = tex(st) + tex(id);

    gl_FragColor = vec4(color, 1.0);
}
