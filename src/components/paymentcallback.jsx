import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function PaymentCallback() {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return navigate("/");

      const email = localStorage.getItem("userEmail");
      if (!email) return navigate("/");

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`,
          { reference, email }
        );

        if (data.success) {
          toast.success("Premium activated!");
          setSuccess(true);
          setMessage("🎉 Congratulations! Your Premium subscription is now active.");
        } else {
          toast.error(data.message || "Payment verification failed");
          setMessage(data.message || "Payment verification failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server verification failed");
        setMessage("Server verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {success ? (
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg">
          <CheckCircle2 className="mx-auto w-14 h-14 text-indigo-600" />
          <h1 className="text-2xl font-bold mt-4">Payment Successful!</h1>
          <p className="mt-2 text-gray-700">{message}</p>
          <button
            className="mt-6 px-6 py-2 bg-indigo-600/70 text-white rounded-lg font-medium hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-500">Payment Failed</h1>
          <p className="mt-2 text-gray-700">{message}</p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      )}
    </div>
  );
}
