import { Comments } from "../types/Comments";

type AddComment = {
  id: string,
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  commentRoomId: string,
  userId: string,
  buildingId: string,
};


const useTransmission = (comments: Comments[] | AddComment | '', currentState: string, guid?: string) => {
  if (currentState) {
    const iframeDOM = document.getElementById('viewer') as HTMLIFrameElement;
    switch (currentState) {
      case 'initialMessage': {
        Array.isArray(comments)
          && comments.length > 0
          && iframeDOM.contentWindow!.postMessage(
            {
              message: JSON.stringify(comments),
              action: 'submitInitialMessages',
            },
            'https://playcanv.as',
          );
        break;
      }
      case 'addPost': {
        typeof (comments) === "object"
          && iframeDOM.contentWindow!.postMessage(
            {
              message: JSON.stringify(comments),
              guid,
              action: 'addPost',
            },
            'https://playcanv.as',
          );
        break;
      }
      case 'cancelPost': {
        iframeDOM.contentWindow!.postMessage(
          {
            message: '',
            guid,
            action: 'cancelPost',
          },
          'https://playcanv.as',
        );
        break;
      }
      default:
        return;
    }
  }

  return;
};

export default useTransmission;