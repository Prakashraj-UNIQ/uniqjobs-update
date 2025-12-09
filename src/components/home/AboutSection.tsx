import AboutCard from "../ui/cards/AboutCard";

export default function AboutSection() {
    return (
        <section
            id="aboutUs"
            className="flex justify-center items-center bg-white py-20"
        >
            <div className="w-full px-2 sm:px-8 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                    <AboutCard
                        title={
                            "Who We are?"
                        }
                        paragaraph={
                            <>
                                At <strong>UniqJobs</strong>, we’re best software training with placement institute in chennai.
                                we’re a launchpad for tech careers. Established in 2007 by industry
                                professionals from <strong>TCS</strong> and powered by{' '}
                                <strong>UNIQ Technologies</strong>, we’ve been shaping the future of
                                IT talent in Chennai for over 13+ years. We’re proud to be ISO
                                9001:2015 certified, a <strong>NASSCOM member</strong>, and partnered with 180+
                                companies for placement support.
                            </>
                        } />

                    <AboutCard
                        title={
                            "What We Do?"
                        }
                        paragaraph={
                            <>
                                We specialize in industry-ready software training programs with{' '}
                                <strong>100% placement assurance</strong>. Our expert-led, practical
                                courses are designed to help freshers, career changers, and working
                                professionals gain real-world tech skills.
                            </>
                        } />
                </div>
            </div>
        </section>

    )
}