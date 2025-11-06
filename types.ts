
export enum AppMode {
  CREATE_VIDEO = 'CREATE_VIDEO',
  ANIMATE_PHOTO = 'ANIMATE_PHOTO',
}

export interface Template {
  id: string;
  name: string;
  description: string;
  prompt: string;
  imageUrl: string;
}

export interface AnimationStyle {
  id: string;
  name: string;
  promptSuffix: string;
}
