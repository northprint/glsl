precision mediump float;
uniform float time;
uniform vec2 resolution;

float smoothen(float d1, float d2) {
    float k = 2.5;
    return -log(exp(-k * d1) + exp(-k * d2)) / k;
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.y;
    st *= 5.0;
    st = mod(st,2.0);

    vec2 p0 = vec2(0.0);
    vec2 p1 = vec2(0.0);

    if( st.y < 0.25 ) {
      p0 = vec2(0.5, cos(time) * 0.3 + 0.5);
      p1 = vec2(0.5, -cos(time) * 0.3 + 0.5);
    } else {
      p0 = vec2(cos(time) * 0.3 + 0.5, 0.5);
      p1 = vec2(-cos(time) * 0.3 + 0.5, 0.5);
    }

    float d = smoothen(distance(st, p0) * 5.0, distance(st, p1) * 5.0);
  	float ae = 10.0 / resolution.y;
    vec3 color = mix(vec3(1.0),vec3(0.2,0.8,0.4),1.0-smoothstep(0.8, 0.8+ae, d));
    gl_FragColor = vec4(color, 1.0);
}
