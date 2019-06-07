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

    st *= 10.0;
    vec2 str =  st * rotate(time * 0.5);
    vec2 str2 =  st * rotate(time * 0.2);
    vec2 str3 =  st * rotate(time * -0.2);

    vec3 color = vec3(fract((str.x + str.y) + (str.x - str.y)),0.0,0.5);
    color *= vec3(fract((str2.x + str2.y) + (str2.y - str2.x)));
    color *= vec3(dot(sin(str3.x * cos(time * 1.0)) * cos(str3.y * sin(time * 0.5)),2.0));

    gl_FragColor = vec4(color, 1.0);
}
