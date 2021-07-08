export module namespace {
  export interface Comment {
    _id: string;
    title: string;
    commentDesc: string;
    date: string;
    user: string;
    comments: any[];
    content: string;
  }

  export interface SupportMaterial {
    _id: string;
    title: string;
    supportMaterialDesc: string;
    supportMaterialPath: string;
  }

  export interface Video {
    _id: string;
    comments: Comment[];
    supportMaterial: SupportMaterial[];
    videoDesc: string;
    videoPath: string;
    videoNumber?: number;
  }

  export interface Lesson {
    _id: string;
    position: number;
    lessonName: string;
    lessonDesc: string;
    video: Video;
  }

  export interface Chapter {
    _id: string;
    position: number;
    chapterName: string;
    chapterDesc: string;
    lesson: Lesson[];
  }

  export interface RootObject {
    subcategory: any[];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    chapter: Chapter[];
    title: string;
    courseDesc: string;
    imagePath: string;
    videoPath: string;
    activeCourse: boolean;
    deleted: boolean;
    videoDuration: number;
    coursePrice: number;
    user: string;
  }
}
