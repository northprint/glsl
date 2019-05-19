precision mediump float;
uniform float time;
uniform vec2 resolution;

float flower(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5;

    float u = sin((atan(p.y, p.x)) * 15.0);
    float t = abs(u - length(p));

    float r = length(p) * radius;
    float a = atan(length(p)) + (at * 8.0);
    return abs(sin(r - a + t + (t * r)));
}

float wave(float n) {
    vec2 st = vec2(n + time);
    float d = length(st);
    return dot(cos(d), 0.05);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    st *= 5.0;
    vec3 color = vec3(flower(st, wave(1.0)),flower(st, wave(2.0)),flower(st, wave(3.0)));
    color = mix(color,vec3(0.2, 0.5, 1.0), 0.8);

    gl_FragColor = vec4(color, 1.0);
}
