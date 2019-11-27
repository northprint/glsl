precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float triangle(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.5 + PI;
    float ar = TWO_PI/float(3);
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) - time;
    return abs(tan(r + a - d));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 st2 = st * 10.0;
  // bump
  float lng = length(st);
  float at = atan(st.y, st.x) + lng * 5.0;
  st = vec2(cos(at) * lng, sin(at) * lng) * rotate(time * 0.2);
  st *= 10.0 + dot(lng, lng) * 0.5;

  vec2 id = st * 0.1 + sin(st.x + time);

  float t = time * 10.0;
  vec3 color = 1.0 - vec3(sin(length(id) * st.x + t));
  color *= vec3(0.0,0.2,1.0);
  color *= vec3(triangle(st2, 0.1));

  gl_FragColor = vec4(color * 0.8, 1.0);

}
