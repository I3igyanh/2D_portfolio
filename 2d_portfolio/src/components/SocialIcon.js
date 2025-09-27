import { PALETTE } from "../constant";
import { isSocialModalVisibleAtom, selectedLinkDescriptionAtom } from "../store";
import makeIcon from "./Icon";
import { selectedLinkAtom, store } from "../store";


export default function makeSocialIcon(k, parent, posVec2, imagedata, subtitle, link, description) {
    const [SocialIcon, subtitleText] = makeIcon(k, parent, posVec2, imagedata, subtitle);

    const linkSwitch = SocialIcon.add([
        k.circle(20),
        k.color(PALETTE.color2),
        k.anchor("center"),
        k.area(),
        k.pos(0, 150),
        k.opacity(0),
    ]);

   linkSwitch.onCollide("player", () => {
       store.set(isSocialModalVisibleAtom, true);
       store.set(selectedLinkAtom, link);
       store.set(selectedLinkDescriptionAtom, description);
     });

    return SocialIcon;
}