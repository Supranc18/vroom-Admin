
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import AuthService from "../../services/authServices"


export default function Signup() {
  const navigate = useNavigate();

  const signupSchema = z.object({
    fullName: z.string().nonempty({ message: "Full name is required" }),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be in YYYY-MM-DD format" }),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    gender: z.enum(["M", "F", "O"], {
      message: "Gender must be (Male), (Female), or (Other)",
    }),
  });

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
  });
  const [fieldError, setFieldError] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signupHandel = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = signupSchema.safeParse(formData);
    if (!validation.success) {
      const errors = validation.error.errors.reduce((acc: { [key: string]: string }, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setFieldError(errors);
      return;
    }

    try {
      const response = await AuthService.Signup({
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
      });
      if (response.success) {
        toast.success("Signup sucess")
        navigate("/");
        setFormData({ fullName: "", dateOfBirth: "", phoneNumber: "", gender: "" });
      } else {
        setFieldError({ general: response.message || "Signup failed. Please try again." });
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred.";
      setFieldError({ general: errorMessage });
    };
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-6 h-[100vh] border m-3">
        <form
          onSubmit={signupHandel}
          className="flex flex-col gap-6 p-6 bg-gray-200 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-xl font-bold text-center mb-4">Signup</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="font-medium">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
            {fieldError.fullName && <p className="text-red-500 text-sm">{fieldError.fullName}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dateOfBirth" className="font-medium">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {fieldError.dateOfBirth && <p className="text-red-500 text-sm">{fieldError.dateOfBirth}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="font-medium">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
            />
            {fieldError.phoneNumber && <p className="text-red-500 text-sm">{fieldError.phoneNumber}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gender" className="font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="border-2 border-gray-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">--</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            {fieldError.gender && <p className="text-red-500 text-sm">{fieldError.gender}</p>}
          </div>

          {fieldError.general && (
            <div className="text-red-500 text-sm text-center mt-2">
              {fieldError.general}
            </div>
          )}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}