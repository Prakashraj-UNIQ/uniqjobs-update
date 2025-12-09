import Image from "next/image"

type whyCardtype = {
    icon: string
    title: string
    description: string
}

const WhyCard = ({ icon, title, description }: whyCardtype) => {
    return (

        <div className="bg-white p-6 ">
            <Image
                width={52}
                height={52}
                src={`/svg/WhyChoose/${icon}`}
                alt={title}
                className="mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-800">{description}</p>
        </div>

    )
}

export default WhyCard