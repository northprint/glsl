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

    st *= 2.0;

    vec2 str =  st * rotate(time);

    vec3 color = vec3(0.0,0.0,fract(max(length(str.x),length(st.y)) - time));
    color += vec3(fract(min(length(st.x),length(str.y)) + time),0.0,0.0);
    gl_FragColor = vec4(color, 1.0);
}
