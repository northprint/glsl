precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

// http://www.iquilezles.org/www/articles/palettes/palettes.htm
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec3 tex(vec2 st){
    st *= rotate(time * 0.8);
    float a = length(st.y) - length(st);
    float b = length(st.x) - length(st);
    float f = abs(a + b) - (time);

    float u = fract(atan(abs(st.y), abs(st.x)));
    float f2 = fract(u - length(st) + time);
    float f3 = fract(u + length(st) - time * 0.5);

    vec3 color = palette(f + f2 * f3, vec3(0.1), vec3(0.5), vec3(1.0,0.2,1.0), vec3(0.2,1.0,0.1));
    color = color - length(st) * 0.25;

    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = tex(st);
    gl_FragColor = vec4(color, 1.0);
}
