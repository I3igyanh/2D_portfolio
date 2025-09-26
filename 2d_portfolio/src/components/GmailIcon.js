import { PALETTE } from "../constant";
import { gmailAtom, isGmailModalVisibleAtom, store } from "../store";
import makeIcon from "./Icon";

export default function makeGmailIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  gmail
) {
  const [gmailIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  const gmailSwitch = gmailIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  gmailSwitch.onCollide("player", () => {
    store.set(isGmailModalVisibleAtom, true);
    store.set(gmailAtom, gmail);
  });

  opacityTrickleDown(parent, [subtitleText, gmailSwitch]);

  return gmailIcon;
}
