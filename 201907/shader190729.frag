precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float sdCapsule(vec3 p, float r){
  p.x -= clamp( p.x, -1.0, 1.0 );
  return length(p) - r;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    //st *= 1.0;
    vec2 p =  st * rotate(time * 0.1);
    vec2 r =  st * rotate(-time);
    vec2 pd =  st * rotate(time * 0.2);
    vec3 color = vec3(1.0);
    color *= vec3(
      1.0 - sdCapsule(vec3(p.x,r.x,pd.y), 0.1),
      1.0 - sdCapsule(vec3(r.x,pd.y,p.y), 0.1),
      sdCapsule(vec3(pd.x,p.x,r.y), 0.1));
    gl_FragColor = vec4(color , 1.0);
}
