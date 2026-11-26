export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title:
      "Focused on Delivering Exceptional User Experience and Optimized Web Apps.",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "From sleek websites to dynamic web apps, everything is possible",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "Favorite Stack",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Download my resume",
    description: "",
    className: "text-slate-300 lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "w-[80%] mx-auto rounded-md",
    titleClassName: "justify-start",
    img: "/resume.png",
    spareImg: "",
  },

  {
    id: 5,
    title: "From GitHub",
    description: "Live Stats",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/github.svg",
    spareImg: "",
  },
  {
    id: 6,
    title: "Do you have a project or an idea? Let's talk !",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Nodes Unlimited LLC",
    des: "Domain Registeration, Hosting, and Web Development Company.",
    img: "/nu.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://nodesunlimited.com",
  },
  {
    id: 2,
    title: "Blooming Brands Inc",
    des: "Everything your business needs to grow online.",
    img: "/bb.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "http://blooming-brands.com",
  },
  {
    id: 3,
    title: "Hafez Design Studio",
    des: "A Startup Interior Design Studio Based in Toronto, Canada",
    img: "/hds.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://hafezdesignstudio.com/",
  },
  {
    id: 4,
    title: "Thackstone Realty Group",
    des: "Real Estate Blog for Thackston Realty Group SC/NC",
    img: "/trg.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://thackstonrealtygroup.com/",
  },
];

export const testimonials = [
  {
    quote:
      "Collaborating with Mohamed was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Mohamed's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Mohamed is the ideal partner.",
    name: "Ehab Hafez",
    title: "Interior Designer, Sheridan University Alumni",
    image: "/man.png",
  },
  {
    quote:
      "Working with Mohamed was an incredible experience. His professionalism, responsiveness, and commitment to excellence were apparent from start to finish. Mohamed’s passion for every aspect of the development process really sets him apart. If you're looking to take your website and brand to the next level, Mohamed is the perfect partner for the job.",
    name: "Frank Contrares",
    title: "Prestige Worldwide Limousine Service",
    image: "/man.png",
  },
  {
    quote:
      "Working with Mohamed was a fantastic experience. Their professionalism, communication, and commitment to achieving the best outcomes were clear throughout the entire process. Mohoamed’s dedication and attention to detail truly made a difference. If you’re looking for a trusted partner to guide you through your real estate journey, we highly recommend Mohamed.",
    name: "Kim Thackston",
    title: "Thackston Realty Group",
    image: "/woman.png",
  },
  // {
  //   quote:
  //     "Collaborating with Mohamed was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Mohamed's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Mohamed is the ideal partner.",
  //   name: "Michael Johnson",
  //   title: "Director of AlphaStream Technologies",
  // },
  // {
  //   quote:
  //     "Collaborating with Mohamed was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Mohamed's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Mohamed is the ideal partner.",
  //   name: "Michael Johnson",
  //   title: "Director of AlphaStream Technologies",
  // },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Full Stack Developer",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Infrastructure Engineer",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Developer",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Cloud Systems Engineer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/mhafez1978",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://x.com/BloomingBrands",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/blooming-brands/",
  },
];
