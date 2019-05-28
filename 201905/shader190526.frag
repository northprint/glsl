precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359
#define TWO_PI 6.28318530718

// Author: @patriciogv
// Title: CellularNoise
vec2 random( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float pattern(vec2 p){
    float a = atan(p.y,p.x) + time * 0.5 + PI;
    float r = TWO_PI/float(3);
    float d = cos(floor(0.5 + a / r) * r - a) * length(p);
    return d + length(p);
}

float tile(vec2 st, float div){
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.0;  // minimun distance
    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));
            // Random position from current + neighbor place in the grid
            vec2 point = random(i_st + neighbor);
            // Animate the point
            point = 0.5 + 0.8 * sin(time * point + div);
            // Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;
            // Distance to the point
            float dist = length(pattern(diff));
            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }
    return m_dist;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);

    st *= 2.0;
    color = vec3(dot(tile(st,0.0),0.5),dot(tile(st,0.5),0.5),dot(tile(st,1.0),0.5));
    gl_FragColor = vec4(color, 1.0);
}
