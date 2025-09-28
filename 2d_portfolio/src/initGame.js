import { Loop } from "three/tsl";
import { PALETTE } from "./constant";
import makeKaplayCtx from "./kaplayCtx";
import makePlayer from "./entities/player";
import { cameraZoomValueAtom } from "./store";
import { store } from "./store";
import makeSection from "./components/Section";
import makeGmailIcon from "./components/GmailIcon";
import makeSocialIcon from "./components/SocialIcon";
import { makeAppear } from "./utilis";
import { opacityTrickleDown } from "./utilis";
import makeIcon from "./components/Icon";
import SkillIcon from "./components/SkillIcon";


//main game init function
export default async function initGame() {

  const generelData = await (await fetch("./configs/generalData.json")).json();//changes to json changes the file
  const socialData = await (await fetch("./configs/socialData.json")).json();
  const skillsData = await (await fetch("./configs/skillsData.json")).json();

  const k = makeKaplayCtx();
  k.loadSprite("player", "./sprites/player.png", {
    sliceX: 4,
    sliceY: 8,
    anims: {
      "walk-down-idle": 0,
      "walk-down": { from: 0, to: 3, loop: true },
      "walk-left-down": { from: 4, to: 7, loop: true },
      "walk-left-down-idle": 4,
      "walk-left": { from: 8, to: 11, loop: true },
      "walk-left-idle": 8,
      "walk-left-up": { from: 12, to: 15, loop: true },
      "walk-left-up-idle": 12,
      "walk-up": { from: 16, to: 19, loop: true },
      "walk-up-idle": 16,
      "walk-right-up": { from: 20, to: 23, loop: true },
      "walk-right-up-idle": 20,
      "walk-right": { from: 24, to: 27, loop: true },
      "walk-right-idle": 24,
      "walk-right-down": { from: 28, to: 31, loop: true },
      "walk-right-down-idle": 28,

    }
  });

  k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("github-logo", "./logos/github-logo.png");
  k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
  k.loadSprite("javascript-logo", "./logos/js-logo.png");
  k.loadSprite("react-logo", "./logos/react-logo.png");
  k.loadSprite("postgres-logo", "./logos/postgres-logo.png");
  k.loadSprite("html-logo", "./logos/html-logo.png");
  k.loadSprite("css-logo", "./logos/css-logo.png");
  k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
  k.loadSprite("gmail-logo", "./logos/gmail.png");
  k.loadSprite("canva-logo", "./logos/canva-logo.png");
  k.loadSprite("figma-logo", "./logos/figma-logo.png");
  k.loadSprite("photoshop-logo", "./logos/adobe-photoshop.png");
  k.loadSprite("illustrator-logo", "./logos/adobe-illustrator.png");
  k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");

  //player zoom based on screen size garna
  const setInitCamZoomValue = () => {
    if (k.width() < 1000) {
      k.setCamScale(k.vec2(0.5));
      store.set(cameraZoomValueAtom, 0.5);
    } else {
      store.set(cameraZoomValueAtom, 0.8);
      k.setCamScale(k.vec2(0.8));
    }
  };

  // run once
  setInitCamZoomValue();


  k.onUpdate(() => {
    const camZoomValue = store.get(cameraZoomValueAtom);
    if (camZoomValue !== k.scale()) k.setCamScale(k.vec2(camZoomValue));

  });

  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()),
    k.shader("tiledPattern", () => ({
      u_time: 0, // initialize
      u_color1: k.Color.fromHex(PALETTE.color3),
      u_color2: k.Color.fromHex(PALETTE.color1),
      u_speed: k.vec2(1, -1),
      u_aspect: k.width() / k.height(),
      u_size: 5,
    })),
    k.pos(0, 0),
    k.fixed(),
  ]);

  tiledBackground.onUpdate(() => {
    tiledBackground.uniform.u_time = k.time() / 20; // update time every frame
  });

  makeSection(k, k.vec2(k.center().x, k.center().y - 400), "About", //about can be written as generalData.section1Name
    (section) => {
      const container = section.add([
        k.pos(-805, -700),
        k.opacity(0),
        k.text(generelData.header.title, { font: "ibm-bold", size: 70 }),
        k.color(k.Color.fromHex(PALETTE.color2)),
        k.pos(-800, -600),
        k.opacity(0),
      ]);
      container.add([
        k.text(generelData.header.subtitle, { font: "ibm-regular", size: 36 }),
        k.color(k.Color.fromHex(PALETTE.color2)),
        k.pos(485, 100),
        k.opacity(0),
      ]);

      const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

      for (const item of socialData) {
        if (item.name === "Gmail") {
          makeGmailIcon(k, socialContainer, k.vec2(item.pos.x, item.pos.y), item.imageData, item.name, item.address, socialContainer.gmail);
          continue;


        }
        makeSocialIcon(
          k,
          socialContainer,
          k.vec2(item.pos.x, item.pos.y),
          item.imageData,
          item.name,
          item.link,
          item.description
        );
      }

      makeAppear(k, container);
      makeAppear(k, socialContainer);
    }
  );

  makeSection(k, k.vec2(k.center().x - 400, k.center().y + 100), "Projects", (section) => {
    const container = section.add([
      k.opacity(0),
      k.pos(-800, -300),
    ]);

  });

  makeSection(k, k.vec2(k.center().x + 400, k.center().y + 100), "Skills", (section) => {

    const container = section.add([
      k.opacity(0),
      k.pos(+800, +300),
    ]);

    for (const skillData of skillsData){
      SkillIcon(k, container, k.vec2(skillData.pos.x, skillData.pos.y), skillData.logoData, skillData.name);
    }

    makeAppear(k, container);

  });

  makePlayer(k, k.vec2(k.center()), 700);

}
