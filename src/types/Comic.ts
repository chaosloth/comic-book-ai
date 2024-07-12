export class Frame {
  prompt: string;
  url: string;
  revised_prompt: string;
  caption: string;
  story_uuid?: string;
  frame_uuid?: string;

  constructor(
    uuid: string,
    caption: string,
    prompt: string,
    url: string,
    revised_prompt: string
  ) {
    this.frame_uuid = uuid;
    this.caption = caption;
    this.prompt = prompt;
    this.url = url;
    this.revised_prompt = revised_prompt;
  }
}
