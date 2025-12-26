"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient"; 
import GlobalLoader from "../../../Components/GlobalLoader";
import { useAsyncAction } from "@/lib/useAsyncAction"; // 1. Import the hook
import { useRouter } from "next/navigation";

interface SignUpProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export default function SignUp({ isOpen, onClose, onSwitchToLogin }: SignUpProps) {
    // 2. USE THE HOOK
    // Instead of [loading, setLoading], we get all these tools:
    // - isLoading: True/False switch
    // - error: Stores error messages if something fails
    // - start/stop/fail: Functions to control the process
    const router = useRouter();
    const { isLoading, error, start, stop, fail } = useAsyncAction(10000); 

    // 3. FORM DATA STATE (Keep this!)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthdate: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 4. THE UPDATED SUBMIT FUNCTION
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // START THE TIMER
        start(); 
        try {
            // STEP A: Basic Validation
            if (formData.password !== formData.confirmPassword) {
                // We use 'fail' here to stop the loader and show the error
                fail("Passwords do not match!");
                return; 
            }

            // STEP B: Talk to Supabase
            const { data, error: supabaseError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        birthdate: formData.birthdate,
                        age: formData.age
                    }
                }
            });
            if (supabaseError) throw supabaseError;
            // STEP C: SUCCESS
            stop(); // Stop the loader
            onClose(); 
            router.push("/Dashboard"); // Redirect to Dashboard
        } catch (err: any) {
            // STEP D: FAILURE
            // Pass the error message to our hook so it can display it if we want
            fail(err.message || "Something went wrong");
        }
    };

    // 5. CONFIGURATION
    const formFields = [
        { name: "firstName", label: "First Name", type: "text", placeholder: "Input First Name" },
        { name: "lastName", label: "Last Name", type: "text", placeholder: "Input Last Name" },
        { name: "birthdate", label: "Birthdate", type: "date", placeholder: "" },
        { name: "age", label: "Age", type: "number", placeholder: "Input Age" },
        { name: "email", label: "Email", type: "email", placeholder: "Input Email" },
        { name: "password", label: "Password", type: "password", placeholder: "" },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "" },
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* 6. SHOW THE GLOBAL LOADER AUTOMATICALLY */}
            {isLoading && <GlobalLoader message="Creating Account..." />}
            
            <div id="signup" className="fixed inset-0 flex items-center justify-center z-[100]">
                <div className="absolute inset-0 bg-[#08193f] opacity-80 backdrop-blur-sm"></div>
                
                <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold">✕</button>
                    <img src="/ASAP.png" alt="ASAP Logo" width={80} height={80} className="mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>

                    {/* 7. SHOW ERROR MESSAGE BOX (Optional but recommended) */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form className="space-y-3" onSubmit={handleSubmit}> 
                        {formFields.map((field, index) => (
                            <div key={index}>
                                <label className="block text-sm font-medium text-gray-700">
                                    {field.label}
                                </label>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    value={(formData as any)[field.name]} 
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-blue-500 focus:border-blue-500"
                                    required 
                                />
                            </div>
                        ))}

                        <button 
                            disabled={isLoading} // 8. Use 'isLoading' from the hook
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-4 font-bold disabled:bg-blue-300"
                        >
                            {/* Dynamic Text */}
                            {isLoading ? "Please Wait..." : "Create Account"}
                        </button>
                        
                        <hr className="my-4" />
                        
                        <button type="button" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition mb-2">
                            Sign Up with Facebook
                        </button>
                        <button type="button" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                            Sign Up with Google
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{' '}
                            <button 
                                type="button" 
                                onClick={onSwitchToLogin}
                                className="text-blue-600 hover:underline font-bold"
                            >
                                Log In
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}