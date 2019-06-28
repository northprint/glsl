precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= 100.0;
    vec2 a = mod(st, 5.0);
    vec2 id = st - a;
    vec3 color = vec3(sin(length(id * 0.1) * time) + 0.5,cos(length(id * 0.1)) + 0.2,fract(length(id * 0.1))+0.5);
    color *= vec3(sin(length(id * 0.1) - (time * 5.0)));
    gl_FragColor = vec4(color, 1.0);
}
