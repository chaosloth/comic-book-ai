import { Frame } from "@/types/Comic";

class StorageService {
  saveFrame = async (frame: Frame) => {
    if (!frame) throw "Frame must be provided";

    const res = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ frame }),
    });
    return await res.json();
  };

  getStory = async (id: string) => {
    const res = await fetch(`/api/view?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  };
}

const service = new StorageService();

export default service;
