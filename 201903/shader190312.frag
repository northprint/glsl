precision mediump float;
uniform float time;
uniform vec2 resolution;

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    float ymod = step(1.0, mod(_st.x,2.0));
    if (ymod == 0.0){
      _st.y -= time;
    } else {
      _st.y += time;
    }
    return fract(_st);
}

float circle(vec2 _st, float _size){
  vec2 dist = _st - vec2(0.5);
  return 1.0 - dot(dist,dist) * _size;
}

void main() {
  vec2 st = vec2(gl_FragCoord.xy) / resolution.x;
  vec3 color = vec3(0.0);
  st = tile(st,10.0);
  color = mix(vec3(1.0),vec3(0.8,0.2,0.5),circle(st,5.0));
  gl_FragColor = vec4(color,1.0);
}
