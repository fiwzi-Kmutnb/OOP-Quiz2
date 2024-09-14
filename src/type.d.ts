
export {}
declare global {
    interface Window {
      api: {
        closeWindow: () => void;
        minimizeWindow: () => void;
      };
    }
  }