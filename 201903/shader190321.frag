precision mediump float;
uniform float time;
uniform vec2 resolution;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float linearstep(float begin, float end, float t) {
  return clamp((t - begin) / (end - begin), 0.0, 1.0);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution.x;
  vec3 mikuColors[5];

  mikuColors[0] = vec3(.075,.478,.498);
  mikuColors[1] = vec3(.525,.808,.796);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  vec3 color = mikuColors[0];
  vec2 f_st = fract(st);
  float t = mod(time, 2.0);

  for(float i=0.0; i<10.0; i++) {
    for(float j=0.0; j<10.0; j++) {
      if ((st.x>(i*0.1)) && (st.x<((i*0.1) + 0.1)) && (st.y>(j*0.1)) && (st.y<((j*0.1)+0.1))){

        float rndNum = abs(rand(vec2(i,j) * linearstep(0.0, 0.5, t)) * 5.0);
        int num = int(sign(rndNum) * floor(abs(rndNum)));

        if (num == 1){
          color = mikuColors[1];
        }
        if (num == 2){
          color = mikuColors[2];
        }
        if (num == 3){
          color = mikuColors[3];
        }
        if (num == 4){
          color = mikuColors[4];
        }
      }
    }
  }

  gl_FragColor = vec4( color, 1.0 );
}
