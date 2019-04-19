precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359

float point( vec2 p ){
    float b = 0.2;
    for( int i=0; i<5; ++i ){
        float d = pow( 1.0 /( distance( p, vec2(0.5) )+1.0 ), 15.0 );
        b += d;
    }
    return b;
}

void main() {
  vec2 op = gl_FragCoord.xy / resolution.xy;
  vec2 p = op - vec2(0.5,0.5);
  float dist = length(p*.5);
  float th = atan( p.y, p.x ) + tan(time) * dist * 10.0;
  p = vec2( th*2.0/PI, 0.1/dist );

  float col = clamp( point(mod( p*5.0, 1.0 )), 0.0, 1.0 );
  gl_FragColor = vec4( vec3(col,col*.4,col)/0.3, 1.0 );
}
