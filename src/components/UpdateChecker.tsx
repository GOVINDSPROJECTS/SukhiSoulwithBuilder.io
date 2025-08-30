import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import VersionCheck from "react-native-version-check";

export default function UpdateChecker() {
  const [showUpdate, setShowUpdate] = useState(false);
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    const checkVersion = async () => {
      try {
        const updateNeeded = await VersionCheck.needUpdate();
        if (updateNeeded?.isNeeded) {
          setStoreUrl(updateNeeded.storeUrl);
          setShowUpdate(true);
        }
      } catch (error) {
        console.log("Version check error:", error);
      }
    };
    checkVersion();
  }, []);

  const handleUpdate = async () => {
    if (storeUrl) {
      await VersionCheck.openAppStore(storeUrl);
    }
  };

  return (
    <View>
      <Modal visible={showUpdate} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 16, width: "80%", alignItems: "center" }}>
            
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
              🚀 Update Available
            </Text>
            <Text style={{ fontSize: 14, color: "#555", textAlign: "center", marginBottom: 20 }}>
              Please update to the latest version for the best experience.
            </Text>

            {/* Buttons */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <TouchableOpacity
                onPress={handleUpdate}
                style={{ flex: 1, backgroundColor: "#4CAF50", padding: 12, borderRadius: 10, marginRight: 10 }}
              >
                <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Update Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowUpdate(false)}
                style={{ flex: 1, backgroundColor: "#ccc", padding: 12, borderRadius: 10 }}
              >
                <Text style={{ color: "#333", textAlign: "center", fontWeight: "bold" }}>Later</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
