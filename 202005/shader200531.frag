precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(1.0);
    vec2 st2 = st;

    st2 = mod(st2 * 30.0, 1.0);
    st2 -= 0.5;

    float lng = length(st);
    float at = atan(st.y, st.x);
    st = (st * 10.0) * vec2(cos(at) * lng, sin(at) * lng);

    color *= fract(min(sin(st.x),cos(st.y)) - time * 0.5);
    color = mix(color, vec3(0.8,0.2,0.1), 0.5);
    color = mix(color, vec3(0.2,0.7,1.0), cos(min(sin(st.x),cos(st.y)) - time));
    color *= length(st2) - 0.5;

    gl_FragColor = vec4(color * 5.0, 1.0);
}
