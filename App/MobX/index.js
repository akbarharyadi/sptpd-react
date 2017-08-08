import SpotifyStore from './SpotifyStore';
import navigationStore from './NavigationStore';
import userStore from './UserStore';
import taxStore from './TaxStore';

export default {
  searchStore: new SpotifyStore(),
  navigationStore,
  userStore,
  taxStore
  // place for other stores...
};
