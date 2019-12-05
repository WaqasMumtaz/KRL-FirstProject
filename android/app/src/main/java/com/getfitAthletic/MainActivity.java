package com.getfitAthletic;

import android.os.Bundle; // required for onCreate parameter
import org.devio.rn.splashscreen.SplashScreen; // required for react-native-splash-screen
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

//import org.devio.rn.splashscreen.SplashScreen; // here 



public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     SplashScreen.show(this);  // here 
    //     super.onCreate(savedInstanceState);
    // }
    @Override
    protected String getMainComponentName() {
         SplashScreen.show(this); 
         //SplashScreen.hide(this); 
        return "GetFit";
    }
    
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
         return new ReactActivityDelegate(this, getMainComponentName()) {
  @Override
        protected ReactRootView createRootView() {
   return new RNGestureHandlerEnabledRootView(MainActivity.this);
  }
  
  
};
}
}
