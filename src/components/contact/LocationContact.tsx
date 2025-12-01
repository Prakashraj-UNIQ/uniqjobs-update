import Button from "../common/Button";

type locationProps = {
  location: string,
  href: string,
  city: string,
  course?: string
}

export default function LocationContact({ location, href, city, course }: locationProps) {
  return (
    <section className="w-full bg-[#f2f2f2] py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-10 md:px-25">

        <div className="w-full h-64 sm:h-80 md:h-full">
          <iframe
            src={href}
            className="w-full h-full rounded-lg"
            loading="lazy"
          ></iframe>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-xl sm:text-3xl font-medium">{`Ready to enquire about the ${course} course in ${city}? Contact us today.`}</h2>

          <div className="flex items-start space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8c0 7.5-7.5 13-7.5 13S4.5 15.5 4.5 8a7.5 7.5 0 1115 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-600">{location}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-2.17a1.5 1.5 0 00-.97-1.4l-3.55-1.42a1.5 1.5 0 00-1.68.44l-1.12 1.36a11.96 11.96 0 01-5.17-5.17l1.36-1.12a1.5 1.5 0 00.44-1.68L7.07 4.22A1.5 1.5 0 005.66 3.25H3.5A2.25 2.25 0 002.25 5.5v1.25z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-600">+91 96001 14466</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2M12 22a10 10 0 100-20 10 10 0 000 20z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold">Office Hours</h3>
              <p className="text-gray-600">Mon – Sat: 9:00 AM – 7:00 PM</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">info@uniqtechnologies.co.in</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Button href="/contact-us">
              Talk To Us
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
