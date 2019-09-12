precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec3 tex(vec2 st){
    st *= rotate(time * 0.5);
    float f = abs((length(st.y) + length(st.x)) * 0.9 + 0.5);
    return 1.0 - vec3(f * 0.8,f,0.8);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 st2 = st;
    st2 *= rotate(time * 2.0);

    st *= rotate(PI/4.0);
    st *= 15.0;

    vec2 a = mod(st, 2.0);
    vec2 id = st - a;

    st = mod(st,2.0);
    st -= 1.0;

    vec3 color = tex(st) - tex(st2) * tex(vec2(rand(id)));

    gl_FragColor = vec4(color, 1.0);
}
