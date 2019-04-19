precision mediump float;
uniform float time;
uniform vec2 resolution;

vec2 rotate(vec2 coord, float angle) {
  return mat2(cos(angle),-sin(angle),
              sin(angle),cos(angle)) * coord;
}

float smoothedge(float v, float f) {
  return smoothstep(0.0, f / resolution.x, v);
}

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float circlePlot(vec2 p, float radius) {
  return 1.0 - smoothedge(circle(p, radius), 1.0);
}

float rect(vec2 p, vec2 size) {
  vec2 d = abs(p) - size;
  return min(max(d.x, d.y), 0.0) + length(max(d,0.0));
}

float rectPlot(vec2 p, vec2 size) {
  return 1.0 - smoothedge(rect(p, size), 1.0);
}

float triangle(vec2 p, float size) {
  vec2 q = abs(p);
  return max(-p.y * 0.5, q.x * 0.866025 + p.y * 0.5) - size * 0.5;
}

float trianglePlot(vec2 p, float size) {
  return 1.0 - smoothedge(triangle(p, size), 1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution.y;
  vec3 color = vec3(1.0);

  vec3 mikuColors[5];
  mikuColors[0] = vec3(.075,.478,.498);
  mikuColors[1] = vec3(.525,.808,.796);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  color = mix(color, mikuColors[0], trianglePlot(vec2(st.x-0.5,st.y-0.65), 0.2)) + trianglePlot(st - vec2(0.5), 0.2);
  color = mix(color, mikuColors[1], rectPlot(vec2(st.x-0.5,st.y-0.5), vec2(0.09,0.04)));
  color = mix(color, mikuColors[2], rectPlot(vec2(st.x-0.5,st.y-0.4), vec2(0.15,0.04)));
  color = mix(color, mikuColors[2], rectPlot(vec2(st.x-0.5,st.y-0.28), vec2(0.04,0.12)));
  color = mix(color, mikuColors[4], rectPlot(vec2(st.x-0.61,st.y-0.3), vec2(0.04,0.10)));

  color = mix(color, mikuColors[0], trianglePlot(rotate(vec2(st.x-1.0,st.y-0.65), -0.3),0.15))+trianglePlot(rotate(vec2(st.x-1.1,st.y-0.60),-0.3), 0.2);
  color = mix(color, mikuColors[2], rectPlot(rotate(vec2(st.x-0.85,st.y-0.33), 1.0), vec2(0.11,0.04)));
  color = mix(color, mikuColors[4], rectPlot(rotate(vec2(st.x-1.05,st.y-0.33), -1.0), vec2(0.11,0.04)));
  color = mix(color, mikuColors[1], rectPlot(vec2(st.x-0.95,st.y-0.46), vec2(0.15,0.04)));
  color = mix(color, mikuColors[0], rectPlot(vec2(st.x-0.95,st.y-0.4), vec2(0.04,0.24)));

  color = mix(color, mikuColors[0], rectPlot(vec2(st.x-1.22,st.y-0.42), vec2(0.11,0.24))) + rectPlot(vec2(st.x-1.22,st.y-0.42), vec2(0.04,0.16));

  gl_FragColor = vec4(color,1.0);
}
