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
  return max(-p.y, q.x * 0.866025 + p.y * 0.5) - size * 0.5;
}

float circle(vec2 p, float r){
  return length(p) - r;
}

float linearstep(float begin, float end, float t) {
    return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    float t = mod(time, 6.0);

    st *= 20.0;

    vec2 str = st * rotate(linearstep(0.0,1.0,t));
    vec2 str2 = st * rotate(linearstep(2.0,3.0,t));
    vec2 str3 = st * rotate(linearstep(4.0,5.0,t));

    vec3 color = vec3(mod(ceil(triangle(str,time)),0.9));
    color = mix(color,vec3(0.0,1.0,0.0),mod(ceil(triangle(str2,time)),0.6));
    color = mix(color,vec3(0.0,0.0,1.0),mod(ceil(triangle(str3,time)),0.9));
    color = mix(color,vec3(0.5,0.0,0.0),mod(ceil(circle(st,time)),0.9));

    gl_FragColor = vec4(color * 2.0, 1.0);
}
