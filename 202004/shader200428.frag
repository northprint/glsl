precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float ra){
    float t = mod(time, 6.0);

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/(2.0 + (floor(t) + 2.0));
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);
    float r = length(p)/ra;
    float a = atan(length(p)) - t * 5.0;
    return abs(tan(r + a - d));
}

float shape_wave(vec2 st, float n){
    return shape(st, dot(cos(length(vec2(n))),2.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float t = mod(time, 6.0);
    vec3 color = vec3(1.0);
    color *= shape_wave(st * 20.0 * t, 0.1);
    color *= shape_wave(st * 5.0, 0.5);
    color.r *= abs(st.y) + fract(t);
    color.b -= abs(st.y) + sin(t);
    color *= length(mod(st*50.0,1.0)-0.5);

    gl_FragColor = vec4(color, 1.0);
}
