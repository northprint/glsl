precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float triangle(vec2 p, float size){
  vec2 q = abs(p);
  return max(-p.y * 0.75, q.x * 0.866025 + p.y * 0.5) - size * 0.5;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 10.0;

    vec2 str = st * rotate(time * 0.2);
    vec2 str2 = st * rotate(time * 0.3);
    vec2 str3 = st * rotate(time * 0.4);

    vec3 color = vec3(mod(ceil(triangle(str,time)),0.3));
    color += vec3(mod(ceil(triangle(str2,time)),0.6));
    color += vec3(mod(ceil(triangle(str3,time)),0.4));
    color += vec3(0.0,0.45,0.4);

    gl_FragColor = vec4(color * 1.1, 1.0);
}
