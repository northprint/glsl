precision mediump float;
uniform float time;
uniform vec2 resolution;

mat2 rotate(float r) {
    float c = cos(r);
    float s = sin(r);
    return mat2( c, -s, s, c);
}

float circle(vec2 p, float r){
    return length(p) - r;
}

float rect(vec2 p, vec2 size) {
    vec2 d = abs(p) - size;
    return min(max(d.x, d.y), 0.0) + length(max(d,0.0));
}

void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    st *= 10.0;

    vec2 str = st * rotate(time);
    vec3 color = vec3(1.0-mod(ceil(rect(str,vec2(-time))),0.8),0.0,0.0);
    color = mix(color,vec3(0.0,0.0,0.5),mod(ceil(circle(st,-time)),0.8));
    color *= 1.0 - sin(str.y * sin( time * 0.5 ) * 40.0 ) + sin( str.x * sin( time * 0.5 ) * 40.0 );
    color *= 10.0;
    gl_FragColor = vec4( 2.0 - color.r/5.0, 0.0, color.b/2.0, 1.0 );
}
