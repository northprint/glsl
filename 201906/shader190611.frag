precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float rect(vec2 p, vec2 size) {
    vec2 d = abs(p) - size;
    return min(max(d.x, d.y), 0.0) + length(max(d,0.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, -1.0);
    vec3 cUp  = vec3(0.0, 1.0, 1.0);
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 1.0;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    vec3 color = vec3(mod(ceil(rect(ray.xy * rotate(time),vec2(-time * 0.3))),0.9),0.0,0.0);
    color = mix(color,vec3(0.0,0.0,1.0),mod(ceil(rect(ray.xy,vec2(-time * 0.4))),0.9) * cos(ray.x + time));
    color = mix(color,vec3(0.2,0.8,0.0),mod(ceil(rect(ray.xy * rotate(-time),vec2(time * 0.5))),0.9) * sin(ray.x + time));

    gl_FragColor = vec4( color * 2.0, 1.0 );
}
