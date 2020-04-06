
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
    st *= 3.0;
    float f = abs(length(st.y + 2.35) + length(st.x + 2.35)) - (time);

    return vec3(tan(f + f));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= rotate(PI/4.0);
    st *= 4.0;
    st = mod(st,2.0);
    st -= 1.0;

    vec3 color = vec3(0.0);

    color.r += tex(st).r * 2.0;
    color.g += tex(st).g * 0.3;
    color.b += tex(st).b * 0.1;

    gl_FragColor = vec4(color, 1.0);
}
