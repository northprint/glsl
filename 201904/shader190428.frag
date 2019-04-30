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
  return smoothedge(circle(p, radius), 1.0);
}

float wave(vec2 st, float n) {
    st = (sin(st) * n);
    float d = length(st * 1.0) - 0.5;
    return (d * 0.01);
}

float circle_wave(vec2 uv, float n){

    float angle = atan(uv.y, uv.x) * 5.0 + time * 2.0;
    vec2 st = fract(uv * n) - 1.0;
    float size = wave(uv + angle, n);
    return circlePlot(st + 0.5, size);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);

    color = vec3(circle_wave(st, 24.0),circle_wave(st, 48.0),circle_wave(st, 12.0));

    gl_FragColor = vec4(color, 1.0);
}
