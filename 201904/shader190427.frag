precision mediump float;
uniform float time;
uniform vec2 resolution;

float smoothedge(float v, float f) {
  return smoothstep(0.0, f / resolution.x, v);
}

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float circlePlot(vec2 p, float radius) {
  return 1.0 - smoothedge(circle(p, radius), 1.0);
}

float wave(vec2 st, float n) {
    st = floor(st * n) + 0.5 / n;
    float d = distance(0.0, st.x + st.y) + distance(0.0, -st.x + st.y);
    return (0.5 + sin(d * 0.1 - time * 3.0)) * 0.3;
}

float box_wave(vec2 uv, float n){

    float angle = atan(uv.y,uv.x) + time * 0.5;
    vec2 st = fract(uv * n + sin(angle * 5.0)) - 0.5;
    float size = wave(uv, n);
    return circlePlot(st, size);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);


    color = vec3(box_wave(st, 24.0),box_wave(st, 48.0),box_wave(st, 12.0));
    color = mix(color,vec3(1.0,0.0,1.0), 0.5 - box_wave(st, 24.0));

    gl_FragColor = vec4(color, 1.0);
}
