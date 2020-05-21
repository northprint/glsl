precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float radius, float pt){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/pt;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 2.0;
    return abs(tan(r + a - d));
}

float wave(float n) {
    return dot(cos(length(vec2(n))),0.5);
}

float shape_wave(vec2 st, float n){
    return shape(st * 0.5, wave(n), n);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float sec = sin(time) + cos(time) * length(st);
    vec3 color = vec3(1.0);
    color -= shape_wave(st * 10.0, sec + 20.0);
    color -= shape_wave(st * 5.0, sec - 20.0);
    color *= st.y;
    color.r *= -st.y;

    gl_FragColor = vec4(color, 1.0);
}
