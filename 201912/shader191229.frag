precision mediump float;
uniform float time;
uniform vec2 resolution;

float plot(vec2 p, float v){
  return  smoothstep( v - 0.5, v, p.y) - smoothstep( v + 0.5, v, p.y);
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
  vec3 color = vec3(0.1,0.2,0.8);

  vec2 fst = st;
  vec2 rst = mod(st * 3.5,0.5);
  rst -= 0.5;
  rst.y += 0.2;
  rst *= 10.0;

  fst.y += 0.3;
  color += vec3(smoothstep(0.01, 0.02, sdTrapezoid(fst,1.5,0.2,0.8)));

  rst.y += cos(time) + 0.5;
  color += vec3(plot(rst,sin(rst.x * 1.255 + time * 2.0)));
  color *= vec3(1.0 - plot(rst,sin(rst.x * 1.255 - time)),1.0,1.0);

  gl_FragColor = vec4(color, 1.0);
}
