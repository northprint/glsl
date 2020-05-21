precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float ra){

    float at = atan(p.x,p.y) + time * 0.2 + PI;
    float ar = TWO_PI/6.;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);
    float r = length(p)/ra;
    float a = atan(length(p)) - time * 5.0;
    return abs(tan(r + a - d));
}

float shape_wave(vec2 st, float n){
    return shape(st, dot(cos(length(vec2(n))),1.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(1.0);
    color -= shape_wave(st * 20.0, 0.1);
    color += shape_wave(st * 5.0, 0.5);
    color.g *= abs(st.y);
    gl_FragColor = vec4(color, 1.0);
}
