precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 200.0;
    vec2 a = mod(st, 5.0);
    vec2 id = st - a;
    vec3 color = vec3(pow(sin(length(id) + time ), 6.0),pow(cos(length(id) - time * 2.0), 2.0), pow(tan(length(id) - time), 2.0));

    gl_FragColor = vec4(color, 1.0);
}
