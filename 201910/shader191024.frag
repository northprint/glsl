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

    vec2 st2 = st;
    st2 *= rotate(time * 5.0);
    st2 *= sin(time) + 3.0;

    st *= 5.0;
    st *= fract(time) + 3.0;
    vec2 id = st * 2.0 + time * 3.0;

    vec3 color = vec3(
      sin(length(id.x)),
      sin(length(id.x) - 2.0),
      sin(length(id.x) + 2.0));

    st2 *= 10.0;
    color *= vec3(step(fract(st2.x) - 0.5, 0.01));
    color *= vec3(step(fract(st2.y) - 0.5, 0.01));

    gl_FragColor = vec4(color, 1.0);
}
