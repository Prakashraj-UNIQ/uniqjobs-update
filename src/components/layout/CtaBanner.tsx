import Image from 'next/image';
import Button from '../common/Button';

export default function ctaBanner() {
    return (
        <div>
            <div className="relative overflow-hidden w-full h-[350px]">

                <Image
                    src="/images/cta-cover.webp"
                    alt="Call to action | uniq jobs"
                    fill
                    className="object-cover object-[center_35%] z-0 opacity-90"
                    priority
                    sizes="100vw"
                />

                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-95 z-10" />

                <div className="relative z-20 p-6 text-white flex flex-col items-start justify-center h-full sm:pl-10 lg:pl-20 w-full sm:w-3/5">
                    <h2 className="text-xl lg:text-3xl font-bold font-primary mb-2">
                        Take Charge of Your Career
                    </h2>
                    <p className="mt-2 text-sm lg:text-lg mb-6">
                        Learn from industry experts with real-time project training and 100% placement assistance. Join UniqJobs, Chennai’s trusted IT training institute, and start your career today.
                    </p>
                    <Button
                        href="/contact-us"
                    >
                        Explore Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

