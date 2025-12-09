import { JSX } from "react"
type aboutCardType = {
    title: string,
    paragaraph: JSX.Element
}

export default function AboutCard({ title, paragaraph }: aboutCardType) {
    return (
        <div className="flex flex-col border rounded-xl bg-white hover:shadow-2xl transition-all duration-300 h-full">
            <div className="accordion-header p-4 text-left flex items-center justify-between">
                <h2 className="tracking-wide text-black text-3xl font-bold font-primary">
                    {title}
                </h2>
            </div>
            <div
                className="accordion-content px-4 sm:px-6 pb-4 text-gray-700 text-base sm:text-lg flex-1"
                style={{ wordSpacing: '0.1rem' }}
            >
                {paragaraph}
            </div>
        </div>
    )

}