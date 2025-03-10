export interface SearchVideo {
  type: "video";
  video: {
    author: { title: string };
    lengthSeconds: number;
    publishedTimeText: string;
    thumbnails: { url: string }[];
    title: string;
    videoId: string;
  };
}

export interface SavedVideo {
  id: string;
  title: string;
  channel: string;
  thumbnailUrl: string;
}

export interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onClick: () => void;
  title: string;
}
