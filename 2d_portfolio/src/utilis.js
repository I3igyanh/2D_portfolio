
export async function makeAppear(k, gameObj) {
    await k.tween(gameObj.opacity, 1, 0.5, (val) => {
        gameObj.opacity = val;
        for (const child of gameObj.children) {
            child.opacity = gameObj.opacity;
        }
    }, k.easings.linear);

}

export function opacityTrickleDown(parent, indirectchildren) {
    parent.opacityTrickleDown = parent.onUpdate(() => {
        for (const child of indirectchildren) {
            child.opacity = parent.opacity;
        }
    });
}