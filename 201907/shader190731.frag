precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

highp float rand(vec2 co){
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt= dot(co.xy ,vec2(a,b));
        highp float sn= mod(dt,3.14);
        return fract(sin(sn) * c);
}

// http://www.iquilezles.org/www/articles/palettes/palettes.htm

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);

    st *= 30.0;
    vec2 a = mod(st, 1.0);
    vec2 id = st - a;

    vec3 color = palette(sin(length(id * 0.1)), vec3(0.5), vec3(0.5), vec3(1.0), vec3(0.00, 0.33, 0.67));
    color += vec3(fract(rand(id) + time));

    gl_FragColor = vec4(color , 1.0);
}
