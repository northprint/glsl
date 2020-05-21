precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/5.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 5.0;
    return abs(tan(r + a - d));
}

float wave(float n) {
    float d = length(vec2(n));
    return dot(cos(d),4.0);
}

float shape_wave(vec2 st, float n){
    return shape(st * 0.5, wave(n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float at = atan(st.y,st.x);
    vec2 st2 = vec2(cos(at),sin(at)) * length(st);
    vec2 id = st2 - st;
    vec2 id2 = st - id;

    vec3 color = vec3(1.0);
    color -= shape_wave(st2 * 20.0, 1.0);
    color -= shape_wave(id2 * 50.0, 1.0);
    color.b += id2.y;
    color += vec3(0.2,0.2,1.0);

    gl_FragColor = vec4(color, 1.0);
}
