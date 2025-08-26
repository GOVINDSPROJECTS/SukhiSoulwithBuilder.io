import React, { useEffect } from "react";
import { View, Text, PermissionsAndroid, Platform, Alert } from "react-native";
import { OneSignal, LogLevel } from "react-native-onesignal";
import api from "@/services/api";
import { useAuthStore } from "@/store/authStore";

const Notification = () => {
     const token = useAuthStore.getState().token;

  useEffect(() => {
    // ✅ Initialize OneSignal
    OneSignal.initialize("cd683651-4353-4ca7-9dda-c9d974ab4962");

    // ✅ Android 13+ permissions
    if (Platform.OS === "android" && Platform.Version >= 33) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Notification permission granted ✅");
        } else {
          Alert.alert("Permission Denied", "Notifications won’t work without permission.");
        }
      });
    }

    // ✅ iOS permissions
    if (Platform.OS === "ios") {
      OneSignal.Notifications.requestPermission(true);
    }

    // ✅ Listen for subscription changes
    const subscriptionObserver = OneSignal.User.pushSubscription.addEventListener("change", (event) => {
      console.log("Subscription changed:", event);

      if (event.current && event.current.id) {
        const playerId = event.current.id; // ✅ Real OneSignal Player ID
        console.log("OneSignal Player ID:", playerId);

        // Save to backend
        api.post(
          "/save-device-token",
          { device_token: playerId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )
          .then((res) => console.log("Token saved:", res.data))
          .catch((err) =>
            console.log("Error saving token:", err.response?.data || err)
          );
      }
    });

    return () => {
      subscriptionObserver.remove();
    };
  }, []);

  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
