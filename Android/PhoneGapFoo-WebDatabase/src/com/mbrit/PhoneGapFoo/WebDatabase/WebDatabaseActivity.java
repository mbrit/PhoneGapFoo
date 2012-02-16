package com.mbrit.PhoneGapFoo.WebDatabase;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class WebDatabaseActivity extends DroidGap {
	
    @Override
    public void onCreate(Bundle savedInstanceState) {

    	super.onCreate(savedInstanceState);
    	//setContentView(R.layout.main);
        super.loadUrl("file:///android_asset/www/index.html");
    
    }
}