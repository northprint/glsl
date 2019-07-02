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

//https://wgld.org/d/glsl/g017.html
const float PI = 3.14159265;
const float angle = 60.0;

vec3 rotate(vec3 p, float angle, vec3 axis){
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    mat3 m = mat3(
        a.x * a.x * r + c,
        a.y * a.x * r + a.z * s,
        a.z * a.x * r - a.y * s,
        a.x * a.y * r - a.z * s,
        a.y * a.y * r + c,
        a.z * a.y * r + a.x * s,
        a.x * a.z * r + a.y * s,
        a.y * a.z * r - a.x * s,
        a.z * a.z * r + c
    );
    return m * p;
}

//http://iquilezles.org/www/articles/distfunctions/distfunctions.htm
float sdOctahedron( in vec3 p, in float s){
    p = abs(p);
    float m = p.x+p.y+p.z-s;
    vec3 q;
         if( 3.0*p.x < m ) q = p.xyz;
    else if( 3.0*p.y < m ) q = p.yzx;
    else if( 3.0*p.z < m ) q = p.zxy;
    else return m*0.57735027;

    float k = clamp(0.5*(q.z-q.y+s),0.0,s);
    return length(vec3(q.x,q.y-s+k,q.z-k));
}

float distFunc(vec3 p){
    vec3 q = rotate(p, radians(time * 5.0), vec3(0.0, 1.0, 0.0));
    float f = p.y += 10.0;
    return min(sdOctahedron(q, 7.0),f);
}

mat3 camera(vec3 ro, vec3 ta, vec3 up){
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(cw, up));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

vec3 colorDot(vec2 st){
    st *= 10.0;
    vec2 a = mod(st, 1.0);
    vec2 id = st - a;
    vec3 color = vec3(sin(length(id * 0.1) + 3.0),sin(length(id * 0.1) + 2.0),sin(length(id * 0.1) + 2.5));
    color += vec3(fract(rand(id) + time));

    return color;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec3 color = vec3(0.0);
    vec3 ro = vec3(10.0, cos(time * 0.1) + 3.0, cos(time * 0.1) * 5.0);
    vec3 ta = vec3(0.0,0.0,0.0);
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
      vec3 hc = colorDot(uv);
      float f = exp(-ti * 0.05);
      color = hc * f;
    }
    gl_FragColor = vec4(color, 1.0);
}
