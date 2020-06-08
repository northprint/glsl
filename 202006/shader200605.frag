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
    st *= rotate(time * 0.2);

    st = mod(st * 4.0, 1.0);
    st -= 0.5;
    vec2 st2 = st;

    float at = atan(st.y, st.x);
    float at2 = atan(st2.y, st2.x);

    color.b += dot(sin(at), sin(at));
    color.r += dot(cos(at2), cos(at2));

    color.b *= fract(dot(cos(at2),cos(at2)) - time * 0.5);
    color = mix(color, vec3(0.2,0.4,0.8), 0.5);
    color -= lng;
    color -= length(st) -0.65;

    gl_FragColor = vec4(color, 1.0);
}
