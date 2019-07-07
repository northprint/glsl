precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float sdBox(vec3 p, float s) {
    p = abs(p) - s;
    return max(max(p.x, p.y), p.z);
}

vec3 pattern(vec2 st) {
    st *= 2.0;
    vec3 color =  vec3(fract(sin(st.x + st.y)),fract(sin(st.x + st.y - (time * 5.0))),fract(sin(st.x + st.y + time)));
    return color;
}

const float pi = acos(-1.0);
const float pi2 = pi*2.;

vec2 pmod(vec2 p, float r) {
    float a =  atan(p.x, p.y) + pi/r;
    float n = pi2 / r;
    a = floor(a/n)*n;
    return p*rotate(-a);
}

float distFunc(vec3 p){

    p.yz = pmod(p.yz, 2.0);
    p.xy = mod(p.xy, 8.0);
    p -= vec3(0.0,4.0,0.0);

    for(int i=0; i<5; i++) {
        p = abs(p) - 1.0;
        p.xz *= rotate(1.0 + (time * 0.3));
        p.xy *= rotate(1.0 + (time * 0.2));
    }

    return sdBox(p,0.5);
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
    vec3 ro = vec3(time, 0.0, 0.0);
    vec3 ta = vec3(0.0, 0.0, 0.0);
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
      //vec3 hc = vec3(uv,uv.x);
      float f = exp(-ti * 0.05);
      color = hc * f;
    }
    gl_FragColor = vec4(color, 1.0);
}
