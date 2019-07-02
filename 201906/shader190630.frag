precision mediump float;
uniform float time;
uniform vec2 resolution;

highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

float map(vec3 p){
    p.y += 3.0;
    return p.y;
}

mat3 camera(vec3 ro, vec3 ta, vec3 up){
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(cw, up));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

vec3 colorDot(vec2 st){
    st *= 5.0;
    vec2 a = mod(st, 1.0);
    vec2 id = st - a;
    vec3 color = vec3(sin(length(id * 0.1) + 0.1),sin(length(id * 0.1)+2.0),sin(length(id * 0.1)+3.0));
    color += vec3(fract(rand(id) + time));

    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec3 color = vec3(0.0);
    vec3 ro = vec3(10.0, 3.0, 0.0);
    vec3 ta = vec3(0.0);
    vec3 up = normalize(vec3(0, 1, 0));
    vec3 ray = camera(ro, ta, up) * normalize(vec3(st, 1.0));

    vec3 p = ro;
    float d = 0.0;
    float ti = 0.0;
    float b = 0.0;

    for (int i = 0; i < 128; i++){
        d = map(p);
        if (d < 0.01) break;
        p += ray * d;
        ti += d;
    }
    if (d < 0.01){
      vec2 uv = p.xz;
      vec3 hc = colorDot(uv);
      float f = exp(-ti * 0.1);
      color = hc * f;
    }
    gl_FragColor = vec4(color, 1.0);
}
