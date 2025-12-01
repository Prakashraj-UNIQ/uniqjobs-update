import Image from "next/image";

type afterComplete = {
    title?: string,
    description?: string,
    postion?: string[],
    companies?: string[]
}

const AfterComplete = ({ title, description, postion, companies }: afterComplete) => {
    return (
        <section className="bg-white py-12">
            <div className="mx-auto px-4 sm:px-6 lg:px-25">
                <div className="text-center">
                    <h2 className="text-3xl lg:text-5xl font-black text-black">
                        {title}
                    </h2>
                    <p className="mx-auto mt-3 max-w-4xl md:text-lg text-black/80">
                        {description}
                    </p>
                </div>

                <div className="mt-10 grid gap-10 md:grid-cols-2">

                    <div className="grid grid-cols-1 space-y-4">
                        {postion?.map((role) => (
                            <div
                                key={role}
                                className="flex items-center gap-3"
                            >
                                <div className="relative">
                                    <span
                                        className="absolute inset-0 -z-10 rounded-full bg-red-500/30 animate-ping"
                                        aria-hidden
                                    />
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-black ring-1 ring-black/10">
                                        <BriefcaseIcon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <span className="md:text-lg font-medium text-black">{role}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/60">
                            Top Hiring Companies
                        </h3>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 [grid-auto-rows:70px]">
                            {companies?.map((name, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center justify-center rounded-lg bg-white text-xs text-black/60 ring-1 ring-black/5 shadow-sm ${i % 5 === 0 ? "row-span-2" : "row-span-1"}`}
                                    title={`${name} logo | Uniqjobs`}
                                >
                                    <Image src={`/images/logos/${name}.png`} alt={`${name} logo | Uniqjobs`} width={120} height={40} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default AfterComplete

function BriefcaseIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden
        >
            <path d="M14 6V5a2 2 0 0 0-2-2h-0a2 2 0 0 0-2 2v1H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4Zm-2-1h0a1 1 0 0 1 1 1v1h-2V6a1 1 0 0 1 1-1ZM4 11h16v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5Z" />
        </svg>
    );
}