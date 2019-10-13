precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 st, float p){
  return smoothstep( p - 1.0, p, st.y) - smoothstep( p, p + 1.0, st.y);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 5.0;
    float f = max(length(cos(st.x * 20.0) - sin(st.y)),length(cos(st.y * 20.0) - sin(st.x)));

    vec3 color = vec3(plot(st,f + 1.5 * sin(time)),plot(st,f - 1.5 * sin(time)),plot(st,f - 1.0 * sin(time)));
    color += vec3(plot(st,f + 2.5 + cos(time)),plot(st,f -2.5 + cos(time)),plot(st,f - 2.0 + cos(time)));
    color += vec3(plot(st,f + 5.5 + cos(time)),plot(st,f -5.5 + cos(time)),plot(st,f - 5.0 + cos(time)));

    gl_FragColor = vec4(color, 1.0);
}
