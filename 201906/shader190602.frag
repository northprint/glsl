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

    vec3 color = vec3(fract(max(length(str.x + str.y),length(cos(str.x) + cos(st.x))) + (time * 0.2)));
    color += vec3(0.5,0.0,0.8);
    color += vec3(fract(min(length(st.y),length(str.x) + cos(st.x)) + time));
    gl_FragColor = vec4(color * 0.6, 1.0);
}
