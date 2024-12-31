import { useState } from 'react';
import HeroImage from '../assets/images/hero_img.jpg';
import AdvantagesCard from '../components/AdvantagesCard';
import Logo from '../components/Logo';
function HomeView() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const faqs = [
    {
      question: 'How does the QR-based ordering system work?',
      answer:
        'Customers scan the QR code on their table to view the menu, place orders, and even make payments—all from their smartphones. It’s simple, fast, and hassle-free.',
    },
    {
      question: 'Can I customize the menu displayed to customers?',
      answer:
        'Yes! Admins can easily add, remove, or edit items in the menu via the dashboard, ensuring customers always see the latest options.',
    },
    {
      question: 'What kind of analytics does the dashboard provide?',
      answer:
        'The dashboard includes detailed reports on sales, revenue, top-performing items, and staff performance, presented with clear visualizations.',
    },
    {
      question: 'Is the system secure for customer data and transactions?',
      answer:
        'Absolutely. We use advanced encryption and secure authentication methods to protect all data and transactions.',
    },
    {
      question: 'Can I integrate this system with my existing POS?',
      answer:
        'Yes, our system supports integrations with popular POS platforms. Contact our support team for assistance with setup.',
    },
    {
      question: 'What happens if the internet goes down?',
      answer:
        'The system offers offline support for basic operations, ensuring your restaurant continues to function without interruptions.',
    },
  ];
  return (
    <div className="flex flex-col items-center md:container md:mx-auto bg-white">
      <section className="bg-primary text-accent py-16 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="p-2 text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text font-Poppins">
              Take Your Business to the Future!
            </h1>
            <h2 className="text-xl md:text-2xl text-neutralDark">
              Enhance the customer experience with the QR code-based online menu
              and ordering system. Manage all your orders easily, improve
              customer satisfaction, and speed up your operations.
            </h2>
            <p className="text-lg text-neutralDark">
              Our restaurant management app boosts your business's speed and
              efficiency with a QR code-based online menu and ordering system.
              Gain more customer satisfaction and revenue with easy order
              management, real-time stock tracking, and advanced reporting
              tools.
            </p>
            <div className="flex justify-evenly space-x-4">
              <a
                href="/signup"
                className=" text-white bg-gradient-to-r from-orange-500 to-red-600 py-2 px-5 rounded-lg shadow-lg hover:bg-accent"
              >
                Try It for Free
              </a>
              <a
                href="/features"
                className="text-white bg-gradient-to-r from-orange-500 to-red-600 py-2 px-5 rounded-lg shadow-lg hover:bg-neutralDark"
              >
                Discover More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={HeroImage}
              alt="Restaurant Management"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="text-white bg-gradient-to-r from-orange-500 to-red-600 py-12 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-Poppins flex gap-2 justify-center">
            Why{' '}
            <span>
              <Logo />
            </span>
            ?
          </h2>
          <p className="text-lg text-neutralDark mb-8">
            Modernize your restaurant operations and enhance customer
            satisfaction. Here are our key benefits:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AdvantagesCard
              title="Fast Order Management"
              desc="Take fast and easy orders with QR codes. Leave traditional methods behind!"
            />
            <AdvantagesCard
              title="Staff and Table Control"
              desc="Easily track staff performance and table statuses from a single screen."
            />
            <AdvantagesCard
              title="Online Menu and Digital Ordering"
              desc="Say goodbye to paper menus by offering an eco-friendly, modern solution."
            />
            <AdvantagesCard
              title="Powerful Analytics"
              desc="Analyze your sales and revenue with detailed charts and plan for growth."
            />
            <AdvantagesCard
              title="Easy Integration"
              desc="Integrate seamlessly into your business with our user-friendly interface and flexible structure."
            />
            <AdvantagesCard
              title="Target-Oriented Solutions"
              desc="Work with a customizable and expandable structure tailored to your business needs."
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-neutralLight py-12">
        <div className="w-full mx-auto px-4">
          <h2 className="text-3xl font-semibold text-neutralDark text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full bg-white shadow-lg rounded-lg">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left flex justify-between items-center p-4 font-medium text-neutralDark"
                >
                  {faq.question}
                  <span>{activeIndex === index ? '-' : '+'}</span>
                </button>
                {activeIndex === index && (
                  <div className="p-4 text-neutralDark border-t border-neutralLight">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeView;
