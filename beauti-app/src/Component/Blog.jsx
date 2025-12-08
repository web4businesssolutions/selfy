import React from "react";
import { ArrowRight } from "lucide-react";

const blogs = [
  {
    category: "Skincare",
    title: "Top 5 Facial Treatments for Glowing Skin",
    description:
      "Discover the most effective facial therapies offered by professional beauty parlors to rejuvenate your skin naturally.",
    author: "Simran Kaur",
    date: "10 July 2025",
    image: "/images/image/makeup23.jpeg",
  },
  {
    category: "Haircare",
    title: "Hair Spa vs. Keratin: What’s Right for You?",
    description:
      "We break down the differences between hair spa and keratin treatments to help you choose the best for your hair type.",
    author: "Ritika Sharma",
    date: "06 July 2025",
    image: "/images/image/makeup28.jpeg",
  },
  {
    category: "Makeup Tips",
    title: "Bridal Makeup Trends in 2025",
    description:
      "From dewy looks to bold eyes, check out the top makeup trends every bride should know before her big day.",
    author: "Ananya Mehta",
    date: "01 July 2025",
    image: "/images/image/makeup29.jpeg",
  },
];

const BlogCard = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-10 text-center text-gray-800">
          <span className="inline-block border-b-4 border-blue-500 rounded pb-2 mb-10">
            From The Beauty Blog
          </span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-5 pt-2 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-pink-600 uppercase">
                  {blog.category}
                </span>

                <h3 className="text-lg font-semibold text-gray-900 mt-2 flex items-center justify-between group">
                  <a href="#" className="hover:text-pink-600 transition">
                    {blog.title}
                  </a>
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-pink-600" />
                </h3>

                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  {blog.description}
                </p>

                <div className="flex items-center">
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-800">{blog.author}</p>
                    <p className="text-xs">{blog.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
