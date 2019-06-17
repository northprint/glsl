precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

mat2 sheerX(float a){
  return mat2( 1.0, tan(a), 0.0, 1.0);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 10.0;
    st *= rotate(time * 0.5);
    st *= sheerX(time * 0.5);


    // https://wgld.org/d/glsl/g008.html
    // camera
    vec3 cDir = vec3(0.0, 0.0, 1.0);
    vec3 cUp  = vec3(0.0, 1.0, 1.0);
    vec3 cSide = cross(cDir,  cUp);
    float targetDepth = 1.0;
    // ray
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);
    ray *= 2.0;

    vec3 color = vec3(atan(ray.x + 0.2) * atan(ray.y - 0.2),0.4,0.5);
    color *= vec3(0.5,0.3,atan(ray.y + 0.5) * atan(ray.x - 0.5));
    color *= vec3(ray.x * ray.y);
    gl_FragColor = vec4( color * 2.0, 1.0 );
}
