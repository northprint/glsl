precision mediump float;
uniform float time;
uniform vec2 resolution;

float wave(vec2 st, float n) {
    float d = (st.x * st.y);
    return d * 0.01 + (sin(st.x + time) * cos(st.y - time)) -  (cos(st.x + time) * sin(st.y - time));
}

float line(vec2 uv, float n){
    vec2 st = fract(uv * n) - 0.5;
    float size = wave(uv, n);
    return length(st) - size;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);

    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, -1.0);
    vec3 cUp  = vec3(cos(time * 0.5), 1.0, 0.0);
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 0.3;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    color = vec3(line(ray.xy, 10.0),line(ray.yz, 10.0),line(ray.xz, 10.0));
    gl_FragColor = vec4(color, 1.0);
}
