precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec3 pattern(vec2 st) {
  st *= 3.0;
  vec2 str =  st * rotate(time * 0.01);
  vec2 str2 =  st * rotate(time * 0.05 + 0.2);

  vec3 color = vec3(dot(sin(str.x) * cos(str.y),10.0));
  color += vec3(1.0,0.0,0.0);
  color *= vec3(dot(sin(str2.x) * cos(str2.y),10.0));
  return color;
}

vec3 trans(vec3 p){
    return mod(p, 10.0) - 2.0;
}

float sphere(vec3 p){
    p.xz = mod(p.xz,5.0)-2.0;
    p.y -= 10.0;
    return length(p) - 1.0;
}

float distFunc(vec3 p){
    float f = p.y += 5.0;
    return min(f,sphere(p));
}

mat3 camera(vec3 ro, vec3 ta, vec3 up){
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(cw, up));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec3 color = vec3(0.0);
    vec3 ro = vec3(30.0, 10.0, 1.0);
    vec3 ta = vec3(0.0,-10.0,0.0);
    vec3 up = normalize(vec3(0, 1, 0));
    vec3 ray = camera(ro, ta, up) * normalize(vec3(st, 1.0));

    vec3 p = ro;
    float d = 0.0;
    float ti = 0.0;
    float b = 0.0;

    for (int i = 0; i < 128; i++){
        d = distFunc(p);
        if (d < 0.01) break;
        p += ray * d;
        ti += d;
    }

    if (d < 0.01){
      vec2 uv = p.xz;
      vec3 hc = pattern(uv);
      float f = exp(-ti * 0.05);
      color = hc * f;
    }
    gl_FragColor = vec4(color, 1.0);
}
