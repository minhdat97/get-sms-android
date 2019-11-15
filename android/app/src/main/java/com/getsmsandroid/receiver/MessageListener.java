package com.getsmsandroid.receiver;

import android.content.Context;
import android.content.BroadcastReceiver;
import com.getsmsandroid.service.GetMessage;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;

public final class MessageListener extends BroadcastReceiver {
    private static final String SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";
    private static final String TAG = "SMSBroadcastReceiver";

    @Override
    public final void onReceive(Context context, Intent intent) {
        Intent messIntent = new Intent(context, GetMessage.class);
        Log.i(TAG, "Intent recieved: " + intent.getAction());
        Log.d(intent.getAction(), "intent");
        if (intent.getAction().equals(SMS_RECEIVED))
        {
            Log.d(TAG, "here");
            messIntent.putExtra("action", "new_message");
        }
        else
        {
            messIntent.putExtra("action", "no_message");
        }
        context.startService(messIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
    }
}