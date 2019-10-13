precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st  *= 10.0;
    vec2 m = mod(st, 1.0);
    vec2 id = st + m;

    vec3 color = vec3( cos(id.x + time),
      cos(id.x + time * 3.0),
      cos(id.x + time * 6.0));

      color += vec3( sin(id.y - time),
        sin(id.y - time),
        sin(id.y - time));
    gl_FragColor = vec4(color, 1.0);
}
