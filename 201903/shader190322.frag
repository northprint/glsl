precision mediump float;
uniform float time;
uniform vec2 resolution;

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = time * _speed;
    if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(time)*2.0;
        } else {
            _st.x -= fract(time)*2.0;
        }
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        }
    }
    return fract(_st);
}

float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.5)-_st;
    return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

void main() {
  vec2 st = gl_FragCoord.xy/resolution.xy;
  vec3 mikuColors[5];

  st.x *= resolution.x/resolution.y;

  mikuColors[0] = vec3(.075,.478,.498);
  mikuColors[1] = vec3(.525,.808,.796);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  vec3 color = mikuColors[0];

  for(float i=0.0; i<5.0; i++) {
    vec2 move = movingTiles(st,4.0 + ((4.0 - i) * 2.0), 0.5 - (i * 0.3));
    color = mix(color,mikuColors[int(4.0 - i)],circle(move, 0.3));
  }

  gl_FragColor = vec4( color, 1.0 );
}
