precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(1.0);
    float lng = length(st);

    st = mod(st * 5.0, 1.0);
    st -= 0.5;
    vec2 st2 = st;

    float at = atan(st.y, st.x);
    float at2 = atan(st2.y, st2.x);

    color += fract(abs(dot(sin(at) * lng,sin(at) * lng)) - time * 0.5);
    color.rg *= fract(abs(dot(cos(at2) * lng,cos(at2) * lng)) - time * 0.5);
    color = mix(color, vec3(0.8,0.2,0.5), 0.5);
    color -= lng;
    color -= length(st) -0.5;

    gl_FragColor = vec4(color, 1.0);
}
