//https://wgld.org/d/glsl/g017.html

precision mediump float;
uniform float time;
uniform vec2 resolution;

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

float smoothMin(float d1, float d2, float k){
    float h = exp(-k * d1) + exp(-k * d2);
    return -log(h) / k;
}

vec3 trans(vec3 p){
  return mod(p, 4.0) - 2.0;
}

float sphere(vec3 p, float size){
    return length(p) - size;
}

float sdCone( vec3 p, vec2 c ){
  // c must be normalized
  float q = length(p.xy);
  return dot(c,vec2(q,p.z));
}

float distFunc(vec3 p){
    vec3 q = rotate(p, radians(time * 10.0), vec3(1.0, 0.5, 1.0));
    float d1 = sphere(trans(q), 0.5);
    float d2 = sdCone(trans(q),normalize(vec2(0.5,0.2)));
    return smoothMin(d1, d2,16.0);
}

vec3 getNormal(vec3 p,vec2 st){
    float d = 0.0001;
    return normalize(vec3(
        distFunc(p + vec3(  d, 0.0, 0.0)) - distFunc(p + vec3( -d, 0.0, 0.0)),
        distFunc(p + vec3(0.0,   d, 0.0)) - distFunc(p + vec3(0.0,  -d, 0.0)),
        distFunc(p + vec3(0.0, 0.0,   d)) - distFunc(p + vec3(0.0, 0.0,  -d))
    ));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec3  cPos = vec3(0.0, 0.0, 5.0);
    cPos += vec3(0.0, 0.0, time * 0.002);
    float fov = angle * 0.8 * PI / 360.0;

    vec3 ray = normalize(vec3(sin(fov)*st.x, sin(fov) * st.y, -cos(fov)));

    float dist = 0.0;
    float rLen = 0.0;
    vec3  dPos = cPos;

    for(int i = 0; i < 64; i++){
      dist = distFunc(dPos);
      rLen += dist;
      dPos = cPos + ray * rLen;
    }

    vec3 color;
    if(abs(dist) < 0.001){
        color = getNormal(dPos,st);
    }else{
        color = vec3(0.0);
    }
    gl_FragColor = vec4(color, 1.0);
}
