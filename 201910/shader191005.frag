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
    m -= 0.5;
    vec2 id = st - m;

    vec3 color = vec3(sin(rand(id) + time) + sin(st.y * 30.0), cos(rand(id) + time) + cos(st.x * 20.0), fract(rand(id + time)));
    gl_FragColor = vec4(color, 1.0);
}
