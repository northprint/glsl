precision mediump float;
uniform float time;
uniform vec2 resolution;

float cycle(vec2 p,float radius){
    float r = length(p) * radius;
    float a = atan(p.y, p.x) + time;
    return abs(sin(a + r));
}

float wave(vec2 st, float n) {
    st = max(st, n + (time * 0.05));
    float d = length(st);
    return dot(cos(d),n);
}

float cycle_wave(vec2 st, float n){
    return cycle(st, wave(st, n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);

    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, -1.0);
    vec3 cUp  = vec3(0.0, 1.0, 0.0);
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 0.3;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    vec3 color = vec3(cycle_wave(ray.xy, 12.0),cycle_wave(ray.xy, 24.0),cycle_wave(ray.xy, 36.0));
    gl_FragColor = vec4(color, 1.0);
}
