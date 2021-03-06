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

    st  *= 5.0;
    vec2 m = mod(st, 1.0);
    vec2 id = vec2(rand(st - m));

    vec3 color = vec3( sin(id.x + time) * sin(length(st) * 10.0) * 1.5,
      cos(id.x + time * 2.0) * sin(length(st) * 2.0) * 1.5,
      cos(id.x + time * 6.0) * cos(length(st) * 5.0) * 3.0);
    gl_FragColor = vec4(color, 1.0);
}
