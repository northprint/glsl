precision mediump float;
uniform float time;
uniform vec2 resolution;

const float PI = acos(-1.0);

// http://www.iquilezles.org/www/articles/palettes/palettes.htm

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(2.0 * PI *(t * c + d));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x , resolution.y);

    vec3 mikuColors[5];
    mikuColors[0] = vec3(.525,.808,.796);
    mikuColors[1] = vec3(.075,.478,.498);
    mikuColors[2] = vec3(.882,.157,.522);
    mikuColors[3] = vec3(.745,.784,.82);

    vec3 color = palette(length(st) + time, mikuColors[0], mikuColors[2], mikuColors[3], mikuColors[1]);

    gl_FragColor = vec4(color , 1.0);
}
