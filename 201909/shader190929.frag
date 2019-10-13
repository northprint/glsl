precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 5.0;
    st *= rotate(PI/-4.0);

    vec2 m = mod(st, 4.0);
    vec2 id = st + m;
    id -= 2.0;
    id *= rotate(time);

    vec3 color = vec3(abs(sin(time + length(id))), abs(cos(time - length(id))), abs(sin(length(id))));

    gl_FragColor = vec4(color, 1.0);
}
