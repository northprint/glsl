precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float sdCrossCapsule(vec3 p, float r){
  vec3 p1 = p;
  vec3 p2 = p;
  p1.x -= clamp( p1.x, -1.0, 1.0 );
  p2.z -= clamp( p2.z, -1.0, 1.0 );
  return min(length(p1) - r,length(p2) - r);;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    st *= 3.0;
    vec2 p =  st * rotate(time);
    vec2 r =  st * rotate(-time);
    vec2 pd =  st * rotate(time * 0.2);
    vec3 color = vec3(1.0);
    color *= vec3(
      fract(sdCrossCapsule(vec3(p.x,p.x,p.y), 0.1)),
      fract(sdCrossCapsule(vec3(r.x,r.y,r.y), 0.1)),
      fract(sdCrossCapsule(vec3(pd.x,pd.x,pd.y), 0.1)));
    gl_FragColor = vec4(color , 1.0);
}
