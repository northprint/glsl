precision mediump float;
uniform float time;
uniform vec2 resolution;

float circle(vec2 p, float r){
  return length(p) - r;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec3 color = vec3(0.8,0.2,0.0);
    color *= min(length(-(sin(time)) + atan(-st.y,st.x)),length((sin(time) + 1.0) + atan(st.x,st.y)));
    color *= min(length((sin(time)) + atan(-st.y,-st.x)),length((sin(time) + 1.0) + atan(-st.x,-st.y)));
    color *= reflect(color, vec3(1.5));
    color += vec3(1.0 - circle(st,1.0));
    color = mix(color,vec3(0.8,0.2,0.3),0.5);

    color -= vec3(circle(st,0.1)) * 0.5;


    gl_FragColor = vec4( color, 1.0);
}
