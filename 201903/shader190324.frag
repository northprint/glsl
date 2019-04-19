precision mediump float;
uniform float time;
uniform vec2 resolution;

float random (in float _x) {
    return fract(sin(_x)*1e4);
}

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float randomSerie(float _x, float _freq, float _t) {
    return step(0.8,random( floor(_x*_freq)-floor(_t) ));
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.x;

    vec3 color = vec3(0.0);

    float cols = 10.0;
    float freq = random(floor(time * 0.5)) + random(abs(atan(time) * 0.5));
    float t = 60.0 + time * ( 1.0 - freq ) * 40.0;

    if (fract(st.x * cols * 0.5) < 0.5){
        t *= -1.0;
    }
    if (fract(st.y * cols * 0.5) < 0.5){
        t *= -1.0;
    }

    freq += random(floor(st.x));
    freq += random(floor(st.y));

    float offset = 0.025;
    color = vec3(randomSerie(st.x, freq*10.0, t+offset),
                 randomSerie(st.x, freq*100.0, t),
                 randomSerie(st.x, freq*50.0, t-offset));

    color += vec3(randomSerie(st.y, freq*100.0, t-offset),
                  randomSerie(st.y, freq*10.0, t),
                  randomSerie(st.y, freq*40.0, t+offset));

    color = mix(color, vec3(.075,.478,.498), color.r);

    gl_FragColor = vec4(color,1.0);
}
