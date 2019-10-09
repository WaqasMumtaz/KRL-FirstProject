import * as React from 'react';
import { Easing, Animated } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Resetpassword from '../screens/ResetPasswrd';
import ResetpasswordScreen from '../screens/ResetPasswrd';
import ConfirmResetPassword from '../screens/CheckResetPasswrd';
import Setupscreen1 from '../screens/SetUpScreen1';
import Setupscreen from '../screens/SetUpScreen';
import LastSetUpScreen from '../screens/SetUpLastScreen';
import BottomTabe from '../navigation/tabNav';
import AddExercise from '../screens/AddExercise';
import Exerciselog from '../screens/ExerciseLog';
import BriskScreen from '../screens/BriskScreen';
import LogMeasurementsScreen from '../screens/LogMeasurements';
import ShowMeasurementsScreen from '../screens/ShowMeasurements';
import Macrocalculator from '../screens/MacroCalculator';
import BMICalculator from '../screens/CalculateBMI';
import Profile from '../screens/ProfilScreen';
import EditProfileScreen from '../screens/EditableProfileScreen';
import SettingScreen from '../screens/Setting';
import StepCountScreen from '../screens/StepCountScreen';
import Payment from '../screens/PaymentScreen';
import Invoices from '../screens/InvoicesScreen';
import Homescreen from '../screens/Home';
import Chatscreen from '../screens/Chat';
import ActivateSpinner from '../Loading Spinner/ActivateIndicator';
import Wheelspiner from '../Progress Wheel/Progress';
import ToastComponent from '../Toasts/nativeToast';
import OverlayLoader from '../Loader/OverlaySpinner';
import Linechart from '../chartKit/lineChart';
import PackagesScreen from '../screens/Packages';
//import TextInputs from '../textInputs/TextInputs';
//import PickerInput from '../../Picker/PickerInput';
//import ActivateSpinner from '../Loading Spinner/ActivateIndicator';
// import ChartScreen from '../BarChart/BarChart';
//import CaloriesSetupBtn from '../buttons/setUpBtn';
// import Resetpassword from '../screens/ResetPasswrd';
// import Dashboard from '../screens/Dashboard';
//import ChartScreen from '../BarChart/BarChart';


const MainNavigator = createStackNavigator({
  // Profile:{screen:Profile},
  // Linechart: { screen: Linechart },  
  //StepCountScreen:{screen:StepCountScreen},
  PackagesScreen:{screen:PackagesScreen},
  Login: { screen: Login },
  Signup: { screen: Signup },
  Setupscreen1: { screen: Setupscreen1 },
  Setupscreen: { screen: Setupscreen },
  ResetpasswordScreen: { screen: ResetpasswordScreen },
  ConfirmResetPassword: { screen: ConfirmResetPassword },
  //LastSetUpScreen: { screen: LastSetUpScreen },

  Login: { screen: Login },
   Signup: { screen: Signup },
  // Setupscreen: { screen: Setupscreen },
  // LastSetUpScreen: { screen: LastSetUpScreen },
  // ResetpasswordScreen: { screen: ResetpasswordScreen },
  // ConfirmResetPassword: { screen: ConfirmResetPassword },

  // ChatBox:{
  //   screen:Chatscreen,
  //   navigationOptions: {
  //     headerStyle: {
  //       elevation: 0,
  //     }
  //   }

  // Login: {
  //   screen: Login
  // },


  BottomTabe: {
    screen: BottomTabe,
    navigationOptions: {
      header: null,
    }
  },

  // Homescreen: { screen: Homescreen },
  // Setupscreen1: { screen: Setupscreen1 },
  // Setupscreen: { screen: Setupscreen },
  // Homescreen: { screen: Homescreen },


  Homescreen:{
    screen:Homescreen
  },
  ChatBox:{
    screen:Chatscreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },

  StepCountScreen: {
    screen: StepCountScreen
  },
  AddExercise: {
    screen: AddExercise,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  Exerciselog: {
    screen: Exerciselog,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  LogMeasurementsScreen: {
    screen: LogMeasurementsScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  InvoicesScreen: {
    screen: Invoices,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  Macrocalculator: {
    screen: Macrocalculator,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  BMICalculator: {
    screen: BMICalculator,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  EditProfileScreen: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  Payment: {
    screen: Payment,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  Invoices: {
    screen: Invoices,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  ShowMeasurementsScreen: {
    screen: ShowMeasurementsScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  StepCountScreen: {
    screen: StepCountScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  SettingScreen: {
    screen: SettingScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  },
  PackagesScreen:{
    screen:PackagesScreen,
    navigationOptions: {
      headerStyle: {
        elevation: 0,
      }
    }
  }
},
  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 2],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] };
      },
    }),
  }
);

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;


