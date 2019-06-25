precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float circle(vec2 p, float r){
  return length(p) - r;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 10.0;
    st *= rotate(time * 0.4);

    vec2 a = mod(vec2(st.x + time,st.y ), 10.0);
    vec2 b = mod(vec2(st.x - 5.0 - time,st.y - 5.0), 10.0);

    vec2 gv = length(a) < length(b) ? a : b;
    vec2 id = st - gv;
    gv -= 2.5;

    vec3 color = vec3(circle(gv,1.0) * circle(gv,1.5) + length(sin(st) * 0.5));
    color += vec3(sin(id.x),sin(id.y),0.0) * 0.5;

    gl_FragColor = vec4(color, 1.0);
}
