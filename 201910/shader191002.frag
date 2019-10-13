precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec2 pmod(vec2 p, float n) {
  float f = mod( atan( p.y, p.x), PI * 2.0 / n) - 0.5 * PI * 2.0 / n;
  return vec2( sin(f), cos(f)) * length(p);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= rotate(time * 0.5);

    st = vec2( mod( abs(atan( st.y, st.x )), PI * 5.0) - PI / 10.0 + time);
    st += pmod( st, PI / 1.0);

    vec2 m = mod(st, 1.0);
    vec2 id = st - m;
    id -= 5.0;
    id *= rotate(time);

    vec3 color = vec3(abs(sin(length(id))), abs(cos(time - length(id))), sin(time)) - fract(length(st));
    gl_FragColor = vec4(color, 1.0);
}
