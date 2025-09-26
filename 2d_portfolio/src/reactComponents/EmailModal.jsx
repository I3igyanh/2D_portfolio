import { useAtom, useAtomValue } from "jotai";
import { isGmailModalVisibleAtom } from "../store";
import { useState } from "react";

export default function GmailModal() {
    const [isVisible, setIsVisible] = useAtom(isGmailModalVisibleAtom);
    const gmail = useAtomValue(gmailAtom);
    const [onCopyMessage, setOncopyMessage] = useState("");
    const buttons = [
        {
        id:0,
        name: "yes",
        handler:() => {
            navigator.clipboard.writeText(gmail);
            setOncopyMessage("copied to clipboard");
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

    return (
        isVisible && (
    <div className="modal">
        <div className="modal-content">
            <h1>want to copy gmail to clipboard?</h1>
            <span>{gmail}</span>
            <p>{onCopyMessage}</p>
            <div className="modal-btn-container">
                {buttons.map((btn) => (
                    <button key={btn.id} className="modal-btn" onClick={btn.handler}>{btn.name}</button>
                ))}
            </div>
        </div>
    </div>)
    )

}