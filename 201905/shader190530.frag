precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359
#define TWO_PI 6.28318530718

// http://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
float smoothHexagram(float d){
    float h = sign(d);
    h *= 1.0 - exp(-50.0 * abs(d));
    return h;
}

float sdHexagram( in vec2 p, in float r ){
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);

    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p),0.0) * k.xy;
    p -= 2.0 * min(dot(k.yx, p),0.0) * k.yx;
    p -= vec2(clamp(p.x, r * k.z, r * k.w), r * 3.0);

    return smoothHexagram(length(p) * sign(p.y));
}

float hexagram(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/float(6);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 0.05;
    return abs(tan(r + d + a));
}

float flower(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.1;

    float u = sin((atan(p.y, p.x)) * 5.0);
    float t = abs(u - length(p));

    float r = length(p) * radius;
    float a = atan(length(p)) + time + at;
    return abs(sin(r + a + t + (t * r)));
}

float wave(float n) {
    vec2 st = vec2(n + time);
    float d = length(st);
    return dot(cos(d), 0.5);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    st *= 3.0;
    vec3 color = vec3(hexagram(st, wave(1.0)),hexagram(st, wave(2.0)),hexagram(st, wave(3.0)));
    color *= vec3(sdHexagram(st, wave(1.0)),sdHexagram(st, wave(2.0)),sdHexagram(st, wave(3.0)));
    color = mix(color,vec3(1.0, 0.0, 1.0), 0.5);

    gl_FragColor = vec4(color, 1.0);
}
