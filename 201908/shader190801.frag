precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

// http://www.iquilezles.org/www/articles/tunnel/tunnel.htm
// http://www.iquilezles.org/www/articles/palettes/palettes.htm

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);

    float r = pow( pow(st.x * st.x, 4.0) + pow(st.y * st.y, 4.0), 1.0/20.0 );
    vec2 uv = vec2( 0.8/r + 0.5 * time);

    vec3 color = palette(length(uv), vec3(0.5), vec3(0.5), vec3(2.0, 1.0, 0.0), vec3(0.3, 0.2, 0.2));

    gl_FragColor = vec4(color , 1.0);
}
