precision mediump float;
uniform float time;
uniform vec2 resolution;

float flower(vec2 p,float radius){

    float u = sin((atan(p.y, p.x)) * 10.0);
    float t = abs(u - length(p));

    float r = length(p) * radius;
    float a = atan(length(p)) + time;
    return abs(tan(r + a - t));
}

float wave(vec2 st, float n) {
    st = max(st, n + time);
    float d = length(st);
    return sin(cos(d));
}

float flower_wave(vec2 st, float n){
    return flower(st, wave(st, n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    st *= 10.0;
    vec3 color = vec3(flower_wave(st, 24.0),flower_wave(st, 24.0),flower_wave(st, 36.0));
    color = mix(color,vec3(1.0, 0.0, 0.5), 0.8);

    gl_FragColor = vec4(color, 1.0);
}
