
precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 st2 = st;

    st *= 5.0;
    st = mod(st, 1.0);
    st -= 0.5;

    vec3 color = vec3(1.0);

    color.r *= 0.5;
    color.g *= length(st);
    color += vec3(0.8,0.2,0.2) * 0.5;

    color *= length(st);
    color += fract(length(st));
    color -= length(st2) - 1.0;
    color -= length(st2) - 0.2;
    color.b *= fract(st.x + st.y) + sin(time);
    color.r *= fract(st.x - st.y) + cos(time);

    color *= sin(color);

    gl_FragColor = vec4(color * 0.5, 1.0);
}
