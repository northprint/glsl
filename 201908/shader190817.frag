precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

// http://www.iquilezles.org/www/articles/palettes/palettes.htm
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

vec3 tex(vec2 st){

    float u = cos(atan(abs(st.y), abs(st.x)) + time);
    float u2 = sin(atan(abs(st.y), abs(st.x)));
    float f = abs(u - length(st)) - time;
    float f2 = abs(u2 - length(st)) + (time * 0.5);

    vec3 color = palette(f + f2, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.1, 0.8, 0.2));
    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = tex(st);
    gl_FragColor = vec4(color, 1.0);
}
