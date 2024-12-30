import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, {AxiosError} from "axios";
import { z } from "zod";
import { toast } from "react-toastify";


export default function Login() {
    const navigate = useNavigate();

    const phoneSchema = z.object({
        phoneNumber: z.string().nonempty({ message: "Phone phoneNumber is required" }),
    });

    const otpSchema = z.object({
        otp: z.string().length(6, { message: "OTP must be 6 digits" }),
    });

    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [otp, setOtp] = useState<string>("");

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = phoneSchema.safeParse({ phoneNumber: phoneNumber });
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        try {
            setError(null);
            const response = await axios.post("http://localhost:3000/api/v1/auth/login", {
                phoneNumber: phoneNumber,
            });
            if (response.data.success) {
                setStep("otp");
            } else {
                setError("Failed to send OTP. Please try again.");
            }
        } catch (e) {
            const err = e as AxiosError;
            console.log(err);  
            setError("An error occurred while sending the OTP. Please try again.");
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = otpSchema.safeParse({ otp });
        if (!result.success) {
            setError(result.error.errors[0].message);
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/auth/login/verify", {
                phoneNumber: phoneNumber,
                otp: otp,
            });

            if (response.data.message === "OTP Verified") {
                toast.success("Login Successful");
                localStorage.setItem("Token", response.data.refreshToken); 
                navigate("/dashboard");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (e) {
            const err = e as AxiosError;
            setError( "An error occurred during OTP verification.",);
            console.log(err);
            
        }
    };


    return (
        <div className="flex h-[100vh] justify-center items-center">
            {step === "phone" ? (
                <form onSubmit={handlePhoneSubmit}>
                    <div className="flex flex-col gap-3 bg-slate-300 p-8">
                        <div className="flex gap-4">
                            <label htmlFor="phone">Phone phoneNumber</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="border-2 border-black p-1"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button type="submit" className="bg-black text-white py-2">
                            Send OTP
                        </button>
                        <Link className="text-center" to={"signup"}>Signup</Link>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div className="flex flex-col gap-3 bg-slate-300 p-8">
                        <div className="flex gap-4">
                            <label htmlFor="otp">OTP</label>
                            <input
                                type="text"
                                id="otp"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="border-2 border-black p-1"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <button type="submit" className="bg-black text-white py-2">
                            Verify OTP
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
