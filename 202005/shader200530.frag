precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(1.0);

  vec2 st2 = st;

    float lng = length(st);
    float at = atan(st.y, st.x);
    st = (st * 20.0) * vec2(cos(at) * lng, sin(at) * lng);

    color *= fract(min(st.x,st.y) - time * 0.5);
    color = mix(color, vec3(0.8,0.2,0.1), 0.5);
    color = mix(color, vec3(0.2,0.7,1.0), cos(min(st.x,st.y) - time * 2.0));
    color -= length(st2) - 0.1;

    gl_FragColor = vec4(color, 1.0);
}
