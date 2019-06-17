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

mat2 sheerY(float a){
  return mat2( 1.0, 0.0, tan(a), 1.0);
}

float circle(vec2 p, float r){
  return length(p) - r;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 st2 = st;
    st *= sheerY(st.y) + sheerX(st.y) * rotate(time);
    st2 *= sheerX(st2.y) + sheerY(st2.y) * rotate(time);

    vec3 color = vec3(fract(circle(st,time)),0.0,0.0);
    color += vec3(0.0,0.5,fract(circle(st2,-time)));
    color *= vec3(circle(st2,0.2));
    color += vec3(1.0-sin(st.x),0.0,1.0-sin(-st.x));

    gl_FragColor = vec4( color * 0.5, 1.0);
}
