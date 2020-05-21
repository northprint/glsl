precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float ra){

    float at = atan(p.x,p.y) + time + PI;
    float ar = TWO_PI/10.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);
    float r = length(p)/ra;
    float a = atan(length(p)) - time * 2.0;
    return abs(tan(r + a - d));
}

float shape_wave(vec2 st, float n){
    return shape(st, dot(cos(length(vec2(n))),1.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float t = mod(time, 6.0);
    vec3 color = vec3(1.0);
    color -= shape_wave(st * 20.0 * t, 0.1);
    color += shape_wave(st * 10.0 * t, 0.5);
    color.g *= abs(st.y) + fract(t);
    color.r -= abs(st.y) + sin(t);
    gl_FragColor = vec4(color, 1.0);
}
