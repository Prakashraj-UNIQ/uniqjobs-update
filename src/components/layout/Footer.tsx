import Link from "next/link";
import { listCategories } from "@/data/blog";
import cardDetails from '@/content/courses/index.json'

const Footer = async () => {
  const data = await listCategories();
  return (
    <footer className=" relative bg-black text-white overflow-hidden">
      <div className="relative py-5 px-4 lg:px-24 sm:py-15">
        <h2 className="text-xl font-bold text-white underline mb-8">
          Available Branches.
        </h2>
        <div className="block lg:flex gap-18">
          <div className=" w-full grid grid-row-1 sm:grid-cols-2 lg:grid-cols-4 space-y-12 space-x-6">
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">Bangalore</h3>
              <p>@ Ground floor, No. 15/2-1, Christi Tower,
                The Grand Krishna Rooms, Pick N
                Save Super Market, Bengaluru, Karnataka 560068.</p>
            </div>
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">Coimbatore</h3>
              <p>74, 2nd St, opp. cristal icon gym, Kongu Nagar, Kallimadai,
                Ramanathapuram, Coimbatore, Tamil Nadu 641 045.</p>
            </div>
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">Madurai</h3>
              <p> Plot No 514, 11th East Cross St, New LIG Colony, Anna Nagar,
                Madurai, Tamil Nadu 625 020.</p>
            </div>
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">Trichy</h3>
              <p>RM88+CQV, 5th Cross St, Srinivase Nagar North, Srinivasa
                Nagar North, Thillai Nagar, Tiruchirappalli, Tamil Nadu 620
                017.</p>
            </div>
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">Salem</h3>
              <p>Door No:2, Backside of vinayaka vidyalaya school, Lakshmi
                Street, Arthanari Nagar, Fairlands, Salem, Tamil Nadu 636
                004.</p>
            </div>
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">puducherry</h3>
              <p>34, Bharathidasan St, Anandha Nagar, Kathirkamam,
                Puducherry, 605 009.</p>
            </div>
            <div className="space-x-3">
              <h3 className="text-lg font-bold text-white mb-1">Thirunelveli</h3>
              <p>Kulavanigarpuram, Shanthi Nagar, Tirunelveli, Tamil Nadu 627
                005.</p>
            </div>
          </div>
        </div>
        <div className=" pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"></div>
        <div className="block lg:flex gap-18">
          <div className=" w-full grid grid-row-1 sm:grid-cols-2 lg:grid-cols-4 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={"/"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/courses"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/blogs"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/students-review"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Students review
                  </Link>
                </li>
                <li>
                  <Link
                    href={"contact-us"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Contact Us
                  </Link>
                </li>
              </ul>
              <h3 className="text-lg font-semibold mb-6 relative inline-block mt-10">
                Placements & Facilities
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={"/placements/students-review"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Student Review
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Interview Questions
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Class Rooms
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Hostel Facilities
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                  >

                    Faq
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                Courses
              </h3>
              <ul className="space-y-3">
                {cardDetails.courses.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/courses/${item.slug}`}
                      className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                    >
                      {item.title}
                    </Link>
                  </li>

                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 relative inline-block">
                Top Trending Blogs
              </h3>
              <ul className="space-y-3">
                {data.data.map((item: string, ind: number) => (
                  <li key={ind}>
                    <Link
                      href={`/blogs/category?category=${decodeURIComponent(item)}`}
                      className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">
                Get in Touch
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="">
                    <p className="text-sm text-gray-300">Email</p>
                    <a
                      href="mailto:info@uniqtechnologies.co.in?subject=Hello&body=I%20want%20to%20contact%20you"
                      className="text-white hover:text-red-400 transition"
                    >
                      info@uniqtechnologies.co.in
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="">
                    <p className="text-sm text-gray-300">Phone</p>
                    <a
                      href="tel:+9600114466"
                      className="text-white hover:text-red-400 transition"
                    >
                      +91 96001 14466
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="">
                    <p className="text-sm text-gray-300">Main Branch Address</p>
                    <a
                      href="https://maps.app.goo.gl/thg9aZn4NXCxH1MR6?g_st=aw"
                      target="_blank"
                      className="text-white hover:text-red-400 transition"
                    >
                      #1 Shifa Arcade, 3rd Floor, Bharathi Nagar 1st Street, N
                      Usman Rd, T. Nagar, Chennai, TamilNadu 600 017.
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-base">
            &copy;{" "}
            <span id="year" className="text-red-400">
              2025
            </span>{" "}
            Uniq Jobs. All rights reserved.
          </p>
          <div className="flex flex-col mt-5 sm:mt-0 sm:flex-row space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer