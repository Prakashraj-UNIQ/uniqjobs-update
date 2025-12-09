"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
    | "filled"
    | "outline"
    | "icon"
    | "iconFilled"
    | "filedBlack"
    | "filedBlackMin";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variants?: ButtonVariant;
    icon?: ReactNode;
    children: ReactNode;
    ariaLabel?: string; // ADDED
}

export default function Button({
    href,
    variants = "filled",
    icon,
    children,
    className,
    ariaLabel, // ADDED
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200";

    const variant: Record<ButtonVariant, string> = {
        filled: "hover:bg-red-700 px-6 py-2 bg-brandRed text-white rounded-full",
        filedBlack: "hover:bg-black/90 px-5 py-2 bg-black border border-black text-white rounded-full",
        filedBlackMin: "hover:bg-black/90 px-5 py-1 bg-black border border-black text-white rounded-full",
        outline:
            "border px-8 py-2 text-white lg:text-black rounded-full bg-white hover:bg-brandRed hover:text-white transition font-semibold self-start sm:self-start",
        icon: "py-2 px-5 rounded-full border border-brandBlue hover:bg-brandBlue/5 transition text-brandBlue",
        iconFilled:
            "py-2 px-5 rounded-full border border-brandBlue hover:bg-brandBlue/5 transition text-brandBlue",
    };

    const classes = cn(baseStyles, variant[variants], className);

    const content = (
        <>
            {icon && <span className={children ? "mr-2" : ""}>{icon}</span>}
            {children}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes} aria-label={ariaLabel}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} aria-label={ariaLabel} {...props}>
            {content}
        </button>
    );
}
