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

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 2.0;

    vec2 str = st * rotate(time * 0.2);
    vec2 str2 = st * rotate(time * -0.2);
    vec2 str3 = st * rotate(time * 0.3);

    vec3 color = vec3(ceil(sin(str.x) * cos(str.y)));
    color *= vec3(ceil(sin(str2.x) * cos(str2.y)));
    color += vec3(ceil(sin(str3.x) * cos(str3.y)),0.5,0.5);
    color += vec3(mod(ceil(circle(st,time)),0.7) * 0.5);
    color += vec3(0.5,0.2,0.4);

    gl_FragColor = vec4(color, 1.0);
}
