precision mediump float;
uniform float time;
uniform vec2 resolution;

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

float dist(vec3 p){

  p.yz = mod(p.yz, 4.0);
  p.xy = mod(p.xy, 4.0);
  p -= vec3(2.0);

  for(int i=0; i<2; i++) {
      p = abs(p) - 1.2;
      p.yz *= rotate(10.0);
  }

  return min(sdCapsule(p,0.4),sdBox(p,0.5));
}

vec3 tex(vec2 p){
  return vec3(sin(p.x),cos(p.y),0.5);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    vec3 color = vec3(length(st),0.0,0.8);

    vec3 ro = vec3(time,0.0,0.0);
    vec3 ta = vec3(0.0,0.0,0.0);
    vec3 up = normalize(vec3(0,1,tan(-time * 0.1)));
    vec3 ray = camera(ro,ta,up) * normalize(vec3(st,0.5));

    vec3 p = ro;
    float d  = 0.0;
    float ti = 0.0;
    for (int i= 0; i < 64; i++){
      d = dist(p);
      if (d < 0.01) break;
      p += ray * d;
    }

    if (d<0.01){
      vec2 uv = p.xz;
      vec3 hc = tex(uv);
      color = hc;
    }

    gl_FragColor = vec4(color,1.0);
}
