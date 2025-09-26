import { PALETTE } from "../constant";

export default function makeIcon(K, parent, posVec2, imagedata, subtitle) {
    const icon = parent.add([
        K.sprinte(imagedata.name, {
            width: imagedata.width,
            height: imagedata.height,
        }),
        K.anchor("center"),
        K.pos(posVec2),
        K.opacity(0),
        K.offscreen({ hide: true, distance: 300 }),
    ]);


    const subtitleText = icon.add([
        K.text(subtitle, { font: "ibm-bold", size: 16 }),
        K.color(K.Color.fromHex(PALETTE.color3)),
        K.anchor("center"),
        K.pos(0, 100),
        K.opacity(0),
    ]);

    return [icon, subtitleText];
}