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

    st *= 6.0;

    vec2 a = mod(st, 5.0);
    vec2 b = mod(st - 2.5, 5.0);
    st = length(a) < length(b) ? a : b;

    st -= 1.5;
    st = st * rotate(time* 0.5);

    vec3 color = vec3(0.8,0.1,0.0);

    color *= min(length(atan(st.x)),length(atan(st.y))) * 0.5;
    color *= min(length(atan(-st.x)),length(atan(-st.y)));
    color *= reflect(color, vec3(10.0));
    color += vec3(1.0 - circle(st,1.0));
    color = mix(color,vec3(0.8,0.2,0.3),0.5);
    color -= vec3(circle(st,0.1)) * 0.4;

    gl_FragColor = vec4( color, 1.0);
}
