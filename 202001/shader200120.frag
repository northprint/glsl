precision mediump float;
uniform float time;
uniform vec2 resolution;

highp float rand(vec2 co){
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) + c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    st *= 2.0;

    float lng = length(st);
    float at = atan(st.y, st.x) - 0.1 * time + lng;
    st = vec2(cos(at) * lng, sin(at) * lng);
    st *= 1.0 + dot(lng, lng) * 0.5 + 1.0;

    vec2 rst = mod(st,1.0);
    rst -= 0.5;

    vec2 id = rst - st;
    vec3 color = vec3(
      fract((length(rst.x) * length(rst.y)) - time * rand(id)),
      sin((length(rst.x) + length(rst.y)) - time * rand(id)),
      fract((length(rst.x) + length(rst.y)) - time * rand(id) * 2.0)
    );

    gl_FragColor = vec4(color, 1.0);
}
