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
    st *= rotate(time * 0.2);

    float a = length(st.y);
    float b = length(st.x);
    float f = abs(a + b);

    vec2 p = st * rotate(PI/4.0);
    float a2 = length(p.y);
    float b2 = length(p.x);
    float f2 = abs(a2 * b2) - (time * 0.5);

    vec3 color = palette(f + f2, vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.8,0.1,0.5));
    //color = color - length(st) * 0.45;

    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    //st *= 10.0;
    vec3 color = tex(st);
    gl_FragColor = vec4(color, 1.0);
}
