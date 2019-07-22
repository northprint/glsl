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

// distance function
float distFunc(vec3 p){

    p.xy *= rotate(time * 0.2);

    for(int i=0; i<2; i++) {
      p.xy = pmod(p.xy, 6.0);
      p.y -= 2.0;
      p.yz = pmod(p.yz, 6.0);
      p.z -= 2.0;
    }

    return dot(abs(p),normalize(vec3(1.0))) - 0.5;

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

    vec3 cPos = vec3(0.0, 0.0, sin(time * 0.2));
    vec3 cDir = vec3(0.0, 0.0, 1.0);
    vec3 cUp  = vec3(0.0, 2.0, 0.0);

    // camera and ray
    vec3 cSide = cross(cDir, cUp);
    float targetDepth = 1.0;
    vec3 ray = normalize(cSide * st.x + cUp * st.y + cDir * targetDepth);

    // marching loop
    float tmp, dist;
    tmp = 0.0;
    vec3 dPos = cPos;
    for(int i = 0; i < 128; i++){
        dist = distFunc(dPos);
        if(dist < 0.001){break;}
        tmp += dist;
        dPos = cPos + tmp * ray;
    }

    // light offset
    vec3 light = normalize(lightDir);

    // hit check
    vec3 color;
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
        color = diff + vec3(spec) * vec3(0.2,0.8,0.2);
    }

    gl_FragColor = vec4(color * max(0.5, shadow), 1.0);

}
