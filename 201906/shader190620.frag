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

    st *= 15.0;

    vec2 a = mod(vec2(st.x - (time * 5.0),st.y), 10.0);
    vec2 b = mod(vec2(st.x - 2.5 + (time * 5.0),st.y - 5.0), 10.0);

    vec2 gv = length(a) < length(b) ? a : b;
    vec2 id = st - gv;
    gv -= 2.5;
    gv = gv * rotate(time  * 5.0);

    vec3 color = vec3(length(atan(gv.x)) + length(atan(gv.y)) - circle(gv,0.2));
    color += vec3(sin(id.x),0.0,sin(id.y)) * 0.3;

    gl_FragColor = vec4( 1.0 - color, 1.0);
}
