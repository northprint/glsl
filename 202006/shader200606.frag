precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(1.0);
    float lng = length(st);
    st *= rotate(time * 0.5);
    float at = atan(st.y, st.x);
    float minSt = min(st.x,st.y) * 0.01;
    color.r -= dot(cos(at), cos(at));
    color *= fract(dot(cos(at),cos(minSt)) - time * 0.5);
    color = mix(color, vec3(0.2,0.4,0.8), 0.5);
    color -= lng - 0.5;

    gl_FragColor = vec4(color, 1.0);
}
