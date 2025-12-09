import Button from "@/components/common/Button";
import Image from "next/image";

export type CourseContent = {
    courseTitle: string;
    courseSalary: string;
    courseDescription: string;
    icon: string;
    cta: { href: string; label: string };
};


export default function CourseCard({ courseTitle, courseSalary, courseDescription, icon, cta }: CourseContent) {
    return (
        <div className="overflow-hidden rounded-xl bg-white transition-all duration-300 border border-gray-400 hover:shadow-xl h-full">
            <div className="relative group flex p-4 sm:p-6 opacity-100 transition-opacity duration-300">
                <div className="w-full">
                    <h3 className="text-xl text-gray-800 font-primary font-bold mb-1">
                        {courseTitle}
                    </h3>
                    <p className="text-zinc-600 text-base">
                        Avg Salary: <span className="text-zinc-200 font-bold" /> {courseSalary}
                    </p>

                    <div className="sm:opacity-0 group-hover:opacity-100 transition-all group-hover:delay-300 duration-300 ease-in">
                        <p className="mt-4 text-red-900 font-secondary font-medium max-w-sm">
                            {courseDescription}
                        </p>
                    </div>
                        
                    <Button ariaLabel={`Learn more about ${courseTitle}`} href={cta.href} className="mt-4" variants="filedBlackMin">
                        {cta.label}
                    </Button>

                </div>

                <div className="absolute top-8 right-5 scale-55 sm:scale-100 group-hover:scale-55 transition-all duration-500 ease-in-out -translate-y-12 translate-x-10 sm:-translate-y-0 sm:translate-x-0 group-hover:-translate-y-12 group-hover:translate-x-10">
                    <Image
                        src={icon}
                        width={100}
                        height={100}
                        alt={`${courseTitle}| uniqjobs`}
                    />
                </div>
            </div>
        </div>
    )
}

