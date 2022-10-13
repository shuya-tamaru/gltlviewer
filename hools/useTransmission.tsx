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


const useTransmission = (data: Comments[] | AddComment | Comments | '', currentState: string, guid?: string) => {
  if (currentState) {
    const iframeDOM = document.getElementById('viewer') as HTMLIFrameElement;
    switch (currentState) {
      case 'initialMessage': {
        Array.isArray(data)
          && data.length > 0
          && iframeDOM.contentWindow!.postMessage(
            {
              message: JSON.stringify(data),
              action: 'submitInitialMessages',
            },
            'https://playcanv.as',
          );
        break;
      }
      case 'addPost': {
        typeof (data) === "object"
          && iframeDOM.contentWindow!.postMessage(
            {
              message: JSON.stringify(data),
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
      case 'updateComment': {
        iframeDOM.contentWindow!.postMessage(
          {
            message: JSON.stringify(data),
            guid,
            action: 'updateComment',
          },
          'https://playcanv.as',
        );
        break;
      }
      case 'deleteComment': {
        iframeDOM.contentWindow!.postMessage(
          {
            message: '',
            guid,
            action: 'deleteComment',
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