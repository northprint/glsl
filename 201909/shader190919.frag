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

    st *= 5.0;
    vec2 m = mod(st, 1.0);
    vec2 id = st - m * cos(time);


    float f = sin(abs(atan(id.x,id.y)));
    float g = cos(abs(atan(id.y,id.x)));
    vec2 a = id * rotate(time);

    vec3 color = vec3(a.x + f, a.y - g, f * g + abs(cos(time)));

    gl_FragColor = vec4(color * 0.8, 1.0);
}
