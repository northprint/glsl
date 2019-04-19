precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = gl_FragCoord.xy / resolution.y;
  st -= 0.5;
  vec3 color = vec3(0.0);

  for(float i=0.0; i<0.5; i+=0.1) {
    float u = sin((atan(st.y, st.x) + time * 0.1) * 20.0) * 0.05;
    float ru = sin((atan(st.y, st.x) + time * -0.1) * 20.0) * 0.05;
    float t = 0.01 / abs(0.5 - i + u - length(st));
    float rt = 0.01 / abs(0.5 - i + ru - length(st));

    color = mix(color,vec3(1.0,0.0,0.0),t);
    color = mix(color,vec3(0.0,1.0,0.0),rt);
    color = mix(color,vec3(0.0,0.0,1.0),t);
  }

  gl_FragColor = vec4(color,1.0);
}
