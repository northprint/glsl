precision mediump float;
uniform float time;
uniform vec2 resolution;

float cycle(vec2 p,float radius){
    float r = length(p) * radius;
    float a = atan(p.y, p.x) + time;
    return abs(tan(a + r));
}

float wave(vec2 st, float n) {
    st = max(st, n + (time * 0.5));
    float d = length(st);
    return sin(d);
}

float cycle_wave(vec2 st, float n){
    return cycle(st, wave(st, n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(cycle_wave(st, 1.0),cycle_wave(st, 2.0),cycle_wave(st, 3.0));
    gl_FragColor = vec4(color, 1.0);
}
