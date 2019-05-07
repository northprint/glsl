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
    st = max(st,n+time);
    float d = length(st);
    return sin(d) * cos(d) + 1.0;
}

float scale_wave(vec2 st, float n){
    return circlePlot(st, wave(st, n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec2 st2 = st;
    vec2 st3 = st;

    vec3 color = vec3(0.0);
    st *= 2.0;
    st = mod(st,1.0);
    st.y -= 0.5;

    color = vec3(scale_wave(st, 12.0),scale_wave(st, 24.0),scale_wave(st, 48.0));

    color = 1.0 - floor(st2.x + 1.5) * (1.0 - color);

    st3.x += 1.0;
    st3.y -= 0.5 + (sin(time) * 0.1);
    color *= floor(length(st3 * 6.5)) - floor(length(st3 * 4.0));

    gl_FragColor = vec4(color, 1.0);
}
