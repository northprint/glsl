precision mediump float;
uniform float time;
uniform vec2 resolution;

float random (float seed){
  return fract(sin(seed) * 43758.5453);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec3 color = vec3(0.0);

  float t = sin(time * 0.5);
  color = mix(color,vec3(0.0,0.5,0.0),noise(vec2(random(atan(st.x,t)))));
  color += mix(color,vec3(1.0,0.0,1.0),noise(vec2(t)));
  color += mix(color,vec3(0.0,1.0,0.0),noise(vec2(t * 0.5)));
  color /= 1.5;
  gl_FragColor = vec4(color, 1.0);
}
