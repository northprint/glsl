precision mediump float;
uniform float time;
uniform vec2 resolution;

highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= 50.0;

    vec2 rst = mod(st,4.0);
    rst -= 2.0;

    vec2 id = rst - st;

    vec3 color = vec3(
      sin(length(rst) - time * rand(id)) + 0.5,
      sin(length(rst) - 2.0) + 0.5,
      fract(rand(id) + time));

    gl_FragColor = vec4(color, 1.0);
}
