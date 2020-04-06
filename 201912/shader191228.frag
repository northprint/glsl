precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.01, v, p.y) - smoothstep( v + 0.01, v, p.y);
}

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
  vec3 color = vec3(0.1,0.5,0.8);
  color *= vec3(sin(st.y + time * 0.5));

  color += vec3(plot(st,sdTrapezoid(st,0.55,0.5,0.8)),1.0,1.0);
  st.x -= 0.05;
  st += 0.2;
  color -= vec3(plot(st,sdTrapezoid(st,0.55,0.5,0.8)));
  st.x -= 0.05;
  st += 0.2;
  color += vec3(plot(st,sdTrapezoid(st,0.55,0.5,0.8)));
  st.x -= 0.05;
  st += 0.2;
  color += vec3(plot(st,sdTrapezoid(st,0.55,0.5,0.8)));
  st.x -= 0.05;
  st += 0.2;
  color -= vec3(plot(st,sdTrapezoid(st,0.55,0.5,0.8)));
  color *= vec3(0.4,0.35,0.85);

  gl_FragColor = vec4(color, 1.0);
}
