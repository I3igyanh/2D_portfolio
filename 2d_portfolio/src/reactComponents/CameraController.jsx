import { useAtom } from "jotai";
import { cameraZoomValueAtom } from "../store";

const ZOOM_MAX_BOUND = 2;   // you need to define these
const ZOOM_MIN_BOUND = 0.5;

export default function CameraController() {
  const [camZoomValue, setCamZoomValue] = useAtom(cameraZoomValueAtom);

  return (
    <div className="camera-controller">
        {/* zoom-in */}
      <button className="camera-controller-btn"
        onClick={() => {
          const newZoomValue = camZoomValue + 0.2;
          if (newZoomValue <= ZOOM_MAX_BOUND && newZoomValue >= ZOOM_MIN_BOUND) {
            setCamZoomValue(newZoomValue);
          }
        }}
      >
        +
      </button>

      {/* zoom-out */}
      <button className="camera-controller-btn" 
      onClick={()=>{
        const newZoomValue = camZoomValue - 0.2;
        if(newZoomValue <= ZOOM_MAX_BOUND && newZoomValue >= ZOOM_MIN_BOUND){
          setCamZoomValue(newZoomValue);
        }
      }}>-</button>
    </div>
  );
}
