precision mediump float;
uniform float time;
uniform vec2 resolution;

// Author: @patriciogv
// Title: CellularNoise
vec2 random( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float circle(vec2 st, float n){
    return length(st) * n;
}

float tile(vec2 st, float n){
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.0;  // minimun distance
    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));
            // Random position from current + neighbor place in the grid
            vec2 point = random(i_st + neighbor + n);
            // Animate the point
            point = 0.5 + 0.5 * sin(time * point);
            // Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;
            // Distance to the point
            float dist = length(circle(diff,n));
            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }
    return m_dist;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(0.0);

    color = vec3(tile(st,12.0),tile(st,8.0),tile(st,6.0));
    color *= vec3(tile(st,12.0),tile(st,10.0),tile(st,10.0));
    color *= vec3(tile(st,14.0),tile(st,16.0),tile(st,14.0));
    color -= vec3(0.2,0.3,0.5);
    gl_FragColor = vec4(color * 1.3, 1.0);
}
