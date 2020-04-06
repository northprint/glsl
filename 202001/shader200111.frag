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
    st *= rotate(PI/3.55);
    st *= 2.5;

    float f = length(st.y) + length(st.x) + length(st);
    float at = atan(st.y, st.x) + length(st) * 2.0;

    return vec3(0.8 - sin(f + f + at)) + st.x * 1.2;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float lng = length(st);
    float at = atan(st.y,st.x);
    st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.1);
    st *= 1.0 + dot(lng, lng) * 0.6;

    st *= 8.0;

    vec2 rst = mod(st,2.0);
    rst -= 1.0;

    vec2 id = rst - st;

    vec3 color = 1.0 + tex(rst);
    color *= vec3(1.0,0.4 + sin(length(id) + time * 5.0),0.8 + sin(length(id) + time));
    gl_FragColor = vec4(color, 1.0);
}
