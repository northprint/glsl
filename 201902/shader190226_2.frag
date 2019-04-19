precision mediump float;
uniform float time;
uniform vec2 resolution;
//#define PI 3.14159265359

void main() {
	vec2 st = gl_FragCoord.xy / resolution;
	vec3 pct = vec3(st.y);

	vec3 color;
	float l,z = time;
	for(int i=0;i<3;i++) {
			vec2 uv,p=st;
			uv=p;

			p-=.5;
			p.x*=resolution.x/resolution.y;
			z+=5.;
			l=length(p);
			uv+=p/l*(sin(z)+1.);
			color[i]=.01/length(abs(mod(uv,1.)-.5));
	}

	gl_FragColor = vec4(color/l,time);
}
