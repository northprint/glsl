precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
  float c=cos(r);
  float s=sin(r);
  return mat2(c,-s,s,c);
}

// Author: @patriciogv
// Title: CellularNoise
vec2 random( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

// http://iquilezles.org/www/articles/distfunctions2d/distfunctions2d.htm
float sdHexagram( in vec2 p, in float r ){
    const vec4 k = vec4(-0.5,0.8660254038,0.5773502692,1.7320508076);
    p = p * rotate(time);
    p = abs(p);
    p -= 2.0 * min(dot(k.xy, p),0.0) * k.xy;
    p -= 2.0 * min(dot(k.yx, p),0.0) * k.yx;
    p -= vec2(clamp(p.x, r*k.z, r*k.w), r);
    return length(p) * sign(p.y);
}

float smoothHexagram(float d){
    float h = sign(d);
    h *= 1.05 - exp(-100.0 * abs(d));
    return h;
}

float tile(vec2 st, float n){
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 0.1;  // minimun distance
    for (int y= -1; y <= 1; y++) {
        for (int x= -1; x <= 1; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));
            // Random position from current + neighbor place in the grid
            vec2 point = random(i_st + neighbor);
            // Animate the point
            point = 0.8 * cos(time + point + n);
            // Vector between the pixel and the point
            vec2 diff = neighbor + point - f_st;

            float d = sdHexagram( diff, 0.06 );
            d *= sdHexagram( diff, 0.09 );
            float dist = smoothHexagram(d);
            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }
    return m_dist;
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2. - resolution) / min(resolution.x, resolution.y);
    vec3 color = vec3(tile(st,0.1),tile(st,0.2),tile(st,0.3)) * 10.0;
    gl_FragColor = vec4(color, 1.0);
}
