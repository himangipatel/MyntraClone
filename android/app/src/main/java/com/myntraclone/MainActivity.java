package com.myntraclone;

import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.PermissionListener;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity  implements OnImagePickerPermissionsCallback {

    private PermissionListener listener; // <- add this attribute

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyntraClone";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
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

    @Override
    public void setPermissionListener(PermissionListener listener)
    {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
    }
}