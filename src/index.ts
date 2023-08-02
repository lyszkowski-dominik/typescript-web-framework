import { Collection } from './models/Collection';
import { User, UserProps } from './models/User';

// const user = User.build({ name: "Krzysio", age: 3 });
// user.save();

// user.set({ name: 'Karol' });
// user.save();
// user.fetch();

const collection = User.buildCollection();

collection.on('change', () => {
  console.log(collection);
});
collection.fetch();
