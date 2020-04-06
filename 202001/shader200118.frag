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
    st *= 10.0;


    vec2 rst = mod(st,1.0);
    rst -= 0.5;

    vec2 id = rst - st;
    id = abs(id);

    vec3 color = vec3(
    fract((length(st.x) + length(st.y)) - time * rand(id)),
    fract(length(rst) - time * rand(id) * 2.0),
    fract(length(rst) - time * rand(id) * 2.0) * 2.0);

    color *= vec3(fract(length(st) - time * rand(id)));

    gl_FragColor = vec4(color, 1.0);
}
