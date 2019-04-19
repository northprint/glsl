precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 st = 20.0 * vec2(gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.x;
  float p = mod(st, 1.0 ).x + mod(st, 1.0 ).y;
  vec3 col = vec3(.075,.478,.498);

  vec3 mikuColors[5];
  mikuColors[0] = vec3(.525,.808,.796);
  mikuColors[1] = vec3(.075,.478,.498);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  for(float i=-5.0; i<0.0; i++) {
    if ((st.x>i) && (st.x<(i+1.0))){
      col = mikuColors[int(i+5.0)];
    }
  }

  gl_FragColor = vec4( col * step(0.0,p), 1.0 );
}
