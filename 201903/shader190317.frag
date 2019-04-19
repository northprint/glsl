precision mediump float;
uniform float time;
uniform vec2 resolution;

vec2 tileX(vec2 _st, float _zoom, float t){
    _st *= _zoom;
    float ymod = step(1.0, mod(_st.y,2.0));
    if (ymod == 0.0){
      _st.x -= t;
    } else {
      _st.x += t;
    }
    return fract(_st);
}

vec2 tileY(vec2 _st, float _zoom, float t){
    _st *= _zoom;
    float xmod = step(1.0, mod(_st.x,2.0));
    if (xmod == 0.0){
      _st.y -= t;
    } else {
      _st.y += t;
    }
    return fract(_st);
}

float linearstep(float begin, float end, float t) {
    return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

float circle(vec2 _st, float _size){
  vec2 dist = _st - vec2(0.5);
  return 1.0 - dot(dist,dist) * _size;
}

void main() {
  vec2 st = vec2(gl_FragCoord.xy) / resolution.x;
  vec3 color = vec3(0.0);
  float t = mod(time, 2.0);

  vec2 slideX = tileX(st,10.0,linearstep(0.0, 1.0, t));
  vec2 slideY = tileY(st,10.0,linearstep(1.0, 2.0, t));

  color = mix(vec3(1.0),vec3(0.8,0.2,0.5),circle(slideX,5.0));
  color += vec3(1.0 - circle(slideY, 5.0));

  gl_FragColor = vec4(color,1.0);
}
