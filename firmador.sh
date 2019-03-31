#!/bin/bash
cordova build android --release
cd platforms/android/build/outputs/apk/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore rednau-key.keystore android-release-unsigned.apk rednau
zipalign -v 4 android-release-unsigned.apk C4-24.apk
echo "FIN DEL SCRIPT FIRMADOR"