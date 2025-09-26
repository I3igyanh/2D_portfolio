precision mediump float; // always include for WebGL
uniform float u_time;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec2 u_speed;
uniform float u_aspect;
uniform float u_size;
uniform sampler2D tex; // if you use a texture

void main() {
    vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0); // example UV
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
    // Animate UV scrolling
    uv = (uv + u_speed * u_time) * vec2(u_aspect, 1.0);

    // Checker index
    float total = floor(uv.x * u_size) + floor(uv.y * u_size);
    float checker = mod(total, 2.0);

    // Base colors (0–1 range)
    vec4 col1 = vec4(u_color1, 1.0);
    vec4 col2 = vec4(u_color2, 1.0);

    // Wave-based pulsing
    float wave = 0.5 + 0.5 * sin(u_time + total * 0.5);
    vec4 tileColor = (checker < 1.0) ? col1 : col2;
    vec4 oppositeColor = (checker < 1.0) ? col2 : col1;
    vec4 pulseColor = mix(tileColor, oppositeColor, wave);

    return pulseColor;
}

}
