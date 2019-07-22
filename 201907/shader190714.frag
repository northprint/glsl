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

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

mat3 camera(vec3 ro, vec3 ta, vec3 up){
    vec3 cw = normalize(ta-ro);
    vec3 cu = normalize(cross(cw,up));
    vec3 cv = normalize(cross(cu,cw));
    return mat3(cu,cv,cw);
}

float sdBox(vec3 p, float s) {
    p = abs(p) - s;
    return max(max(p.x, p.y), p.z);
}

float sdCapsule(vec3 p, float r){
    p.y -= clamp( p.y, -2.0, 2.0 );
    return length( p ) - r;
}

float sdCapsuleX(vec3 p, float r){
    p.x -= clamp( p.x, -2.0, 2.0 );
    return length( p ) - r;
}

float dist(vec3 p){
  p.xy = mod(p.xy, 2.0);
  p -= vec3(1.0);

  for(int i=0; i<2; i++) {
      p = abs(p) - 1.0;
      p.yz *= rotate(3.0);
  }

  return min(min(sdCapsule(p,0.2),sdCapsuleX(p,0.2)),sdBox(p,0.4));
}

vec3 tex(vec2 p){
  p *= 5.0;
  vec2 a = mod(p, 1.0);
  vec2 id = p - a;
  return vec3(fract(sin(p.x))) * vec3(fract(rand(id) + (time * 0.2)));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    vec3 color = vec3(length(st) * 0.5);

    vec3 ro = vec3(0.0,time,0.0);
    vec3 ta = vec3(0.0,0.0,0.0);
    vec3 up = normalize(vec3(0,0,1));
    vec3 ray = camera(-ro,ta,up) * normalize(vec3(st,1.0));

    color *= ray + 2.0;

    vec3 p = ro;
    float d  = 0.0;
    float ti = 0.0;
    for (int i= 0; i < 128; i++){
      d = dist(p);
      if (d < 0.001) break;
      p += ray * d;
    }

    if (d<0.001){
      vec2 uv = p.xz;
      vec3 hc = tex(uv);
      color = hc;
    }

    gl_FragColor = vec4(color,1.0);
}
