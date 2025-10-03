precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

// simple pseudo-random function
float hash(float n) {
    return fract(sin(n) * 43758.5453);
}

// particle intensity (soft circle)
float particle(vec2 uv, vec2 pos, float size) {
    float d = distance(uv, pos);
    return smoothstep(size, 0.0, d);
}

// color palette function
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
    vec2 st = uv; // normalized coordinates
    vec3 col = vec3(0.0);

    // animate 50 particles
    for (float i = 0.0; i < 50.0; i += 1.0) {
        float fx = hash(i + 1.0);
        float fy = hash(i + 2.0);

        // particle position with vertical sway
        vec2 p = vec2(fx, fy + sin(u_time + i) * 0.3);

        float size = 0.02 + 0.01 * hash(i + 3.0);

        col += particle(st, p, size);
    }

    col = clamp(col, 0.0, 1.0);

    // animated vibrant colors
    float cycle = fract(u_time * 0.2);
    col *= palette(cycle);

    return vec4(col, 1.0);
}
