precision mediump float;
uniform float time;
uniform vec2 resolution;

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= 20.0;
    vec2 rst = mod(st,2.0);
    rst -= 1.0;
    vec2 id = rst - st;
    vec3 color = vec3(
      fract(sin(length(st) - (length(rst) + time))),
      fract(sin(length(id)) + time),
      fract((length(rst.x) + length(rst.y)))
    );
    color *= vec3(fract((length(rst.x) + length(rst.y))));
    gl_FragColor = vec4(color, 1.0);
}
