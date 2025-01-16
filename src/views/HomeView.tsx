import { useRef } from 'react';
import HeroImage from '../assets/images/hero_img.jpg';
import AdvantagesCard from '../components/molecules/AdvantagesCard';
import Logo from '../components/molecules/Logo';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import Pharagrapf from '@/components/atoms/Pharagrapf';
import Accordion from '@/components/organisms/Accordion/Accordion';
import faqs from '@/assets/static_datas/faqs.json';

function HomeView() {
  const navigate = useNavigate();

  const featuresRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center md:container md:mx-auto bg-white">
      <section className="w-full bg-primary text-accent py-16 px-8">
        <div className="w-full flex flex-col gap-4 md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="p-2 text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text font-Poppins">
              Take Your Business to the Future!
            </h1>
            <Pharagrapf size="xl">
              Enhance the customer experience with the QR code-based online menu
              and ordering system. Manage all your orders easily, improve
              customer satisfaction, and speed up your operations.
            </Pharagrapf>
            <Pharagrapf size="base">
              Our restaurant management app boosts your business's speed and
              efficiency with a QR code-based online menu and ordering system.
              Gain more customer satisfaction and revenue with easy order
              management, real-time stock tracking, and advanced reporting
              tools.
            </Pharagrapf>
            <div className="flex justify-evenly lg:justify-center lg:gap-4 xl:gap-6 space-x-4">
              <Button
                text="Try It for Free"
                type="button"
                onBtnClick={() => navigate('/register')}
              />
              <Button
                text="Discover More"
                type="button"
                onBtnClick={() => {
                  console.log('scroll');
                  featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
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
      <div ref={featuresRef}></div>
      <section className="w-full text-white bg-gradient-to-r from-orange-500 to-red-600 py-12 px-8">
        <a id="features"></a>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-Poppins flex gap-2 justify-center">
            Why{' '}
            <span>
              <Logo />
            </span>
            ?
          </h2>

          <Pharagrapf size="base" colorClassName="text-white" className="mb-8">
            Modernize your restaurant operations and enhance customer
            satisfaction. Here are our key benefits:
          </Pharagrapf>
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
        <div className="w-full mx-auto ">
          <h2 className="flex justify-center items-center gap-1 text-xl sm:text-3xl xl:text-4xl font-semibold mb-2">
            <span className="text-center">Frequently Asked Questions</span>
            <FaRegQuestionCircle className="inline-block text-xl sm:text-3xl xl:text-4xl" />
          </h2>
          {/* FAQ Underline */}
          <div className="w-8/12 sm:w-9/12 lg:w-2/3 xl:w-2/4 border border-black rounded-md mx-auto mb-6"></div>
          {/* Accordion */}
          <Accordion data={faqs} />
        </div>
      </section>
    </div>
  );
}

export default HomeView;
