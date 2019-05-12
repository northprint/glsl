precision mediump float;
uniform float time;
uniform vec2 resolution;

float lazer(vec2 p,float radius){
    float r = (p.x * p.y) * radius;
    float a = sin(p.y + p.x) + time;
    return abs(sin(a + r));
}

float wave(vec2 st, float n) {
    st = max(st, n + (time * 0.05));
    float d = length(st);
    return dot(cos(d),n);
}

float lazer_wave(vec2 st, float n){
    return lazer(st, wave(st, n));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    st *= 10.0;

    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, 1.0);
    vec3 cUp  = vec3(1.0, 1.0, 0.0);
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 0.3;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    vec3 color = vec3(lazer_wave(ray.xy, 12.0),lazer_wave(ray.xy, 24.0),lazer_wave(ray.xy, 36.0));
    color.gb += fract(st - atan(length(st+time)));

    gl_FragColor = vec4(1.0 - color, 1.0);
}
