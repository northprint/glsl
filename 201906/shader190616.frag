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

    st = st * rotate(time);

    vec3 color = vec3(circle(st,1.0));
    color = mix(color,vec3(1.0,0.0,0.0),0.5);
    color += vec3(0.0,0.0,fract(circle(st,time)));
    color += vec3(circle(st,1.0));

    color *= vec3(atan(st.x,st.x + fract(time)));
    color *= vec3(atan(st.y,st.y + fract(time)));

    gl_FragColor = vec4( color * 5.0, 1.0);
}
