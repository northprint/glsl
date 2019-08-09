precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);
const float PI2 = PI * 2.0;

// http://www.iquilezles.org/www/articles/tunnel/tunnel.htm
// http://www.iquilezles.org/www/articles/palettes/palettes.htm

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

vec2 pmod(vec2 p, float r){
    float a = mod(atan(p.y, p.x), PI2 / r) - 0.5 * PI2 / r;
    return length(p) * vec2(sin(a), cos(a));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);

    st *= 1.5;
    st = pmod(st, 6.0);
    float r = pow( pow(st.x * st.x, 0.2) + pow(st.y * st.y, 6.0), 1.0/10.0 );
    vec2 uv = vec2( 1.0/r + time);

    vec3 color = palette(length(uv), vec3(0.5), vec3(0.5), vec3(0.2, 1.0, 0.5), vec3(0.0, 0.3, 0.2));
    gl_FragColor = vec4(color , 1.0);
}
