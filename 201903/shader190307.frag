precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = gl_FragCoord.xy - 0.5 * resolution.xy;
    st.x = st.x / resolution.y;
    st.y = st.y / resolution.y + (time * 0.05);
    vec3 color = vec3(1.0);

    st *= 10.;
    vec2 f_st = fract(st);

    vec2 center = vec2(0.5, 0.5);
    vec2 d = f_st - center;
    float radius = 0.3;
    float circle = smoothstep( radius-0.02, radius+0.02, length(d));
    color = mix(vec3(1.0, 0.4, 0.8), vec3(1.0), circle);

    gl_FragColor = vec4(color,1.0);
}
