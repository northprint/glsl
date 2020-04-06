precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float plot(vec2 p, float v){
  return  smoothstep( v - 0.1, v, p.y) - smoothstep( v, v + 0.1, p.y);
}

float paint(vec2 p, float v){
  return  smoothstep( v, v + 0.1, p.y);
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec3 color = vec3(1.0);
  st *= 10.0;

  vec2 bst = st;
  vec2 rst = mod(st * 2.0, 1.0);
  rst -= 0.5;
  vec2 id = rst - st;

  st.y -= 5.2;
  color *= vec3(paint(st, 1.0 - abs(min(0.0,sin(st.x * 0.8 - time)))));
  st.y += 1.7;
  color += 1.0 - vec3(paint(st,abs(min(0.0,sin(st.x * 0.8 - time)))));

  st.y += 3.9;
  color *= vec3(paint(st,sin(st.x + time)));
  st.y += 2.2;
  color += 1.0 - vec3(paint(st,cos(st.x + 1.5 + time)));

  st.y += 4.8;
  color *= vec3(paint(st, 1.0 - pow(sin(st.x - time),10.0)));
  st.y += 1.4;
  color += 1.0 - vec3(paint(st, pow(sin(st.x - time),10.0)));

  color -= vec3(paint(rst * 2.0,sin(bst.y + 3.0)));

  gl_FragColor = vec4(color, 1.0);
}
