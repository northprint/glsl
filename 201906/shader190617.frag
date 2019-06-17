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

    st = st * rotate(time* 0.2);
    vec2 st2 = st * rotate(time * 0.5);

    vec3 color = vec3(0.8,0.2,0.0);
    color *= min(length(atan(-st.y,st.x)),length(atan(st.x,st.y)));
    color *= min(length(atan(-st.y,-st.x)),length(atan(-st.x,-st.y)));

    vec3 color2 = vec3(0.0,0.0,sin(0.8));
    color2 *= min(length(atan(st2.y,st2.x)),length(atan(st2.x,st2.y)));
    color2 *= min(length(atan(-st2.y,-st2.x)),length(atan(-st2.x,-st2.y)));

    color += vec3(1.0 - circle(st,0.1));
    color *= vec3(circle(st2,0.01));

    gl_FragColor = vec4( color + color2, 1.0);
}
