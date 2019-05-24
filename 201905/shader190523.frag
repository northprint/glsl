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

float pentagon(vec2 p,float radius){

    float a = atan(p.x,p.y) - time * 0.5 + PI;
    float r = TWO_PI/float(5);
    float d = cos(floor(0.5 + a / r) * r - a ) * length(p) * radius;

    float aa = atan(length(p)) - (sin(time * 0.2) * cos(time * 0.2) + 1.0) * 0.3;

    return d + aa;
}

float col(float n) {
    return dot(n, 0.05);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 0.3;  // minimun distance
    float m_dist2 = 0.3;  // minimun distance

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = random(i_st + neighbor);

			      // Animate the point
            point = 0.5 + 0.5 * sin(time * point);

			      // Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;
            vec2 diff2 = neighbor - point + 1.0 - f_st;

            // Distance to the point
            float dist = length(pentagon(diff,1.0));
            float dist2 = length(pentagon(diff2,1.0));

            // Keep the closer distance
            m_dist = min(m_dist, dist);
            m_dist2 = min(m_dist2, dist2);
        }
    }

    color = vec3(m_dist, 0.0, 0.0) + vec3(0.0, m_dist2, 1.0 - m_dist2);
    gl_FragColor = vec4(color * 2.5, 1.0);
}
