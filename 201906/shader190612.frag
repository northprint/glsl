precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= rotate(time);

    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, -1.0);
    vec3 cUp  = vec3(cos(time * 0.5), 0.5, 1.0);
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 2.0;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    ray *= 10.0;
    ray = mod(ray,1.0);

    vec3 color = vec3(fract(sin(ray.x))) * vec3(fract(sin(ray.y)));
    color = mix(color,vec3(1.0,0.0,0.0),0.5);
    color += vec3(sin(ray.x + time) * cos(ray.x + time) * 0.5);

    vec3 ray2 = ray * 50.0;
    color *= vec3(0.5,0.0,(length(sin(ray2.x)) + length(cos(ray2.y))))  * 2.0;

    gl_FragColor = vec4( color, 1.0 );
}
