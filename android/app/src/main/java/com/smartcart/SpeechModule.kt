package com.smartcart

import android.app.Activity
import android.content.Intent
import android.speech.RecognizerIntent
import com.facebook.react.bridge.*

class SpeechModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), ActivityEventListener {

    private var speechPromise: Promise? = null
    private val REQUEST_CODE = 999

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName(): String = "SpeechModule"

    @ReactMethod
    fun startSpeechRecognition(promise: Promise) {
        val activity = currentActivity
        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No activity available")
            return
        }

        speechPromise = promise

        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH)
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US")
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak now...")

        intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 1000)
        intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS, 1000)
        intent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS, 2000)

        try {
            activity.startActivityForResult(intent, REQUEST_CODE)
        } catch (e: Exception) {
            promise.reject("INTENT_ERROR", e.message)
        }
    }

override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
    if (requestCode == REQUEST_CODE && speechPromise != null) {
        when (resultCode) {
            Activity.RESULT_OK -> {
                val results = data?.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS)
                val spokenText = results?.get(0) ?: ""
                speechPromise?.resolve(spokenText)
            }
            Activity.RESULT_CANCELED -> {

                speechPromise?.resolve("")
            }
            else -> {
                speechPromise?.reject("NO_RESULT", "Speech recognition failed")
            }
        }
        speechPromise = null
    }
}


    override fun onNewIntent(intent: Intent?) {}
}
