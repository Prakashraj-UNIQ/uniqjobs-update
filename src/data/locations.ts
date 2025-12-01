const allCourses = [
  {
    title: "Java Full Stack Developer",
    subtitle: "Massive job openings in MNCs. Get placed with in-demand skills",
    icon: "/svg/courses/java.svg",
  },
  {
    title: "Python Full Stack Developer",
    subtitle:
      "Huge demand in startups & AI-driven companies worldwide and growing.",
    icon: "/svg/courses/python.svg",
  },
  {
    title: "Dotnet Fullstack Development",
    subtitle: "Strong demand in banking, healthcare, and ERP sectors",
    icon: "/svg/courses/dotnet.svg",
  },
  {
    title: "Data Engineering",
    subtitle: "Moderate job openings across MNCs and product teams",
    icon: "/svg/courses/dataEngineering.svg",
  },
  {
    title: "IT Production Support",
    subtitle:
      "Great for those looking to build stability before switching roles",
    icon: "/svg/courses/production.svg",
  },
  {
    title: "DevOps/Amazon Web Services",
    subtitle:
      "Excellent for candidates with gaps or domain switchers seeking growth",
    icon: "/svg/courses/devops.svg",
  },
  {
    title: "Cyber Security",
    subtitle:
      "High demand for security analysts and ethical hackers across enterprises",
    icon: "/svg/courses/cyber.svg",
  },
  {
    title: "Generative AI",
    subtitle:
      "Learn AI models, prompt engineering, and build AI-powered applications",
    icon: "/svg/courses/ai.svg",
  },
  {
    title: "MLOps",
    subtitle:
      "Deploy and manage machine learning models in production efficiently",
    icon: "/svg/courses/mlops.svg",
  },
  {
    title: "Data Science",
    subtitle:
      "Become a data scientist by mastering statistics, ML, and data visualization",
    icon: "/svg/courses/dataScience.svg",
  },
  {
    title: "Data Analysis",
    subtitle:
      "Learn data manipulation, reporting, and insights using Python & Excel",
    icon: "/svg/courses/dataAnalysis.svg",
  },
  {
    title: "Power BI",
    subtitle:
      "Business intelligence and visualization using Microsoft Power BI",
    icon: "/svg/courses/powerbi.svg",
  },
  {
    title: "Digital Marketing",
    subtitle: "Master SEO, SEM, social media marketing, and online campaigns",
    icon: "/svg/courses/marketing.svg",
  },
  {
    title: "Cloud Fundamentals",
    subtitle:
      "Learn cloud computing concepts and deploy applications using AWS/Azure",
    icon: "/svg/courses/cloud.svg",
  },
  {
    title: "SQL & UNIX",
    subtitle: "Master database management, queries, and UNIX shell scripting",
    icon: "/svg/courses/sqlunix.svg",
  },
];

function pickRandomCourses() {
  const shuffled = [...allCourses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

const locations = {
  chennai: {
    state: "Tamil Nadu",
    href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.773510231972!2d80.23149517454776!3d13.050083713153818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266fa6504c907%3A0x8ae5146ec085a6a2!2sUNIQ%20technologies!5e0!3m2!1sen!2sin!4v1763186147089!5m2!1sen!2sin",
    location:
      "#1 Shifa Arcade, 3rd Floor, Bharathi Nagar 1st Street, N.Usman Rd, T. Nagar, Chennai, TamilNadu 600 017.",
    courses: pickRandomCourses(),
  },

  coimbatore: {
    state: "Tamil Nadu",
    href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5679961812903!2d77.00251759999999!3d10.9959445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ddb298c84b%3A0x4ab04c13fff8a8b2!2sUNIQ%20Technologies%20%E2%80%93%20Software%20Training%20Institute%20in%20Coimbatore%20with%20100%25%20Placement!5e0!3m2!1sen!2sin!4v1763186098096!5m2!1sen!2sin",
    location:
      "74, 2nd St, opp. cristal icon gym, Kongu Nagar, Kallimadai, Ramanathapuram, Coimbatore, Tamil Nadu 641 045.",
    courses: pickRandomCourses(),
  },

  madurai: {
    state: "Tamil Nadu",
    href: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31440.633714140844!2d78.1071629!3d9.9273609!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x62191400bb2e4ed7%3A0x527d87c81b1df4dc!2sUniq%20technologies%20-%20Madurai!5e0!3m2!1sen!2sin!4v1763185748251!5m2!1sen!2sin",
    location:
      "Plot No 514, 11th East Cross St, New LIG Colony, Anna Nagar, Madurai, Tamil Nadu 625 020.",
    courses: pickRandomCourses(),
  },

  tirunelveli: {
    state: "Tamil Nadu",
    href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.8376995675103!2d77.72507569999999!3d8.7069581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b041215d2e6d121%3A0xbf2fa3cb7944df79!2sUNIQ%20Technologies%20%E2%80%93%20Software%20Training%20Institute%20in%20Tirunelveli%20with%20Placement!5e0!3m2!1sen!2sin!4v1763186028967!5m2!1sen!2sin",
    location:
      "Kulavanigarpuram, Shanthi Nagar, Tirunelveli, Tamil Nadu 627 005.",
    courses: pickRandomCourses(),
  },

  salem: {
    state: "Tamil Nadu",
    href: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3907.3013391292025!2d78.1387673!3d11.6730432!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1e9dd9e8d51%3A0xc8ed53ff49e5b20f!2sUniq%20Technologies%20Salem!5e0!3m2!1sen!2sin!4v1763185986303!5m2!1sen!2sin",
    location:
      "Door No:2, Backside of vinayaka vidyalaya school, Lakshmi Street, Arthanari Nagar, Fairlands, Salem, Tamil Nadu 636 004.",
    courses: pickRandomCourses(),
  },

  Puducherry: {
    state: "Puducherry",
    href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.433801264713!2d79.79121087453196!3d11.944438636565991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361379bbc3917%3A0xae68d0e221ab47e8!2sUniq%20Technologies%20-%20puducherry!5e0!3m2!1sen!2sin!4v1763372391295!5m2!1sen!2sin",
    location:
      "34, Bharathidasan St, Anandha Nagar, Kathirkamam, Puducherry, 605 009.",
    courses: pickRandomCourses(),
  },

  bangalore: {
    state: "Karnataka",
    href: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62209.24129155943!2d77.5375864!3d12.9668874!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15a08eb4e447%3A0xf14737174dbc7b6f!2sUNIQ%20Technologies!5e0!3m2!1sen!2sin!4v1763185805423!5m2!1sen!2sin",
    location:
      "@ Ground floor, No. 15/2-1, Christi Tower, Hosur Main Road, Madiwala Underpass, Opp. to The Grand Krishna Rooms, Pick NSave Super Market, Bengaluru, Karnataka 560068.",
    courses: pickRandomCourses(),
  },
  trichy: {
    state: "Tamil Nadu",
    href: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1998649.1161362107!2d77.2985685!3d11.9320986!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5864fc53433%3A0xcce57f38662950e5!2sUniq%20Technologies%20Trichy%20(%20Training%20and%20Placements%20)!5e0!3m2!1sen!2sin!4v1763232294946!5m2!1sen!2sin",
    location:
      "RM88+CQV, 5th Cross St, Srinivase Nagar North, Srinivasa Nagar North, Thillai Nagar, Tiruchirappalli, Tamil Nadu 620 017.",
    courses: pickRandomCourses(),
  },
};

export default locations;
