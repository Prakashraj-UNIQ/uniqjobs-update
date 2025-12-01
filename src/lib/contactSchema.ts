// lib/contactSchema.ts
import { z } from "zod";

// Dropdown options (edit as needed)
export const degreeOptions = [
  "B.Com",
  "MBA",
  "MCA",
  "B.Sc",
  "ME / M.Tech",
  "BE / B.Tech",
  "Others",
] as const;

export const locationOptions = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Thirunelveli",
  "Salem",
  "Puducherry",
  "Bangalore",
  "Tirupati",
  "Online",
] as const;

export type DegreeOption = (typeof degreeOptions)[number];
export type LocationOption = (typeof locationOptions)[number];

export const contactSchema = z.object({
  fullname: z.string().min(2, "Please enter your full name"),
  highest_degree: z.enum(degreeOptions, "Please select your highest degree"),
  looking_for: z.string().optional(),
  email_address: z.string().email("Please enter a valid email address"),
  college_name: z.string().optional(),
  graduation_year: z
    .string()
    .regex(/^(19|20)\d{2}$/, "Enter a valid year (e.g., 2023)"),
  preferred_location: z.enum(locationOptions).optional(),
  contact_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  date: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
