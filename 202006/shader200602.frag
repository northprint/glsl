precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(1.0);
    vec2 st2 = st;

    st2 = mod(st2 * 4.0, 1.0);
    st2 -= 0.5;

    float lng = length(st);
    float at = atan(st.y, st.x);
    float at2 = atan(st2.y, st2.x);

    color *= fract(abs(dot(sin(at) * lng,sin(at) * lng)) - time * 0.5);
    color *= fract(abs(dot(cos(at2) * lng,cos(at2) * lng)) - time * 0.5);
    color = mix(color, vec3(0.0,0.8,0.5), 0.5);
    color = mix(color, vec3(0.8,0.1,1.0), fract(abs(dot(sin(at) * lng, sin(at) * lng)) - time * 0.1));

    gl_FragColor = vec4(color * 2.0, 1.0);
}
