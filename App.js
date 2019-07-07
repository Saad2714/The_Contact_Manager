import { createStackNavigator, createAppContainer } from "react-navigation"


import HomeScreen from './screens/HomeScreen'
import AddNewContactScreen from './screens/AddNewContactScreen'
import EditContactScreen from './screens/EditContactScreen'
import ViewContactScreen from './screens/ViewContactScreen'


const MainNavigator = createStackNavigator(
  {
    Home: {screen :HomeScreen},
    Add: {screen: AddNewContactScreen},
    Edit: {screen: EditContactScreen},
    View: {screen: ViewContactScreen},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#b83227"
      },
      headerTitleStyle: {
        color: "#fff"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;

