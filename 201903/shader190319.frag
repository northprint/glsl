precision mediump float;
uniform float time;
uniform vec2 resolution;

float easeInOutCubic(float t) {
  if ((t *= 2.0) < 1.0) {
    return 0.5 * t * t * t;
  } else {
    return 0.5 * ((t -= 2.0) * t * t + 2.0);
  }
}

float linearstep(float begin, float end, float t) {
  return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution;

  vec3 mikuColors[6];
  mikuColors[0] = vec3(.075,.478,.498);
  mikuColors[1] = vec3(.525,.808,.796);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  vec3 color = mikuColors[0];
  float t = mod(time, 5.0);

  for(float i=1.0; i<5.0; i++) {
    color = mix(color, mikuColors[int(i)], step(1.0 - st.x + (i * 0.1), easeInOutCubic(linearstep(i - 1.0, i, t))));
  }
  color = mix(color, mikuColors[0], step(1.0 - st.x, easeInOutCubic(linearstep(4.0, 5.0, t))));

  gl_FragColor = vec4(color,1.0);
}
