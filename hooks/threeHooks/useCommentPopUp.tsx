import { useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect } from "react";
import * as THREE from "three";
import useCommentAction, { CommentAction } from "../../components/threeComponents/stores/useCommentAction";

export default function useCommentPopUp(groupRef: MutableRefObject<THREE.Group | null>) {
  const { raycaster } = useThree();
  const commentAction = useCommentAction((state) => state.commentAction);
  const actions = CommentAction;

  const popUp = document.getElementById("popUp") as HTMLElement;
  const popDate = document.getElementById("popDate") as HTMLElement;
  const poptitle = document.getElementById("poptitle") as HTMLElement;
  const popdescription = document.getElementById("popdescription") as HTMLElement;
  const popImage = document.getElementById("popImage") as HTMLElement;

  const { gl, camera } = useThree();
  const setPopUpIcon = () => {
    if (groupRef.current) {
      const intersectObjects = raycaster.intersectObjects(groupRef.current.children);
      const firstintersectObject = intersectObjects[0];

      if (firstintersectObject && firstintersectObject.object.userData.tag === "comment" && commentAction !== actions.INACTIVE) {
        const canvasWidth = gl.domElement.width;
        const canvasHeight = gl.domElement.height;
        const projectPoint = firstintersectObject.point.project(camera);
        projectPoint.x = (projectPoint.x + 1) * canvasWidth * 0.5;
        projectPoint.y = (-projectPoint.y + 1) * canvasHeight * 0.5;
        projectPoint.z = 0;
        const screenTopSpace = projectPoint.y;
        const screenRightSpace = canvasWidth - projectPoint.x;
        const screenBottomSpace = canvasHeight - projectPoint.y;
        const screenLeftSpace = projectPoint.x;
        const popupPosX =
          screenRightSpace > screenLeftSpace
            ? (projectPoint.x / canvasWidth) * 100
            : ((projectPoint.x - popUp.offsetWidth) / canvasWidth) * 100;
        const popupPosY =
          screenTopSpace > screenBottomSpace
            ? 100 - (projectPoint.y / canvasHeight) * 100
            : 100 - ((projectPoint.y + popUp.offsetHeight) / canvasHeight) * 100;
        popUp.style.left = `${String(popupPosX)}%`;
        popUp.style.bottom = `${String(popupPosY)}%`;

        const title = firstintersectObject.object.userData.title;
        const description = firstintersectObject.object.userData.description;

        popUp.style.visibility = "visible";
        poptitle.innerText = title;
        popdescription.innerText = description;
      } else {
        popUp.style.visibility = "hidden";
        poptitle.innerText = "";
        popdescription.innerText = "";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", setPopUpIcon);
  }, [commentAction]);

  return;
}
