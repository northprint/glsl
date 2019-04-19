precision mediump float;
uniform float time;
uniform vec2 resolution;
//#define PI 3.14159265359

const int   oct  = 8;
const float per  = 1.5;
const float PI   = 3.1415926;
const float cCorners = 1.0 / 16.0;
const float cSides   = 1.0 / 8.0;
const float cCenter  = 1.0 / 4.0;

float interpolate(float a, float b, float x){
    float f = (1.0 - cos(x * PI)) * 0.5;
    return a * (1.0 - f) + b * f;
}

float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

float irnd(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(rnd(vec2(i.x,       i.y      )),
                  rnd(vec2(i.x + 1.0, i.y      )),
                  rnd(vec2(i.x,       i.y + 1.0)),
                  rnd(vec2(i.x + 1.0, i.y + 1.0)));
    return interpolate(interpolate(v.x, v.y, f.x), interpolate(v.z, v.w, f.x), f.y);
}

float noise(vec2 p){
    float t = 0.0;
    for(int i = 0; i < oct; i++){
        float freq = pow(2.0, float(i));
        float amp  = pow(per, float(oct - i));
        t += irnd(vec2(p.x / freq, p.y / freq)) * amp;
    }
    return t;
}

void main() {
	vec2 t = gl_FragCoord.xy * vec2(time * 10.0);
	float n = sin(noise(t));
	vec3 color = vec3(n);

	gl_FragColor = vec4(color, 1.0);
}
