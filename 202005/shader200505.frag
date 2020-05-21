precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

float shape(vec2 p,float ra){
    float at = atan(p.x,p.y);
    float ar = TWO_PI/2.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);
    float r = length(p)/ra;
    float a = atan(length(p)) - time * 5.0;
    return abs(tan(r + a - d));
}

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float shape_wave(vec2 st, float n){
    return shape(st, dot(cos(length(vec2(n))),2.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec2 st2 = st * 30.0;
    st2 = mod(st2,1.0);
    st2 -= 0.5;

    st *= rotate(time * 0.2);

    vec3 color = vec3(0.5);
    for(int i=0; i<8; ++i) {
      st = abs(st/dot(st,st)*2.0);
      st -= 1.23 - cos(time * 0.2) * 0.5;
    }
    st *= rotate(time * 5.0);
    color *= shape_wave(st * 2.0, 0.1);
    color.rg -= length(st) - 0.5;
    color *= length(st2);

    gl_FragColor = vec4(color, 1.0);
}
