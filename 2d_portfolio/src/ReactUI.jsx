import CameraController from "./reactComponents/CameraController";
import SocialModal from "./reactComponents/SocialModal";
import ProjectModal from "./reactComponents/ProjectModal";
import GmailModal from "./reactComponents/GmailModal";

export default function ReactUI() {
  return (
    <div>
      <p className="controls-message">tap/click to move around</p>
      <CameraController />
      <SocialModal />
      <ProjectModal />
      <GmailModal />
    </div>
  );
}
