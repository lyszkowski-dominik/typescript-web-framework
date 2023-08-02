import { User, UserProps } from '../models/User';
import { View } from './View';
export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    };
  }

  onSaveClick = (): void => {
    this.model.save();
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  template(): string {
    return `
        <div>
            <input style="padding:5px;" placeholder=${this.model.get('name')}>
            <button class="set-name" style="padding:5px; margin-top: 10px">Update name</button>
            <button class="set-age" style="display: block; padding:5px; margin-top: 10px">Set random age</button> 
            <button class="save-model" style="margin-top:10px; padding: 5px;">Save user</button>           
        </div>
        `;
  }
}
