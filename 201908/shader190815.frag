precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

// http://www.iquilezles.org/www/articles/palettes/palettes.htm
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

vec3 tex(vec2 st){
    float f = length(st) - (time * 0.1);
    vec3 color = palette(f + f, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.5, 0.3, 1.0));
    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 st2 = st;
    st2 *= 20.0;

    vec3 color = tex(st) * tex(st2);
    gl_FragColor = vec4(color, 1.0);
}
