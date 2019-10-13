precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 st, float p){
  return smoothstep( p - 0.5, p, st.y) - smoothstep( p, p + 5.5, st.y);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 5.0;
    float f = min(length(cos(st.x * 2.0) - sin(st.y * 10.0)),length(cos(st.y * 2.0) - sin(st.x * 10.0)));

    vec3 color = vec3(plot(st,f + 1.0 * sin(time)),plot(st,f - 1.0 * sin(time)),plot(st,f - 2.5 * abs(sin(time))));
    color += vec3(plot(st,f + 2.5 + cos(time)),plot(st,f -2.5 + cos(time)),plot(st,f - 2.0 + cos(time)));
    color += vec3(plot(st,f + 5.5 + sin(time)),plot(st,f -5.5 + sin(time)),plot(st,f - 5.0 + sin(time)));

    gl_FragColor = vec4(color * 0.5, 1.0);
}
