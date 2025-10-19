import { PALETTE } from "../constant";
import {
  isProjectModalVisibleAtom,
  chosenProjectDataAtom,
  store,
} from "../store";
import { opacityTrickleDown } from "../utilis";

export default function makeProjectCard(k, parent, posVec2, data, thumbnail) {
  const card = parent.add([
    k.anchor("center"),
    k.pos(posVec2),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  const cardMask = card.add([
    k.rect(640, 360, { radius: 10 }),
    k.anchor("center"),
    k.mask("intersect"),
    k.opacity(0),
  ]);

  const image = cardMask.add([
  k.sprite(thumbnail, { width: 640, height: 360 }),
  k.anchor("center"),
  k.opacity(1), // show sprite
  k.layer("ui") // optional if engine supports layers
]);


  const cardTitle = card.add([
    k.text(data.title, {
      font: "ibm-bold",
      size: 32,
      width: 600,
      lineSpacing: 12,
    }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(-310, 200),
    k.opacity(0),
  ]);

  const cardSwitch = card.add([
  k.circle(30),
  k.area(),
  k.color(k.Color.fromHex(PALETTE.color1)),
  k.pos(310, 0), // slightly inside the edge
  k.opacity(1),
]);


  cardSwitch.onCollide("player", () => {
    store.set(isProjectModalVisibleAtom, true);
    store.set(chosenProjectDataAtom, data);
  });

  opacityTrickleDown(parent, [cardMask, image, cardTitle, cardSwitch]);

  return card;
}
