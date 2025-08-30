import InAppReview from "react-native-in-app-review";
import { Button } from "react-native";

export default function FeedbackButton() {
  const requestReview = () => {
    if (InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview()
        .then((hasFlowFinishedSuccessfully) => {
          console.log("Review flow completed:", hasFlowFinishedSuccessfully);
        })
        .catch((err) => console.warn(err));
    }
  };

  return <Button title="Give Feedback ⭐" onPress={requestReview} />;
}
