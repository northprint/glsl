precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359
#define TWO_PI 6.28318530718

vec2 fold(vec2 p, float ang){
    vec2 n = vec2(cos(-ang),sin(-ang));
    p -= 2.0 * min(0.0, dot(p,n)) * n;
    return p;
}

float pentagon(vec2 p,float radius){

    vec2 st = fold(p, time * 0.5);

    float at = atan(st.x,st.y) + time * 0.5 + PI;
    float ar = TWO_PI/float(5);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(st);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 5.0;
    return abs(tan(r + a - d));
}

float wave(float n) {
    vec2 st = vec2(n + time);
    float d = length(st);
    return dot(cos(d), 0.05);
}

float pentagon_wave(vec2 st, float n){
    return pentagon(st, wave(n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    st *= 40.0;
    vec3 color = vec3(pentagon_wave(st, 1.0),pentagon_wave(st, 2.0),pentagon_wave(st, 3.0));
    color = mix(color,vec3(0.8, 0.0, 0.0), 0.2);

    gl_FragColor = vec4(color, 1.0);
}
