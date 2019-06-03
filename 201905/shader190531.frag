precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
  float c=cos(r);
  float s=sin(r);
  return mat2(c,-s,s,c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 4.0;

    vec2 str =  st * rotate(time * 0.5);

    vec3 color = vec3(fract(max(length(str.x),length(str.y)) - time) * 0.5, 0.0, 0.0);
    color += vec3(fract(length(st.x) + length(st.y) + time) * 0.5, 0.0, 0.2);
    //color += vec3(1.0-fract(min(length(str.x),length(str.y)) + time) * 1.2,0.0,0.0);
    gl_FragColor = vec4(color, 1.0);
}
