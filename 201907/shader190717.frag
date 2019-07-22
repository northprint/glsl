precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);
    st *= 60.0;
    for(int i=0; i<5; i++) {
        st = abs(st);
        st *= rotate(time * 0.5);
    }

    vec2 a = mod(st, 5.0);
    vec2 id = st - a;
    vec3 color = vec3(pow(sin(length(id) * (time * 0.2)), 6.0),pow(cos(length(id) * 2.0), 2.0), pow(tan(length(id)), 6.0));


    gl_FragColor = vec4(color,1.0);
}
