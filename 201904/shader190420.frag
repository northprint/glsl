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
    st *= 5.0;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = .3;  // minimun distance
    float m_dist2 = .3;  // minimun distance

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
            float dist = length(diff);
            float dist2 = length(diff2);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
            m_dist2 = min(m_dist2, dist2);
        }
    }

    // Draw the min distance (distance field)
    color = mix(color,vec3(0.0,0.0,0.5), 0.5 - m_dist);
    color += mix(color,vec3(0.5,0.0,0.0), 0.5 - m_dist2);

    gl_FragColor = vec4(color * 2.0, 1.0);
}
