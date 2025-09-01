import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { Picker } from "@react-native-picker/picker"; // npm install @react-native-picker/picker
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '@/services/api';
import PrimaryButton from '@/components/PrimaryButton';
import { useAuthStore } from '@/store/authStore';
import BottomSheetModal from './BottomSheetModal';
import RazorpayCheckout from 'react-native-razorpay';
import colors from '@/theme/colors';

const SubscriptionPaymentModal = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(true);
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
    const [plans, setPlans] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [selectedPlanAmount, setSelectedPlanAmount] = useState(null);
    const [selectedPlanDurationId, setSelectedPlanDurationId] = useState(null);
    const user = useAuthStore((state) => state.user);


    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await api.get("/plans");
                const habitPlans = response.data.plans?.filter(
                    (plan) => plan.name === "Habits"
                );
                setPlans(habitPlans);
            } catch (error) {
                console.error("Error fetching plans:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);
    const createOrder = async (amount: number) => {
        try {
            const response = await api.post('/create-order', { amount });
            console.log('Order Create', response.data);
            return response.data;
        } catch (error) {
            console.log('Error creating order:', error);
            throw error;
        }
    };
    const startPayment = async (amount: number, plan_id: number, plan_duration_id: number) => {
        const token = useAuthStore.getState().token;
        const currentUser = useAuthStore.getState().user;

        try {
            const orderData = await createOrder(amount);

            const options = {
                description: 'Subscription for habit plan',
                image: 'https://www.sukhisoul.com/Sukhisoul%20logo%201.svg',
                currency: orderData.currency,
                key: orderData.key,
                amount: orderData.amount,
                order_id: orderData.order_id,
                name: 'Sukhisoul Wellness Hub',
                prefill: { email: currentUser?.email, name: currentUser?.name },
                theme: { color: colors.primary },
            };

            RazorpayCheckout.open(options)
                .then(async (data) => {
                    console.log('Payment Success:', data);

                    // Verify payment first
                    await api.post('/verify-payment', {
                        razorpay_order_id: data.razorpay_order_id,
                        razorpay_payment_id: data.razorpay_payment_id,
                        razorpay_signature: data.razorpay_signature,
                        amount: orderData.amount,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                        },
                    });

                    // Subscribe API call after payment success
                    await api.post('/subscribe', {
                        plan_id,
                        plan_duration_id,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                        },
                    });
                    setShowPaymentConfirmModal(true);


                })
                .catch((error) => {
                    console.log('Payment Failed:', error);
                    Alert.alert('Payment Error', String(error?.description || 'Unknown error'));
                });
        } catch (err) {
            console.error(err);
        }
    };
      return (   // <-- missing before

<>
    <BottomSheetModal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
    >
        <View style={styles.dragHandle} />
        <Text style={[styles.coachModalTitle, { width: wp(70) }]}>
            Go Premium, Grow Faster
        </Text>
        <Text style={[styles.coachModalSubtitle, { width: wp(68) }]}>
            Want to build habits faster and smarter? Get customised notifications,
            advance settings option and much more
        </Text>
        <Text style={[styles.text18, { marginTop: hp(8) }]}>
            Unlock the full potential.
        </Text>

        {/* Plans Section */}
        <View style={styles.planBox}>
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <>
                    {plans.length > 0 ? (
                        <>
                            <Text style={styles.planTitle}>
                                Select Plan Duration
                            </Text>
                            <Picker
                                selectedValue={selectedDuration}
                                onValueChange={(itemValue) => {
                                    setSelectedDuration(itemValue);

                                    // find the selected duration object
                                    const selected = plans[0].durations.find(
                                        (d) => d.id === itemValue
                                    );

                                    if (selected) {
                                        setSelectedPlanId(plans[0].id); // planId comes from parent plan
                                        setSelectedPlanDurationId(selected.id);
                                        setSelectedPlanAmount(selected.price);
                                    }
                                }}
                                style={styles.pickerFullWidth}
                            >
                                <Picker.Item label="Choose a plan" value={null} />
                                {plans[0].durations.map((duration) => (
                                    <Picker.Item
                                        key={duration.id}
                                        label={`${duration.name} - ₹${duration.price}`}
                                        value={duration.id}
                                    />
                                ))}
                            </Picker>
                        </>
                    ) : (
                        <Text>No Habit Plans Available</Text>
                    )}
                </>
            )}
        </View>

        <PrimaryButton
            title="Get Premium Now"
            onPress={() => {
                if (!selectedPlanAmount || !selectedPlanId || !selectedPlanDurationId) {
                    Alert.alert('Select Plan', 'Please select a plan first');
                    return;
                }
                startPayment(selectedPlanAmount, selectedPlanId, selectedPlanDurationId);
            }}
            style={styles.ctaButton}
        />
    </BottomSheetModal>
    <BottomSheetModal visible={showPaymentConfirmModal} onClose={() => setShowPaymentConfirmModal(false)}>
        <View style={styles.dragHandle} />
        <Image source={require('../assets/icons/correct.png')} style={styles.image} />
        <View style={styles.centerSelf}>
          <Text style={[styles.coachModalTitle, { alignSelf: 'center', width: wp(40) }]}>Payment Received</Text>
          <Text style={[styles.text18, { marginTop: hp(5) }]}>Thank you for upgrading to Premium! </Text>
          <Text style={[styles.text18, { width: wp(75), marginTop: hp(10) }]}>We’ve received your payment, and now you can use all the premium features.</Text>
          <Text style={[styles.text18, { width: wp(75), marginBottom: hp(12) }]}>We’re excited to support your habit journey!</Text>
        </View>
        <PrimaryButton title="Thank You" onPress={() => {
          useAuthStore.getState().setUser({
            ...user,
            is_paid: 1,   // update only this
          }); setShowPaymentConfirmModal(false);
        }} style={styles.thankyouButton} />
      </BottomSheetModal>
      </>
      );
};
export default SubscriptionPaymentModal;
const styles = StyleSheet.create({
  coachModalTitle: { fontSize: wp(9), fontWeight: '700', marginBottom: hp(2), marginTop: hp(2), color: '#2D2D2D' },
  coachModalSubtitle: { fontSize: wp(3.5), color: 'rgba(0, 0, 0, 0.54)', fontWeight: '500' },
  text18: { fontSize: wp(4.5), color: '#2D2D2D', marginBottom: hp(1), fontWeight: '500' },
  grayBox: { marginLeft: wp(6), marginRight: wp(6), width: wp(82), height: wp(62), backgroundColor: '#686868', marginBottom: wp(10), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, borderRadius: wp(2.5), marginTop: hp(2), elevation: 5 },
  image: {
    width: wp(13), height: wp(13), marginTop: hp(5), alignSelf: 'center', resizeMode: 'contain',
  },
  dragHandle: { width: wp(13), height: 5, backgroundColor: '#000000', marginTop: 2, marginBottom: hp(2), borderRadius: 12, alignSelf: 'center' },
  planBox: { marginLeft: wp(6), marginRight: wp(6), width: wp(82), height: wp(62), backgroundColor: '#f2f2f2', marginBottom: wp(10), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: wp(2.5), marginTop: hp(2), padding: 10 },
  planTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  pickerFullWidth: { width: '100%' },
  ctaButton: { width: wp(50), height: wp(11), alignSelf: 'center', marginBottom: hp(5) },
  centerSelf: { alignSelf: 'center' },
  thankyouButton: { width: wp(35), height: wp(11), alignSelf: 'center', marginBottom: hp(5) },
});
