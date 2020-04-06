precision mediump float;
uniform float time;
uniform vec2 resolution;

highp float rand(vec2 co){
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt= dot(co.xy ,vec2(a,b));
        highp float sn= mod(dt,3.14);
        return fract(sin(sn) * c);
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

  st *= 2.0 + (fract(time * 0.1) * 5.0);
  st = mod(st,2.0);
  st -= 1.0;

  vec2 fst = st;
  vec2 rst = mod(st * 20.0,0.5);
  rst -= 0.5;
  vec2 id = rst - st;
  fst.y += 0.5;
  color += vec3(smoothstep(0.01, 0.02, sdTrapezoid(fst,2.6,0.1,0.8)),id.y,id.y);
  color *= vec3(1.0-length(st)-0.1);

  color *= vec3(fract(rand(id) + time));


  gl_FragColor = vec4(color, 1.0);
}
