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
    vec3 q = rotate(p, radians(time * 10.0), vec3(0.0, 1.0, 0.2));
    return sdOctahedron(q, 2.0);
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
        color = mix(color,vec3(0.0,0.0,1.0),0.7);
        color *= color;
    }else{
        color = vec3(0.2, 0.1, 0.4);
    }
    gl_FragColor = vec4(color, 1.0);
}
