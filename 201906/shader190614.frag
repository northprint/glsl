precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

mat2 sheerX(float a){
  return mat2( 1.0, tan(a), 0.0, 1.0);
}

float circle(vec2 p, float r){
  return length(p) - r;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= vec2(sheerX(sin(st.x + time))) * vec2(sheerX(st.y)) * rotate(time);

    vec2 p1 = vec2(sheerX(sin(st.x + time))) * vec2(sheerX(cos(st.x + time))) * rotate(time);
    vec2 p2 = vec2(sheerX(sin(st.y + time))) * rotate(time);

    vec3 color =  vec3(1.0-circle(st,1.0),1.0-circle(st,0.1),1.0 - circle(p1,0.5));
    color *= vec3(p2,1.0);

    gl_FragColor = vec4( color, 1.0 );
}
