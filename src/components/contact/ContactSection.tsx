import ContactForm from "./ContactForm"
import ContactLabel from "./ContactLabel"

const ContactSection = () => {
  return (
    <div
      id="contectForm"
      className=" flex items-center justify-center pt-20 md:pt-0  lg:p-6  xl:p-12 bg-[#f2f2f2]"
    >
      <div className="mx-auto w-full">
        <div className="mb-8">
          <h2 className="text-center px-2 text-2xl sm:text-4xl lg:text-4xl mt-6 lg:mt-0 xl:text-5xl text-black font-primary font-black">
            Kickstart Your IT Career Today
            <span className=""> Let’s Talk!</span>
          </h2>
          <p className="text-center mt-4 md:text-lg">
            We are here to answer all the queries you might have. Please select
            the segment we can help you with.
          </p>
        </div>
        <div className="flex-col flex lg:flex-row bg-white rounded-xl shadow-sm">
          <ContactForm />
          <ContactLabel />
        </div>
      </div>
    </div>
  )
}

export default ContactSection