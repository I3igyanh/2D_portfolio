//pop up garna link aharu kholna

import {atom,createStore} from "jotai";

export const isSocialModalVisibleAtom = atom(false);//link kholna pop up
export const selectedLinkAtom = atom (null);
export const selectedLinkDescriptionAtom = atom(null);

export const isGmailModalVisibleAtom = atom(false);
export const gmailAtom = atom("");

export const isProjectModalVisibleAtom = atom(false);
export const chosenProjectDataAtom = atom({
    title:"",
    links:[{id:0, name:"",link:""}],
});

export const cameraZoomValueAtom = atom({value:1});//zoom badauna ghatauna

export const store = createStore();