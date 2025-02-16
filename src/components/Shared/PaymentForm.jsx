// src/components/Shared/PaymentForm.jsx
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { subscriptionService } from '../../api/subscription';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ plan, onSuccess, onError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkInitialization = async () => {
            if (stripe && elements) {
                setIsReady(true);
                console.log('Stripe and Elements initialized');
            }
        };
        checkInitialization();
    }, [stripe, elements]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Payment form submitted');
        
        if (!isReady) {
            console.error('Stripe not fully initialized');
            setError('Payment system is initializing. Please try again.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Create payment method
            console.log('Creating payment method...');
            const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (methodError) {
                throw methodError;
            }

            console.log('Payment method created:', paymentMethod.id);

            // Create subscription
            const response = await subscriptionService.upgradePlan(plan._id, paymentMethod.id);
            console.log('Subscription response:', response);

            if (response.data?.clientSecret) {
                const { error: confirmError } = await stripe.confirmCardPayment(
                    response.data.clientSecret
                );

                if (confirmError) {
                    throw confirmError;
                }
            }

            onSuccess();
        } catch (err) {
            console.error('Payment error:', err);
            setError(err.message || 'Payment processing failed');
            onError?.(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isReady) {
        return (
            <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#FF5341] border-t-transparent mx-auto mb-2"></div>
                <p className="text-gray-600">Initializing payment system...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border rounded-lg bg-white">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
            </div>

            {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#FF5341] text-white py-2 rounded-lg hover:bg-[#FF5341]/90 transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Processing...' : `Pay $${plan.price}/month`}
            </button>

            <div className="text-xs text-gray-500 text-center mt-2">
                Your card will be charged ${plan.price} monthly
            </div>
        </form>
    );
};

// Wrapper component that provides Stripe context
const PaymentFormWrapper = (props) => {
    console.log('Rendering PaymentFormWrapper with props:', props);
    
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm {...props} />
        </Elements>
    );
};

export default PaymentFormWrapper;