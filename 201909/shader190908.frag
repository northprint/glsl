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
    float f = abs((length(st.y) / length(st.x)));
    return vec3(f * 0.2,0.5,sin(f));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 st2 = st;
    st2 *= rotate(time * 2.0);

    st *= 20.0;

    vec2 a = mod(st, 2.0);
    vec2 id = st - a;

    st = mod(st,2.0);
    st -= 1.0;

    vec3 color = tex(st) * tex(st2 - id);

    gl_FragColor = vec4(color, 1.0);
}
