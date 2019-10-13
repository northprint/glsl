precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float plot(vec2 st, float p){
  return smoothstep( p - 1.0, p, st.y) - smoothstep( p, p + 1.5, st.y);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec2 st2 = st;

    st *= 3.0;
    st *= rotate(time * 0.2);

    float f = cos(st.x + st.y * sin(time * 0.5));
    float g = sin(st.x - st.y * cos(time * 0.5));

    vec3 color = vec3(plot(st,f + 0.5),plot(st,f - 0.5),plot(st,f));
    color += vec3(plot(st,g + 0.5),plot(st,g - 0.5),plot(st,g));

    color += vec3(plot(st,f + 2.5),plot(st,f + 1.5),plot(st,f + 2.0));
    color += vec3(plot(st,g + 2.5),plot(st,g + 2.0),plot(st,g + 1.5));
    color += vec3(plot(st,f - 2.5),plot(st,f - 1.5),plot(st,f - 2.0));
    color += vec3(plot(st,g - 2.5),plot(st,g - 2.0),plot(st,g - 1.5));


    gl_FragColor = vec4(color * 0.5, 1.0);
}
