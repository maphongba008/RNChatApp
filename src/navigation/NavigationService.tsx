import { NavigationActions } from 'react-navigation';

let _navigator: any = null;

class NavigationService {
  setTopLevelNavigator = (navigatorRef: any) => {
    _navigator = navigatorRef;
  };

  goBack = () => {
    _navigator.dispatch(NavigationActions.back());
  };

  navigate = (routeName: string, params?: any) => {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  };
}
// add other navigation functions that you need and export them

export default new NavigationService();
