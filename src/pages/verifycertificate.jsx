import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle, ShieldCheck, Award, Calendar, Hash } from "lucide-react"; // npm i lucide-react

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
        } else {
          setError("This certificate record could not be found or is no longer valid.");
        }
      } catch {
        setError("Unable to connect to the verification server.");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-600 font-medium animate-pulse">Authenticating Certificate...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-10 text-center border border-red-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Verification Failed</h2>
          <p className="text-slate-500 text-sm mb-6">{error}</p>
          <a href="/" className="inline-block w-full py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-black transition">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex flex-col justify-items-center leading-none">
          <span className="text-xl font-black tracking-tighter text-slate-900">KNOWNLY</span>
          <span className="text-[8px] text-center font-bold tracking-[0.3em] text-indigo-600 uppercase">Internships</span>
        </div>
      </div>

      <div className="max-w-md w-full relative">
        {/* Verification Badge Overlay */}
        <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg z-10 animate-bounce-slow">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden border border-slate-100">
          {/* Status Banner */}
          <div className="bg-emerald-50 py-4 flex items-center justify-center gap-2 border-b border-emerald-100">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-widest">Officially Verified</span>
          </div>

          <div className="p-8 md:p-10 text-center">
            <div className="mb-6">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Certificate Recipient</p>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {certificate.name}
              </h1>
            </div>

            <div className="space-y-4 inline-block text-left w-full bg-slate-50 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <Award className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Program Track</p>
                  <p className="text-sm font-bold text-slate-800">{certificate.track}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Cohort Session</p>
                  <p className="text-sm font-bold text-slate-800">{certificate.cohort}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Hash className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Credential ID</p>
                  <p className="text-[11px] font-mono font-bold text-slate-500 break-all">{certificate.certificateId}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                This document confirms the student has successfully passed all 8 stages of the Knownly Internship program and met the required technical standards.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => window.print()}
          className="mt-6 w-full py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2"
        >
          Download PDF Proof
        </button>
      </div>

      <p className="mt-8 text-slate-400 text-xs">
        © 2026 Knownly Tech • Security Verified
      </p>
    </div>
  );
}