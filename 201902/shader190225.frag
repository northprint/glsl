precision mediump float;
uniform float time;
uniform vec2 resolution;
//#define PI 3.14159265359

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(0.818,1.000,0.971);

float quadraticBezier( float x, float a, float b ){
	float epsilon = 0.00001;
	a = max(0., min(1.0, a));
  b = max(0., min(1.0, b));
  if (a == 0.5){
	  a += epsilon;
  }

  float om2a = 1. - 2.*a;
  float t = (sqrt(a*a + om2a*x) - a)/om2a;
  float y = (1.-2.*b)*(t*t) + (2.*b)*t;
  return y;
}

float plot (vec2 st,float pct){
	return smoothstep(pct - 0.02, pct, st.y) - smoothstep(pct, pct + 0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy / resolution;

	float y = quadraticBezier(st.x,.087,.893);


	vec3 pct = vec3(st.y);

	pct.r = smoothstep(0.0,1.0, st.y);
	pct.g = smoothstep(0.0,1.0, st.y);
	pct.b = smoothstep(0.0,1.0, st.y);
	vec3 color = mix(colorA,colorB,pct);

	pct = vec3(quadraticBezier(st.x,.087,.893));
	color = mix(color,vec3(0.9020 ,0.000 ,0.07059),plot(st,pct.r));
	pct = vec3(quadraticBezier(st.x,.087,.893))-0.02;
	color = mix(color,vec3(0.9529 ,0.5961 ,0.000),plot(st,pct.r));
  pct = vec3(quadraticBezier(st.x,.087,.893))-0.04;
  color = mix(color,vec3(1.000 ,0.9451 ,0.000),plot(st,pct.r));
	pct = vec3(quadraticBezier(st.x,.087,.893))-0.06;
  color = mix(color,vec3(0.000 ,0.6000 ,0.2667),plot(st,pct.r));
	pct = vec3(quadraticBezier(st.x,.087,.893))-0.08;
  color = mix(color,vec3(0.000 ,0.4078 ,0.7176),plot(st,pct.r));
	pct = vec3(quadraticBezier(st.x,.087,.893))-0.1;
	color = mix(color,vec3(0.1137 ,0.1255 ,0.5333),plot(st,pct.r));

	gl_FragColor = vec4(color,1.0);
}
