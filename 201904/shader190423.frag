precision mediump float;
uniform float time;
uniform vec2 resolution;

// Author: @patriciogv
// Title: CellularNoise
vec2 random( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution.xy;
    st.x *= resolution.x/resolution.y;
    vec3 color = vec3(.0);

    // Scale
    st *= 10.0;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 0.5;  // minimun distance
    float m_dist2 = 0.5;  // minimun distance

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
            float u = fract(diff.x * diff.y) - neighbor.x - neighbor.y;
            float u2 = fract((diff.x - 0.3) * (diff.y - sin(time))) - neighbor.x - neighbor.y;

            float dist = length(u);
            float dist2 = length(u2);
            m_dist = min(m_dist, dist);
            m_dist2 = min(m_dist2,dist2);
        }
    }

    color = mix(color,vec3(0.0,0.0,1.0), 1.0 - m_dist);
    color += mix(color,vec3(1.0,0.0,0.0), 1.0 - m_dist2);
    color -= mix(color,vec3(0.0), m_dist);

    gl_FragColor = vec4(color, 1.0);
}
