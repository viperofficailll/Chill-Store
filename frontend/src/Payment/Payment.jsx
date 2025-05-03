import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

function Payment() {
  const { state } = useLocation();
  const [transactionUuid, setTransactionUuid] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  const amount = Number(state?.totalAmount) || 0;
  const taxAmount = 10;
  const serviceCharge = 0;
  const deliveryCharge = 0;
  const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;

  const signedFieldNames = "total_amount,transaction_uuid,product_code";

  useEffect(() => {
    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount. Please enter a valid transaction amount.");
      return;
    }

    const uuid = uuidv4();
    setTransactionUuid(uuid);

    const message = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=EPAYTEST`;
    const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
    const hashBase64 = CryptoJS.enc.Base64.stringify(hash);
    setSignature(hashBase64);
  }, [amount, totalAmount]);

  if (error) {
    return (
      <div className="text-red-600 font-semibold text-center mt-4">
        {error}
      </div>
    );
  }

  if (!transactionUuid || !signature)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold text-white">
        Loading Payment...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main
        className="flex-grow flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/Esewa_logo.webp')" }} // same image or change if needed
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center px-8 py-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4 text-teal-400">
            Payment Details
          </h1>
          <p className="text-white mb-4">
            Please confirm your payment of <span className="font-bold">NPR {totalAmount.toFixed(2)}</span> using Esewa.
          </p>
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="amount" value={amount} />
            <input type="hidden" name="tax_amount" value={taxAmount} />
            <input
              type="hidden"
              name="product_service_charge"
              value={serviceCharge}
            />
            <input
              type="hidden"
              name="product_delivery_charge"
              value={deliveryCharge}
            />
            <input type="hidden" name="total_amount" value={totalAmount} />
            <input
              type="hidden"
              name="transaction_uuid"
              value={transactionUuid}
            />
            <input type="hidden" name="product_code" value="EPAYTEST" />
            <input
              type="hidden"
              name="success_url"
              value="http://localhost:5173/success"
            />
            <input
              type="hidden"
              name="failure_url"
              value="http://localhost:5173/failure"
            />
            <input
              type="hidden"
              name="signed_field_names"
              value={signedFieldNames}
            />
            <input type="hidden" name="signature" value={signature} />

            <input
              type="submit"
              value="Pay with Esewa"
              className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full text-lg transition duration-300 cursor-pointer"
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Payment;
