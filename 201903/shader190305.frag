precision mediump float;
uniform float time;
uniform vec2 resolution;
#define PI 3.14159265359

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec3 flower( vec2 p ) {
    vec2 pos = vec2(0.5)-p;
    float r = length(pos)*1.0;
    float a = atan(pos.y,pos.x)+(sin(time) * 0.5);
    float f = abs(cos(a*2.5))*.5+.3;
    float fa = abs(cos(a*2.5))*.3+.3;
    return vec3(smoothstep(f,f+0.1,r),smoothstep(f,f+0.1,r),smoothstep(f,f+0.1,r))+ vec3(smoothstep(fa*0.5,fa,r));
}

void main() {
    vec2 st = gl_FragCoord.xy/resolution;
    vec3 color = vec3(0.0);
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x) + time;
    float radius = length(toCenter)*2.0;

    color = hsb2rgb(vec3((angle/PI*0.5)+0.5,radius,1.0));
    color -= flower(st);

    gl_FragColor = vec4(color,1.0);
}
