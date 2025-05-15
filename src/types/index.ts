export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
  
  export type UserInputData = {
    title: string;
    description: string;
    people: number;
  }
  
  export enum ProjectStatus {
    Active,
    Finished
  }
  
  // Project Type
  export class Project {
    constructor(
      public id: string, 
      public title: string, 
      public description: string, 
      public people: number, 
      public status: ProjectStatus) {}
  }
  
  export type Listener = (items: Project[]) => void;

  // Drag & Drop Interfaces
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}