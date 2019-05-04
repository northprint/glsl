//https://wgld.org/d/glsl/g012.html

precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = 3.14159265;
const float angle = 60.0;
const float fov = angle * 0.5 * PI / 360.0;
vec3  cPos = vec3(0.0, 0.0, 1.0);
const float sphereSize = 1.0;

float blink(vec2 st) {
  return (sin(st.x + time) * sin(st.y + time) + 0.1);
}

vec3 trans(vec3 p){
    return mod(p, 6.0) - 2.0;
}

float box(vec3 p){
    vec3 q = abs(trans(p));
    return (length(max(q - vec3(0.5, 0.5, 0.5), 0.0)));
}

float sphere(vec3 p){
    return length(trans(p)) - sphereSize;
}

vec3 getNormalBox(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        box(p + vec3(  d, 0.0, 0.0)) - box(p + vec3( -d, 0.0, 0.0)),
        box(p + vec3(0.0,   d, 0.0)) - box(p + vec3(0.0,  -d, 0.0)),
        box(p + vec3(0.0, 0.0,   d)) - box(p + vec3(0.0, 0.0,  -d))
    ));
}

vec3 getNormalSphere(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        sphere(p + vec3(  d, 0.0, 0.0)) - sphere(p + vec3( -d, 0.0, 0.0)),
        sphere(p + vec3(0.0,   d, 0.0)) - sphere(p + vec3(0.0,  -d, 0.0)),
        sphere(p + vec3(0.0, 0.0,   d)) - sphere(p + vec3(0.0, 0.0,  -d))
    ));
}

void main() {
    cPos += vec3(0.0, 0.0, time);
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    vec3 ray = normalize(vec3(sin(fov)*st.x, sin(fov) * st.y, -cos(fov)));


    float dist = 0.0;
    float rLen = 0.0;
    vec3  dPos = cPos;

    for(int i = 0; i < 64; i++){
      if (st.y > 0.001){
        dist = box(dPos);
      } else {
        dist = sphere(dPos);
      }
      rLen += dist;
      dPos = cPos + ray * rLen;
    }

    vec3 color;
    if(abs(dist) < 0.001){
        vec3 normal;
        if (st.y > 0.001){
            normal = getNormalBox(dPos);
        } else {
            normal = getNormalSphere(dPos);
        }
        color = vec3(blink(normal.xy),blink(normal.yz),blink(normal.xz));
    }else{
        color = vec3(0.0);
    }
    gl_FragColor = vec4(color, 1.0);
}
