precision mediump float;
uniform float time;
uniform vec2 resolution;

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// Author: @patriciogv
// Title: CellularNoise

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

float fbm(vec2 x) {
	float v = 0.0;
	float a = 0.5;
	vec2 shift = vec2(100);
	// Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
	for (int i = 0; i < 6; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0 + shift;
		a *= 0.5;
	}
	return v;
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

    float m_dist = 1.0;  // minimun distance

    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = vec2(random(i_st + neighbor));

			      // Animate the point
            point = 0.5 + 0.5 * sin(time * point);

			      // Vector between the pixel and the point
            vec2 diff = neighbor - point + 1.0 - f_st;

            // Distance to the point
            float dist = length(diff) - fbm(diff);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // Draw the min distance (distance field)
    color = mix(color,vec3(0.0,0.0,1.0), 0.5 - m_dist);
    color += mix(color,vec3(1.0,0.0,0.5), 0.4 - m_dist);

    gl_FragColor = vec4(color, 1.0);
}
