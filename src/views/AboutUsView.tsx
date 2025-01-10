import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center py-10 md:mx-auto">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Welcome to{' '}
          <span className="font-semibold text-gray-800">RestoManage</span>, your
          one-stop solution for modern restaurant management. We are here to
          empower your business with the best tools for success.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className="w-full max-w-6xl mt-10 px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="/assets/our-mission.jpg"
            alt="Our Mission"
            className="w-full rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At{' '}
              <span className="font-semibold text-gray-800">RestoManage</span>,
              our mission is to simplify the complexities of running a
              restaurant by providing innovative, user-friendly, and powerful
              tools for restaurant owners and managers. We believe in creating
              technology that serves the people behind the counter and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="w-full max-w-6xl mt-16 px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800">Our Team</h2>
          <p className="text-gray-600 mt-3">
            Meet the passionate individuals driving RestoManage's success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member */}
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <img
              src="/assets/team-member-1.jpg"
              alt="John Doe"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          {/* Team Member */}
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <img
              src="/assets/team-member-2.jpg"
              alt="Jane Smith"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
            <p className="text-gray-600">CTO & Lead Developer</p>
          </div>
          {/* Team Member */}
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            <img
              src="/assets/team-member-3.jpg"
              alt="Michael Johnson"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Michael Johnson
            </h3>
            <p className="text-gray-600">Marketing Manager</p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="w-full max-w-6xl mt-16 px-4 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-3">
            Have questions? Reach out to us, and we’d be happy to help.
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600">
            Email:{' '}
            <a href="mailto:info@restomanage.com" className="text-indigo-600">
              info@restomanage.com
            </a>
          </p>
          <p className="text-gray-600 mt-2">
            Phone:{' '}
            <a href="tel:+123456789" className="text-indigo-600">
              +1 (234) 567-89
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
