
precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/float(6);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 2.0;
    return abs(tan(r + a - d));
}

float wave(float n) {
    vec2 st = vec2(n + time);
    float d = length(st);
    return dot(cos(d), 0.01);
}

float shape_wave(vec2 st, float n){
    return shape(st * 0.5, wave(n));
}

float rect(vec2 p, vec2 size) {
  vec2 d = abs(p) - size;
  return min(max(d.x, d.y), 0.0) + length(max(d,0.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 modSt = st * 20.0;
    modSt = mod(modSt, 1.0);
    modSt -= 0.5;

    float lng = length(st);
    float at = atan(st.y,st.x);
    vec2 st2 = vec2(cos(at),sin(at));
    vec2 id = st2 - st;
    vec2 id2 = st - id;

    vec3 color = vec3(1.0);
    color -= shape_wave(id * 10.0, 1.0);
    color.b *= shape_wave(id2 * 20.0, 1.0);
    color -= fract(rect(modSt,vec2(0.4)));
    color += vec3(0.5,0.2,0.8);

    gl_FragColor = vec4(color, 1.0);
}
