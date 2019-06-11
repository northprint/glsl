precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float circle(vec2 p, float r){
    return length(p) - r;
}

float rect(vec2 p, vec2 size) {
    vec2 d = abs(p) - size;
    return min(max(d.x, d.y), 0.0) + length(max(d,0.0));
}

float triangle(vec2 p, float size){
    vec2 q = abs(p);
    return max(-p.y, q.x * 0.866025 + p.y * 0.5) - size * 0.5;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, -1.0);
    vec3 cUp  = vec3(0.0, 1.0, sin(time));
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 0.3;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    vec3 color = vec3(mod(ceil(rect(ray.xy * rotate(time),vec2(-time * 0.4))),0.8),0.0,0.0);
    color = mix(color,vec3(0.0,0.0,1.0),mod(ceil(circle(ray.xy,-time)),0.8));
    color = mix(color,vec3(0.0,1.0,0.0),mod(ceil(triangle(ray.xy * rotate(time),-time * 0.4)),0.6));

    gl_FragColor = vec4( color, 1.0 );
}
