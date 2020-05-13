import { User } from './User';

class AppStore {
  user?: User | null = null;

  setUser = (user: User) => {
    this.user = user;
  };
}

export default new AppStore();
