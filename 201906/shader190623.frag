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

    st *= 10.0;
    st *= rotate(-time * 0.1);

    vec2 a = mod(st, 2.0);
    vec2 b = mod(st - 2.0, 2.0);
    vec2 gv = length(a) < length(b) ? a : b;
    vec2 id = st - gv;

    vec3 color1 = vec3(cos(id.x - id.y),sin(id.x - id.y),sin(id.x + id.y));
    vec3 color2 = vec3(sin(id.x - id.y),cos(id.x + id.y),cos(id.x - id.y));

    color1 += vec3(fract(length(gv * 5.0 - 5.0) - time));
    color2 += vec3(fract(length(gv * 2.0 - 2.0) + time * 0.5));

    gl_FragColor = vec4(color1 * color2, 1.0);
}
