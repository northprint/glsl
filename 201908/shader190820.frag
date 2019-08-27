precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

// http://www.iquilezles.org/www/articles/palettes/palettes.htm
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

vec3 tex(vec2 st){

    float r = length(st);
    float a = length(st.y) * length(st);
    float f = abs(a * r) - fract(time * 0.5);

    vec3 color = palette(f + f, vec3(0.5), vec3(0.5), vec3(1.0,1.0,0.5), vec3(0.8, 0.38, 0.25));
    color = color - length(st) + 0.5;
    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = tex(st);
    gl_FragColor = vec4(color, 1.0);
}
