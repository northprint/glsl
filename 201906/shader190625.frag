precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= 200.0;
    vec2 a = mod(st, 5.0);
    vec2 id = st - a;
    vec3 color = vec3(min(fract(length(id)-time),sin(length(id))),0.0,sin(length(id))+cos(length(id)));
    color += vec3(atan(fract(length(id)),cos(length(id)+time)));
    gl_FragColor = vec4(color, 1.0);
}
