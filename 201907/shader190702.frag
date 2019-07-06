precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359
#define TWO_PI 6.28318530718

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    // First corner
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    // Other corners
    vec2 i1;
    //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
    //i1.y = 1.0 - i1.x;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    // x0 = x0 - 0.0 + 0.0 * C.xx ;
    // x1 = x0 - i1 + 1.0 * C.xx ;
    // x2 = x0 - 1.0 + 2.0 * C.xx ;
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    // Permutations
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  		+ i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    // Gradients: 41 points uniformly over a line, mapped onto a diamond.
    // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt( a0*a0 + h*h );
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );


    // Compute final noise value at P
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float triangle(vec2 p,float radius){

    float at = atan(p.x,p.y) + time * 0.2 + PI;
    float ar = TWO_PI/3.0;
    float d = cos(floor(0.5 + at/ar) * ar - at) * length(p);

    float r = length(p) * radius;
    float a = atan(length(p)) + time * 0.1;
    r = snoise(vec2(sin(r),cos(a)));

    return abs(min(fract(r),r - d));
}

float wave(float n) {
    vec2 st = vec2(n + time * 0.5);
    float d = length(st);
    return snoise(vec2(dot(cos(d), 0.2)));
}

float triangle_wave(vec2 st, float n){
    return triangle(st, wave(n));
}

vec3 triangle_anime(vec2 st){
    st *= 0.4;
    vec3 color = vec3(triangle_wave(st, 1.0),triangle_wave(st, 2.0),triangle_wave(st, 3.0));
    return 1.0 - (color - 3.0) * 3.0;
}

float distFunc(vec3 p){
    float f = p.y += 5.0;
    return f;
}

mat3 camera(vec3 ro, vec3 ta, vec3 up){
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(cw, up));
    vec3 cv = normalize(cross(cu, cw));
    return mat3(cu, cv, cw);
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    vec3 color = vec3(0.0);
    vec3 ro = vec3(10.0, cos(time * 0.1) + 10.0, cos(time * 0.1) * 1.0);
    vec3 ta = vec3(0.0,-10.0,0.0);
    vec3 up = normalize(vec3(0, 1, 0));
    vec3 ray = camera(ro, ta, up) * normalize(vec3(st, 1.0));

    vec3 p = ro;
    float d = 0.0;
    float ti = 0.0;
    float b = 0.0;

    for (int i = 0; i < 128; i++){
        d = distFunc(p);
        if (d < 0.01) break;
        p += ray * d;
        ti += d;
    }
    if (d < 0.01){
      vec2 uv = p.xz;
      vec3 hc = triangle_anime(uv);
      float f = exp(-ti * 0.05);
      color = hc * f;
    }
    gl_FragColor = vec4(color, 1.0);
}
