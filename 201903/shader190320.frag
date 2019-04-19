precision mediump float;
uniform float time;
uniform vec2 resolution;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution;
  vec3 mikuColors[5];
  mikuColors[0] = vec3(.075,.478,.498);
  mikuColors[1] = vec3(.525,.808,.796);
  mikuColors[2] = vec3(.882,.157,.522);
  mikuColors[3] = vec3(.745,.784,.82);
  mikuColors[4] = vec3(.216,.231,.243);

  vec3 color = mikuColors[0];

  float rndNum = abs(rand(st * time) * 10.0);
  int num = int(sign(rndNum)*floor(abs(rndNum)));

  for(int i=0; i<5; i++) {
    if (num==i){
      color = mikuColors[i];
    }
  }

  gl_FragColor = vec4( color, 1.0 );
}
