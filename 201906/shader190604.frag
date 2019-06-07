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

    st *= 4.0;
    vec2 str =  st * rotate(time * -0.5);
    vec2 str2 =  st * rotate(time * 1.5);
    vec2 str3 =  st * rotate(time * 1.0);

    vec3 color = vec3(dot(length(cos(str.x)) * length(sin(str2.y)), 2.0),
                      dot(length(cos(str3.x)) * length(sin(str.y)), 2.0),
                      dot(length(cos(str2.x)) * length(sin(str3.y)), 2.0));

    gl_FragColor = vec4(color, 1.0);
}
