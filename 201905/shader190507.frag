precision mediump float;
uniform float time;
uniform vec2 resolution;

float cycle(vec2 p,float radius){
    float r = length(p) * radius;
    float a = atan(p.y, p.x) + time;
    return abs(cos(a + r));
}

float wave(vec2 st, float n) {
    st = max(st, n + (time * 0.1));
    float d = length(st);
    return dot(sin(d),n);
}

float cycle_wave(vec2 st, float n){
    return cycle(st, wave(st, n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);

    vec3 color = vec3(cycle_wave(st, 36.0),cycle_wave(st, 24.0),cycle_wave(st, 12.0));
    gl_FragColor = vec4(color, 1.0);
}
