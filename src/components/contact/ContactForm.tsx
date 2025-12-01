"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../common/Button";
import {
    contactSchema,
    type ContactFormValues,
    degreeOptions,
    locationOptions,
} from "@/lib/contactSchema";

const ContactForm = () => {
    const [serverMessage, setServerMessage] = useState<string>("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            date: new Date().toLocaleString(),
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {

            const payload = {
                fullname: data.fullname,
                college_name: data.college_name,
                highest_degree: data.highest_degree,
                graduation_year: data.graduation_year,
                looking_for: data.looking_for,
                preferred_location: data.preferred_location,
                contact_number: data.contact_number,
                email_address: data.email_address,
            };

            setServerMessage("");
            setStatus("idle");

            const res = await fetch("https://uniqjobs.co.in/register.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),

            });

            if (!res.ok) {
                throw new Error("Failed");
            }

            const json = await res.json();
            setStatus("success");
            setServerMessage(
                json.message || "Thank you! Our team will contact you soon."
            );
            reset({
                date: new Date().toLocaleString(),
            });
        } catch {
            setStatus("error");
            setServerMessage("Something went wrong. Please try again.");
        }
    };

    const isBusy = isSubmitting;

    return (
        <form
            className="py-12 w-full lg:w-3/5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 gap-0 lg:gap-8">
                <div>
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block font-medium ">
                            Full Name <span className="text-red-600">*</span>
                        </label>
                        <input

                            type="text"
                            id="name"
                            placeholder="Your full name, please"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white  font-bold py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md capitalize"
                            required
                            {...register("fullname")}
                        />
                        {errors.fullname && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.fullname.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="choose_degree"
                            className="mb-3 block font-medium "
                        >
                            <span className="hidden sm:inline">
                                Highest Degree <span className="text-red-600">*</span>
                            </span>
                            <span className="inline sm:hidden">Highest Degree</span>
                        </label>
                        <div className="relative">
                            <select

                                id="choose_degree"
                                required
                                className="peer w-full appearance-none rounded-md border border-[#e0e0e0]  font-bold bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md"
                                {...register("highest_degree")}
                            >
                                <option value="">
                                    Choose your qualification {`(e.g., ME / M.Tech)`}
                                </option>
                                {degreeOptions.map((deg) => (
                                    <option key={deg} value={deg}>
                                        {deg}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 peer-focus:rotate-180">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                        {errors.highest_degree && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.highest_degree.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="looking_for"
                            className="mb-3 block font-medium "
                        >
                            What Are You Looking For?
                        </label>
                        <div className="relative">
                            <select

                                id="looking_for"
                                className="peer w-full appearance-none rounded-md border border-[#e0e0e0]  font-bold bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md"
                                {...register("looking_for")}
                            >
                                <option value="">Select a course option</option>
                                <option value="Only Course">Only Course</option>
                                <option value="Course with Assured Job">
                                    Course with Assured Job
                                </option>
                                <option value="Fast Track Course with Job">
                                    Fast Track Course with Job
                                </option>
                                <option value="Only Placement">Only Placement</option>
                            </select>
                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 peer-focus:rotate-180">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        {errors.looking_for && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.looking_for.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="mb-3 block font-medium ">
                            Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="email"

                            id="email"
                            required
                            placeholder="Where we can reach you"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white  font-bold py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md"
                            {...register("email_address")}
                        />
                        {errors.email_address && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.email_address.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="mb-5">
                        <label htmlFor="college_name" className="mb-3 block font-medium ">
                            College Name
                        </label>
                        <input
                            type="text"

                            id="college_name"
                            placeholder="Your college or university"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white  font-bold py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md capitalize"
                            {...register("college_name")}
                        />
                        {errors.college_name && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.college_name.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="graduation_year" className="mb-3 block font-medium ">
                            Graduation Year <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"

                            id="graduation_year"
                            required
                            placeholder="When did you complete your degree?"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white  font-bold py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md"
                            {...register("graduation_year")}
                        />
                        {errors.graduation_year && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.graduation_year.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="prefer_location"
                            className="mb-3 block font-medium "
                        >
                            Preferred Location
                        </label>
                        <div className="relative">
                            <select

                                id="prefer_location"
                                className="peer w-full appearance-none rounded-md border border-[#e0e0e0]  font-bold bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md"
                                {...register("preferred_location")}
                            >
                                <option value="">
                                    Choose your training city (e.g., Salem)
                                </option>
                                {locationOptions.map((loc) => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>

                            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 peer-focus:rotate-180">
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        {errors.preferred_location && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.preferred_location.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="contact_number" className="mb-3 block font-medium ">
                            Contact Number <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="number"

                            id="contact_number"
                            required
                            placeholder="Your mobile number"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white  font-bold py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-red-600 focus:shadow-md"
                            {...register("contact_number")}
                        />
                        {errors.contact_number && (
                            <p className="mt-1 text-xs text-red-600">
                                {errors.contact_number.message}
                            </p>
                        )}
                    </div>

                    <input
                        type="hidden"

                        value={new Date().toLocaleString()}
                        {...register("date")}
                    />
                </div>
            </div>

            {serverMessage && (
                <div className="pl-8 pb-4">
                    <p
                        className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {serverMessage}
                    </p>
                </div>
            )}

            <div className="flex justify-start pl-8">
                <Button
                    href=""
                    variants="filled"
                    onClick={handleSubmit(onSubmit)}
                >
                    {isBusy ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
