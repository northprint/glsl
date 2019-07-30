precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI acos(-1.0)
#define PI2 PI*2.0

// https://wgld.org/d/glsl/g020.html
// https://twitter.com/gaziya5/status/1152752166429327362

const vec3 lightDir = vec3(-0.57, 0.57, 0.57);

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

vec2 pmod(vec2 p, float r){
    float a = mod(atan(p.y, p.x), PI2 / r) - 0.5 * PI2 / r;
    return length(p) * vec2(sin(a), cos(a));
}

float sdCrossCapsule(vec3 p, float r){
  vec3 p1 = p;
  vec3 p2 = p;
  p1.x -= clamp( p1.x, -1.0, 1.0 );
  p2.y -= clamp( p2.y, -1.0, 1.0 );
  return min(length(p1) - r,length(p2) - r);;
}

// distance function
float distFunc(vec3 p){

    p.xy *= rotate(time * 0.5);

    for(int i=0; i<1; i++) {
      p.xy = pmod(p.xy, 8.0);
      p.y -= 2.0;
      p.yz = pmod(p.yz, 2.0);
      p.z -= 2.0;
    }

    p.xz = mod(p.xz, 2.0);
    p.xz -= 1.0;

    return sdCrossCapsule(p,0.1);

}

vec3 genNormal(vec3 p){
    float d = 0.0001;
    return normalize(vec3(
        distFunc(p + vec3(  d, 0.0, 0.0)) - distFunc(p + vec3( -d, 0.0, 0.0)),
        distFunc(p + vec3(0.0,   d, 0.0)) - distFunc(p + vec3(0.0,  -d, 0.0)),
        distFunc(p + vec3(0.0, 0.0,   d)) - distFunc(p + vec3(0.0, 0.0,  -d))
    ));
}

float genShadow(vec3 ro, vec3 rd){
    float h = 0.0;
    float c = 0.001;
    float r = 1.0;
    float shadowCoef = 0.5;
    for(float t = 0.0; t < 50.0; t++){
        h = distFunc(ro + rd * c);
        if(h < 0.001){
            return shadowCoef;
        }
        r = min(r, h * 16.0 / c);
        c += h;
    }
    return 1.0 - shadowCoef + r * shadowCoef;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);

    vec3 cPos = vec3(0.0, 0.0, time);
    vec3 cDir = vec3(0.0, 0.0, 1.0);
    vec3 cUp  = vec3(0.0, 4.0, 0.0);

    // camera and ray
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 1.0;
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    // marching loop
    float tmp, dist;
    tmp = 0.0;
    vec3 dPos = cPos;
    for(int i = 0; i < 64; i++){
        dist = distFunc(dPos);
        if(dist < 0.001){break;}
        tmp += dist;
        dPos = cPos + tmp * ray;
    }

    // light offset
    vec3 light = normalize(lightDir);

    // hit check
    vec3 color = vec3(1.0,sin(length(st)-0.1),length(st));
    float shadow = 1.0;
    if(abs(dist) < 0.001){
        // generate normal
        vec3 normal = genNormal(dPos);

        // light
        vec3 halfLE = normalize(light - ray);
        float diff = clamp(dot(light, normal), 0.1, 1.0);
        float spec = clamp(dot(halfLE, normal), 0.0, 1.0);

        // generate shadow
        shadow = genShadow(dPos + normal * 0.001, light);
        color = diff + vec3(spec) * vec3(1.0,0.2,0.0);
    }

    gl_FragColor = vec4(color * max(0.5, shadow) * 2.0, 1.0);

}
