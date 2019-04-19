precision mediump float;
uniform float time;
uniform vec2 resolution;

#define PI 3.14159265358979323846

vec2 rotate2D (vec2 _st, float _angle) {
    _angle += time;
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st){
    //  Scale the coordinate system by 2x2
    _st *= 2.0;
    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1.0, mod(_st.x,2.0));
    index += step(1.0, mod(_st.y,2.0))*2.0;
    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |
    // Make each cell between 0.0 - 1.0
    _st = fract(_st);
    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st, PI);
    } else {
      _st = rotate2D(_st, 0.0);
    }

    return _st;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/resolution.x;
    vec3 mikuColors[5];
    mikuColors[0] = vec3(.075,.478,.498);
    mikuColors[1] = vec3(.525,.808,.796);
    mikuColors[2] = vec3(.882,.157,.522);
    mikuColors[3] = vec3(.745,.784,.82);
    mikuColors[4] = vec3(.216,.231,.243);

    st = tile(st,5.0);
    st = rotateTilePattern(st);
    vec2 st2 = rotateTilePattern(st);
    vec2 st3 = rotateTilePattern(st);
    vec2 st4 = rotateTilePattern(st2);

    st3 = rotate2D(st3,PI*0.65);

    vec3 color = mix(mikuColors[2], mikuColors[0], step(st.x,st.y));
    color = mix(color, mikuColors[3], mod(st2.x,st2.y));
    color = mix(color, mikuColors[0], step(st3.x,st3.y));
    color = mix(color, mikuColors[4], mod(st4.x,st4.y));

    gl_FragColor = vec4(color,1.0);
}
