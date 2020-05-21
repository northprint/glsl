precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= rotate(time);
    float lng = length(st);
    float at = atan(st.y, st.x) + lng * 3.0;
    st = vec2(cos(at) * lng, sin(at) * lng);
    st *= 1.0 + dot(lng, lng) * 0.5;

    vec3 color = vec3(0.5);
    for(int i=0; i<8; ++i) {
      st = abs(st / dot(st,st));
      st -= 0.8 - cos(time * 0.5) * 0.3;
    }
    color.g -= length(st) - 0.5;
    color -= st.xyy;

    gl_FragColor = vec4(color, 1.0);
}
