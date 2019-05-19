precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359
#define TWO_PI 6.28318530718

float triangle(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/float(3);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 5.0;
    return abs(tan(r + a - d));
}

float wave(float n) {
    vec2 st = vec2(n + time);
    float d = length(st);
    return dot(cos(d), 0.05);
}

float triangle_wave(vec2 st, float n){
    return triangle(st, wave(n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    st *= 20.0;
    vec3 color = vec3(triangle_wave(st, 1.0),triangle_wave(st, 2.0),triangle_wave(st, 3.0));
    color = mix(color,vec3(0.0, 0.0, 1.0), 0.5);

    gl_FragColor = vec4(color, 1.0);
}
