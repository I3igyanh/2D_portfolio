import { sub } from "three/tsl";
import makeIcon from "./Icon";


export default function SkillIcon(K, parent, posVec2, imagedata, subtitle) {
    const [icon, subtitleText] = makeIcon(K, parent, posVec2, imagedata, subtitle);

    icon.use(K.area({ shape: new K.Rect(K.vec2(0), icon.width, icon.height + 65) })
    );

    icon.use(K.body());
    icon.onCollide("player", (player) => {
        icon.applyImpulse(player.direction.scale(1000));
    });



    return icon
}