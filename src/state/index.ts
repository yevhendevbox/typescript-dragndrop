import { type Listener, Project, ProjectStatus } from '../types/index.js';
// Project State
export class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {}
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  
    public addProject(title: string, description: string, numOfPeople: number) {
      const newProject: Project = new Project(Math.random().toString(16), title, description, numOfPeople, ProjectStatus.Active);
  
      this.projects.push(newProject);
      this.updateListeners();
    }
  
    public addListener(listenerFn: Listener) {
      this.listeners.push(listenerFn);
    }

    public moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(p => p.id === projectId);

      if (project) {
        project.status = newStatus;
        
        this.updateListeners();
      }
    }

    private updateListeners() {
      for(const listener of this.listeners) {
        listener([...this.projects]);
      }
    }
  }