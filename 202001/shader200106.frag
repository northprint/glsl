precision mediump float;
uniform float time;
uniform vec2 resolution;

// http://www.iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
float dot2(in vec2 v ) { return dot(v,v); }

float sdTrapezoid( in vec2 p, in float r1, float r2, float he ){
    vec2 k1 = vec2(r2, he);
    vec2 k2 = vec2(r2 - r1, 2.0 * he);
    p.x = abs(p.x);
    vec2 ca = vec2(p.x - min(p.x,(p.y < 0.0) ? r1 :r2), abs(p.y) - he);
    vec2 cb = p - k1 + k2 * clamp(dot(k1 - p, k2) / dot2(k2), 0.0, 1.0 );
    float s = (cb.x < 0.0 && ca.y < 0.0) ? 1.0 : -1.0;
    return s * sqrt(min(dot2(ca), dot2(cb)));
}

void main() {
  vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec3 color = vec3(1.0);
  vec2 rst = mod(st * 0.2, 1.0);
  rst -= 0.5;
  vec2 id = rst - st;

  float lng = length(st);
  float at = atan(st.y, st.x);
  st = vec2(cos(at) * lng, sin(at) * lng);
  vec2 st2 = st * (dot(lng, lng) * 0.01 + 1.0);
  st *= dot(lng, lng) * 0.01 - 1.0;

  color *= vec3(st.y,st.y,smoothstep(0.01, 0.02, sdTrapezoid(st + vec2(0.0,0.5), 1.0 + pow(sin(time * id.y - 1.0),2.0), 0.2, 0.51)));
  color += vec3(smoothstep(0.01, 0.02, sdTrapezoid(st2 + vec2(0.0,0.5), 1.0 + pow(sin(time * id.y - 1.0),2.0), 0.2, 0.51)),st2.y,st2.y);
  color *= vec3(cos(time * id.y) + 0.5);
  color += vec3(0.05);

  gl_FragColor = vec4(color * 3.0, 1.0);
}
