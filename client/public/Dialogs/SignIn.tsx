"use client";
// 1. IMPORTING TOOLS
// - useState: To remember what the user types.
// - ChangeEvent, FormEvent: Typescript rules to prevent errors.
// - supabase: The connection to your database we made earlier.
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient"; 

interface SignUpProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export default function SignUp({ isOpen, onClose, onSwitchToLogin }: SignUpProps) {
    
    // 2. STATE (MEMORY)
    // We create one big object to hold all the answers.
    // 'loading' is a simple switch: true if we are waiting for Supabase, false if we are done.
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthdate: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // 3. THE "LISTENER" FUNCTION
    // This runs every single time you type a character in ANY box.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // e.target.name = "email" (Which box?)
        // e.target.value = "john@gm..." (What did they type?)
        const { name, value } = e.target;
        
        // Create a copy of the old data, then update ONLY the field that changed.
        // ...formData means "keep all the other fields the same"
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 4. THE SUBMIT FUNCTION (The Bridge to Supabase)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Stop the page from refreshing (default HTML behavior)
        setLoading(true);   // Turn on the loading spinner/disable button

        try {
            // STEP A: Basic Validation
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return; // Stop right here
            }

            // STEP B: Talk to Supabase
            // We use 'await' because this takes time.
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    // This 'data' object is where we put custom fields (Name, Age, etc.)
                    // Supabase Auth usually only wants Email/Pass, so extra stuff goes here.
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        birthdate: formData.birthdate,
                        age: formData.age
                    }
                }
            });

            // STEP C: Check the result
            if (error) throw error; // If Supabase says "Error", jump to the catch block

            alert("Success! Please check your email to verify your account.");
            onClose(); // Close the modal on success

        } catch (error: any) {
            // STEP D: Handle Errors (e.g., "User already exists")
            alert(error.message);
        } finally {
            setLoading(false); // Turn off loading no matter what happened
        }
    };

    // 5. CONFIGURATION
    // Added 'name' property to link inputs to our State
    const formFields = [
        { name: "firstName", label: "First Name", type: "text", placeholder: "Input First Name" },
        { name: "lastName", label: "Last Name", type: "text", placeholder: "Input Last Name" },
        { name: "birthdate", label: "Birthdate", type: "date", placeholder: "" },
        { name: "age", label: "Age", type: "number", placeholder: "Input Age" },
        { name: "email", label: "Email", type: "email", placeholder: "Input Email" },
        { name: "password", label: "Password", type: "password", placeholder: "" },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "" },
    ];

    // Scroll Lock Effect (Kept from your code)
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
        <div id="signup" className="fixed inset-0 flex items-center justify-center z-[100]">
            <div className="absolute inset-0 bg-[#08193f] opacity-80 backdrop-blur-sm"></div>
            
            <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative z-10 animate-fade-in-up max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold">✕</button>
                <img src="/ASAP.png" alt="ASAP Logo" width={80} height={80} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Sign Up</h2>

                {/* Attach the submit handler here */}
                <form className="space-y-3" onSubmit={handleSubmit}> 
                    
                    {formFields.map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                name={field.name}           // Identifies the field (e.g., "email")
                                type={field.type}
                                placeholder={field.placeholder}
                                onChange={handleChange}     // Calls our listener when you type
                                
                                // "value" forces the input to show what is in our State.
                                // We use "as any" here to cheat Typescript a little bit for simplicity,
                                // telling it "Trust me, this key exists in formData".
                                value={(formData as any)[field.name]} 
                                
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black focus:ring-blue-500 focus:border-blue-500"
                                required // Makes browser force you to fill it
                            />
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button 
                        disabled={loading} // Prevent double-clicks
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-4 font-bold disabled:bg-gray-400"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                    
                    <hr className="my-4" />
                    
                    {/* Social Buttons (Logic not implemented yet) */}
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
    );
}