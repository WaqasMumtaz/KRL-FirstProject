package com.getfitAthletic;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.gettipsi.stripe.StripeReactPackage;

import com.reactnative.googlefit.GoogleFitPackage;
import com.sensormanager.SensorManagerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.sha1lib.Sha1Package;
import com.horcrux.svg.SvgPackage;
//import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import com.filepicker.FilePickerPackage;
import com.rnfs.RNFSPackage;
import com.kevinresol.react_native_sound_recorder.RNSoundRecorderPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;  
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
// import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
// import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new RNFirebasePackage(),
            //new AsyncStoragePackage()
            new GoogleFitPackage(BuildConfig.APPLICATION_ID),
            new SensorManagerPackage(),
            new ReactVideoPackage(),
            new Sha1Package(),
            new StripeReactPackage(),
            new SvgPackage(),
            //new RNFileViewerPackage(),
            new FilePickerPackage(),
            new RNFSPackage(),
            new RNSoundRecorderPackage(),
            // new RNFirebaseAdMobPackage(),
            new AsyncStoragePackage(),
            new ImagePickerPackage(),
            // new RNFirebaseAnalyticsPackage(),
              // new RNFirebaseCrashlyticsPackage(),
            // new MPAndroidChartPackage(),
            // new MPAndroidChartPackage(),
            // new VectorIconsPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
            // new MainReactPackage(),
            // new MPAndroidChartPackage()
            //new RNCWebViewPackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
