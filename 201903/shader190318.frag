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

float smoothedge(float v, float f) {
  return smoothstep(0.0, f / resolution.x, v);
}

float circle(vec2 p, float radius) {
  return length(p) - radius;
}

float circlePlot(vec2 p, float radius) {
  return 1.0 - smoothedge(circle(p, radius), 1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution.y;
  vec3 color = vec3(1.0);
  vec3 pink = vec3(0.8,0.2,0.5);
  float t = mod(time, 6.0);

  float animation1 = circlePlot(st - vec2(0.5), easeInOutCubic(linearstep(3.0, 0.0, t)));
  float animation2 = circlePlot(st - vec2(0.5), easeInOutCubic(linearstep(3.0, 6.0, t)));
  color = mix(color, pink, animation1);
  color = mix(color, pink, animation2);

  gl_FragColor = vec4(color,1.0);
}
