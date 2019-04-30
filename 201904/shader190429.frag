precision mediump float;
uniform float time;
uniform vec2 resolution;

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float wave(vec2 st, float n) {
    //st = st * n;
    float d = length(st * 2.0) - 0.5;
    return (d * (sin(time * 0.8)));
}

float circle_wave(vec2 uv, float n){
    vec2 st = fract(uv * n) - 0.5;
    float size = wave(uv, n);
    return 1.0 - circle(st, size);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);

    color = vec3(circle_wave(st, 1.0),circle_wave(st, 4.0),circle_wave(st, 10.0));
    color *= mix(color,vec3(circle_wave(st, 2.0),circle_wave(st, 4.0),circle_wave(st, 1.0)), -1.0);

    gl_FragColor = vec4(color, 1.0);
}
