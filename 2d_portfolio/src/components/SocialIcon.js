import { PALETTE } from "../constant";
import { isSocialModalVisibleAtom, selectedLinkDescriptionAtom } from "../store";
import makeIcon from "./Icon";
import { socialLinkAtom, store } from "../store";


export default function makeSocialIcon(k, parent, posVec2, imagedata, subtitle, link, description) {
    const [SocialIcon, subtitleText] = makeIcon(k, parent, posVec2, imagedata, subtitle);

    const linkSwitch = SocialIcon.add([
        k.circle(20),
        k.color(k.color(PALETTE.color1)),
        k.achor("center"),
        k.area(),
        k.pos(0, 150),
        k.opacity(0),
    ]);

    linkSwitch.onCollide("Player", () => {
        store.set(isSocialModalVisibleAtom, true)
        store.set(socialLinkAtom, link)
        store.set(selectedLinkDescriptionAtom, description);
    });

    return SocialIcon;
}