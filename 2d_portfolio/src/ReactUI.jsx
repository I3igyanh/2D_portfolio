import CameraController from "./reactComponents/CameraController";

export default function ReactUI() {
  return (
    <div>
      <p className="controls-message">tap/click to move around</p>
      <CameraController />
    </div>
  );
}
