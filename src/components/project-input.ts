import Component from './component.js';
import { Validatable, type UserInputData } from '../types/index.js';
import { validate } from '../utils/validate.js';
import { autobind } from '../utils/decorators.js';
import { ProjectState } from '../state/index.js';


const projectState = ProjectState.getInstance();
// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private clear(): void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  private getherUserInput(): UserInputData | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const validationRules: { title: Validatable, description: Validatable, people: Validatable } = {
      title: {
        value: enteredTitle,
        required: true,
        minLength: 5
      },
      description: {
        value: enteredDescription,
        required: true,
        minLength: 5
      },
      people: {
        value: enteredPeople,
        required: true,
        min: 1,
        max: 5
      }
    }

    if (!validate(validationRules.title) ||
        !validate(validationRules.description) ||
        !validate(validationRules.people)) {
      alert('Invalid input, please try again!');
      return;
    } else {
      return {
        title: enteredTitle,
        description: enteredDescription,
        people: enteredPeople
      }
    }
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userData = this.getherUserInput() as Partial<UserInputData>;

    if (typeof userData !== "object" || userData === null) {
      return;
    }

    if (typeof userData.title === 'string' &&
        typeof userData.description === 'string' &&
        typeof userData.people === 'number') {

        projectState.addProject(
          userData.title,
          userData.description,
          userData.people
        );
    }

    this.clear();
  }

  renderContent(): void {}
}
