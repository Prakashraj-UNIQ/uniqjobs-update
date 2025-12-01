import Image from "next/image";
import Button from "../common/Button";

type courseDetails = {
    icon: string;
    title: string;
    subtitle: string
}

type location = {
    data?: courseDetails[]
    city: string
}

export default function LocationCourses({ data, city }: location) {

    return (
        <section className="w-full py-6 sm:py-16 bg-red-50">
            <div className="container mx-auto px-4 text-center">

                <h2 className="text-4xl font-bold mb-12">{`Currently Available Courses in ${city}`}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 px-2 sm:px-10 xl:px-15">
                    {data?.map((course, index) => (
                        <div
                            key={index}
                            className="p-4 sm:p-8 flex flex-col items-center text-center"
                        >
                            <div className="bg-white  shadow-lg rounded-full p-5">
                                <Image width={52} height={52} alt={course.title} src={course.icon} />
                            </div>

                            <h3 className="mt-4 text-xl font-semibold">{course.title}</h3>
                            <p className="mt-2 text-gray-600 text-sm">{course.subtitle}</p>
                        </div>
                    ))}
                </div>


                <div className="mt-6 flex justify-center">
                    <Button href="/courses">View All Courses</Button>
                </div>

            </div>
        </section>
    );
}
