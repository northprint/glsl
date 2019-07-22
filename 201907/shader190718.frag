precision mediump float;
uniform float time;
uniform vec2 resolution;

const vec3 cPos = vec3(0.0, 5.0, 5.0);
const vec3 cDir = vec3(0.0, -0.707, -0.707);
const vec3 cUp  = vec3(0.0,  0.707, -0.707);

const vec3 lightDir = vec3(-0.57, 0.57, 0.57);

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

// floor distance function
float sdFloor(vec3 p){
    return dot(p, vec3(0.0, 1.0, 0.0)) + 5.0;
}

float sdCapsuleY(vec3 p, float r){
    p.y -= clamp( p.y, -3.0, 3.0 );
    return length( p ) - r;
}

float sdCapsuleX(vec3 p, float r){
    p.x -= clamp( p.x, -3.0, 3.0 );
    return length( p ) - r;
}

// distance function
float distFunc(vec3 p){

    vec3 st = p;
    for(int i=0; i<6; i++) {
        st = abs(st);
        st.xy *= rotate(time * 0.2);
        st.yz *= rotate(time * 0.5);
    }

    return min(sdFloor(p),min(sdCapsuleX(st,1.0),sdCapsuleY(st,1.0)));
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
        float spec = pow(clamp(dot(halfLE, normal), 0.0, 1.0), 50.0);

        // generate shadow
        shadow = genShadow(dPos + normal * 0.001, light);

        color = vec3(1.0, 1.0, 1.0) * diff + vec3(spec);
    }

    gl_FragColor = vec4(color * max(0.5, shadow), 1.0);

}
