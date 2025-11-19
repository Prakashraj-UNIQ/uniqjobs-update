import Image from 'next/image';
import CountUpBox from '@/components/ui/CountUpBox';
import Button from '../common/Button';
import Link from 'next/link';

export default function Banner() {
    return (
        <div  id="hero"  >
            <main className="px-2 sm:px-0 pt-20 sm:pt-0 h-[calc(100vh-45px)] sm:h-[calc(100vh-212px)] overflow-hidden relative">
                {/* Background image */}
                <div className="absolute inset-0 -z-9">
                    <Image
                        src="/images/cta-cover.webp"
                        alt="UniqJobs - Software Training Institute"
                        fill
                        className="object-cover object-[center_40%]"
                        priority
                        sizes="100vw"
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 -z-9 bg-gradient-to-r from-black via-black/10 to-transparent opacity-90" />

                {/* Content */}
                <section className="h-full flex flex-col justify-center items-start px-2 sm:px-10 lg:px-24 text-white text-3xl">
                    <h1 className="relative z-10 font-primary tracking-wide sm:text-lg text-base m-0 mb-4">
                        Best Software Training with Placement Institute in Chennai.
                    </h1>

                    <h2 className="text-3xl sm:text-3xl sm:max-w-2xl z-1 lg:text-5xl font-bold">
                        &quot;Dreaming of Becoming a{' '}
                        <span className="font-primary">Software Engineer?</span>&quot;
                    </h2>

                    <p className="font-primary text-base sm:max-w-2xl my-4 text-white">
                        We’ve been shaping the future of IT talent in Chennai and for over
                        13+ years. We’re proud to be ISO 9001:2015 certified, a NASSCOM
                        member, and partnered with 180+ companies for placement support.
                    </p>

                    <Button
                        href='contact-us' className='text-base'>
                        Talk to Us Today
                    </Button>


                </section>
            </main>

            <div className="h-full sm:h-[100px] bg-black text-white py-5 lg:py-0 flex-col sm:flex-row flex justify-evenly items-center text-center gap-6 sm:gap-20">
                <div className='font-bold text-lg'><h3>Placed Candidates</h3><Link className='text-brandRed underline text-base' href={'/placements/students-review'}>Students Review</Link></div>
                <CountUpBox value={5000} label="Non-IT" />
                <CountUpBox value={2240} label="Career Gap" />
                <CountUpBox value={1980} label="Other Deparment" />
                <CountUpBox value={1330} label="Freshers" />
            </div>
        </div>
    );
}
