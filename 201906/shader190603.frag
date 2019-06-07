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

    st *= 30.0;
    vec2 str =  st * rotate(time * 0.2);
    vec2 str2 =  st * rotate(time * 0.1 + 0.2);

    vec3 color = vec3(dot(sin(str.x) * cos(str.y),10.0));
    color += vec3(1.0,0.0,0.0);
    color *= vec3(dot(sin(str2.x) * cos(str2.y),10.0));

    gl_FragColor = vec4(color * 0.6, 1.0);
}
