precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float noise(vec2 p) {
    return sin(p.x) * sin(p.y);
}

vec3 palette(float t) {
   vec3 col1 = vec3(1.0, 0.5, 0.5);   // soft red
vec3 col2 = vec3(1.0, 0.75, 0.5);  // orange
vec3 col3 = vec3(0.5, 1.0, 0.5);   // mint green
vec3 col4 = vec3(0.5, 0.75, 1.0);  // sky blue


    vec3 c1 = mix(col1, col2, smoothstep(0.0, 0.33, t));
    vec3 c2 = mix(col2, col3, smoothstep(0.33, 0.66, t));
    vec3 c3 = mix(col3, col4, smoothstep(0.66, 1.0, t));

    return mix(c1, mix(c2, c3, t), 0.5);
}

vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    float n = noise(uv * 5.0 + vec2(u_time * 0.3, u_time * 0.2));
    float blob = smoothstep(0.4, 0.5, n);

  vec3 col1 = vec3(1.0, 0.5, 0.5);   // soft red
vec3 col2 = vec3(1.0, 0.75, 0.5);  // orange
vec3 col3 = vec3(0.5, 1.0, 0.5);   // mint green
vec3 col4 = vec3(0.5, 0.75, 1.0);  // sky blue


    vec3 col = mix(col1, col2, blob);
    col = mix(col, col3, sin(u_time * 0.2) * 0.5 + 0.5);
    col = mix(col, col4, smoothstep(0.5, 0.9, n));

    float cycle = fract(u_time * 0.2); 
    col *= palette(cycle);

    return vec4(col, 1.0);
}
