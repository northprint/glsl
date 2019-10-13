precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st  *= 5.0;

    vec2 m = mod(st, rand(vec2(time)));
    vec2 id = st - m;
    id *= rotate(time * 0.5);

    vec3 color = vec3(abs(sin(id.x + id.y)), abs(cos(length(id))), cos(rand(vec2(time * 0.5))));
    gl_FragColor = vec4(color, 1.0);
}
