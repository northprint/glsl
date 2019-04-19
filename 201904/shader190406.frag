precision mediump float;
uniform float time;
uniform vec2 resolution;

float smoothen(float d1, float d2) {
    float k = 2.5;
    return -log(exp(-k * d1) + exp(-k * d2)) / k;
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.y;

    st *= 4.0;
    st = mod(st,1.0);

    vec2 p0 = vec2(0.5, cos(time * 1.5) * 0.3 + 0.5);
    vec2 p1 = vec2(0.5, -cos(time) * 0.3 + 0.5);
    vec2 p2 = vec2(sin(time * 1.5) * 0.3 + 0.5, 0.5);
    vec2 p3 = vec2(-sin(time) * 0.3 + 0.5, 0.5);
    vec2 p4 = vec2(cos(time * 1.5) * 0.3 + 0.5, sin(time * 1.5) * 0.3 + 0.5);
    vec2 p5 = vec2(-cos(time) * 0.3 + 0.5, -sin(time) * 0.3 + 0.5);

    float d1 = smoothen(distance(st, p0) * 5.0, distance(st, p1) * 5.0);
    float d2 = smoothen(distance(st, p2) * 5.0, distance(st, p3) * 5.0);
    float d3 = smoothen(distance(st, p4) * 5.0, distance(st, p5) * 5.0);

  	float ae = 20.0 / resolution.y;
    vec3 color = mix(vec3(0.0),vec3(0.0,1.0,0.0),smoothstep(0.8, 0.8+ae, d1));
    color += mix(color,vec3(1.0,0.0,0.0),smoothstep(0.8, 0.8+ae, d2));
    color += mix(color,vec3(0.0,0.0,1.0),smoothstep(0.8, 0.8+ae, d3));

    gl_FragColor = vec4(color, 1.0);
}
