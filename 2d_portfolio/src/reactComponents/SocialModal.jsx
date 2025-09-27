import { useAtom, useAtomValue } from "jotai";
import { isSocialModalVisibleAtom,selectedLinkAtom,selectedLinkDescriptionAtom } from "../store";

export default function SocialModal() {
    const [isVisible, setIsVisible] = useAtom(isSocialModalVisibleAtom);
    const selectedLink = useAtomValue(selectedLinkAtom);
    const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);
    const buttons = [
        {
        id:0,
        name: "yes",
        handler:() => {
            window.open(selectedLink, "_blank");
            setIsVisible(false);
        },
    },
    {
        id:1,
        name: "no",
        handler:() => {
            setIsVisible(false);
        },
    },
        
    ];

    return isVisible && (
    <div className="modal">
        <div className="modal-content">
            <h1>want to open this link?</h1>
            <span>{selectedLink}</span>
            <p>{selectedLinkDescription}</p>
            <div className="modal-btn-container">
                {buttons.map((btn) => (
                    <button key={btn.id} className="modal-btn" onClick={btn.handler}>{btn.name}</button>
                ))}
            </div>
        </div>
    </div>)
}