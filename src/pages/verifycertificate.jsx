import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function VerifyCertificate() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch(`${BASE_URL}/verify/${certificateId}`);
        const data = await res.json();

        if (data.valid) {
          setCertificate(data);
          console.log(data)
        } else {
          setError("Certificate not found");
        }
      } catch {
        setError("Verification failed");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying certificate...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-bold">
        ❌ {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Certificate Verified
        </h1>

        <p className="text-lg font-semibold mb-2">
          {certificate.name}
        </p>

        <p className="text-gray-600 mb-1">
          Successfully completed the
        </p>

        <p className="font-bold text-gray-900 mb-4">
          {certificate.track}
        </p>

        <p className="text-sm text-gray-500 mb-2">
          Cohort: {certificate.cohort}
        </p>

        <p className="text-xs text-gray-400">
          Certificate ID: {certificate.certificateId}
        </p>
      </div>
    </div>
  );
}
