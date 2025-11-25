import React from "react";
import PageHeader from "../components/PageHeader";
import SectionContainer from "../components/SectionContainer";
import { COLORS } from "../constants";
import type { WhyChooseUsPoint } from "../types";
import investmentImage from "../assets/images/fund.jpg";
import aboutImage from "../assets/images/aboutBg.jpg";
import {
  CheckCircleIcon,
  CogIcon,
  UsersIcon,
  CollectionIcon,
  LightBulbIcon,
} from "../components/IconComponents";

const whyChooseUsData: WhyChooseUsPoint[] = [
  {
    icon: <CheckCircleIcon />,
    title: "Regulatory Compliance",
    description:
      "ZZZ Financial Services is duly registered, licensed, and in good standing with regulatory authorities. Your investments and financial activities are secure and compliant.",
  },
  {
    icon: <CogIcon />,
    title: "Risk Management",
    description:
      "We comply with ICT, Cybersecurity, and Data Protection best practices, ensuring your data and assets are managed with utmost care and security.",
  },
  {
    icon: <UsersIcon />,
    title: "End-to-End Support",
    description:
      "ZZZ Financial Services employs a team of diverse professionals to provide support at all levels and across products. We are with you every step of the way.",
  },
  {
    icon: <CollectionIcon />,
    title: "Diverse Product Offering",
    description:
      "We offer a wide range of solutions across Saving, Investment, and Credit, tailored to meet your unique financial needs and goals.",
  },
  {
    icon: <LightBulbIcon />,
    title: "Trust & Transparency",
    description:
      "Our financial services are built on trust, integrity, and transparency. We believe in open communication and ethical practices.",
  },
];

const WhyChooseUsPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Why Choose ZZZ Financial Services Finance?"
        subtitle="Selecting a financial partner is a critical decision. Discover why ZZZ Financial Services is the partner of choice for your financial objectives."
        imageSeed="trust-handshake"
        image={aboutImage}
      />

      <SectionContainer className={`bg-${COLORS.bgWhite} py-16`}>
        <div className="max-w-3xl mx-auto text-center mb-12 px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-${COLORS.brandDark} mb-6`}>
            Why Clients Choose Us
          </h2>
          <p className={`text-lg text-${COLORS.textSecondary} leading-relaxed`}>
            Selecting a financial partner to support your saving, investing, and
            financing objectives is a critical decision. ZZZ Financial Services
            Finance Company is a partner of choice because our services are
            built on trust, integrity, and transparency—values we live by.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-4 sm:px-6 lg:px-8">
          {whyChooseUsData.map((point, index) => (
            <div
              key={index}
              className={`
                w-full
                sm:w-[calc(50%-1rem)] 
                lg:w-[calc(33.333%-1rem)]
                max-w-[400px]
                p-6 
                rounded-xl 
                shadow-lg 
                hover:shadow-2xl 
                transition-all 
                duration-300 
                ease-in-out 
                bg-gradient-to-br 
                from-${COLORS.brandGreen} 
                to-emerald-700 
                text-white 
                flex 
                flex-col 
                items-center 
                text-center
              `}
            >
              <div className="mb-5 p-4 bg-white/20 rounded-full">
                {React.cloneElement(
                  point.icon as React.ReactElement<
                    React.SVGProps<SVGSVGElement>
                  >,
                  {
                    className: "h-10 w-10 text-white",
                  }
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className={`bg-${COLORS.bgLight} py-20`}>
        <div className="grid md:grid-cols-2 gap-10 items-center px-4 sm:px-6 lg:px-8">
          <div>
            <img
              src={investmentImage}
              alt="Client Success"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div className="prose prose-slate max-w-none">
            <h2 className={`text-3xl font-bold text-${COLORS.brandDark} mb-4`}>
              Our Commitment to You
            </h2>
            <p>
              At ZZZ Financial Services Finance, we are more than just a
              financial institution; we are your partners in prosperity. We are
              committed to understanding your unique circumstances and
              aspirations, providing personalized advice and solutions that
              empower you to make informed financial decisions.
            </p>
            <p>
              Our experienced team leverages deep market insights and a
              client-first approach to ensure your financial well-being. We
              strive for excellence in every interaction, building long-lasting
              relationships based on mutual trust and shared success.
            </p>
            <a
              href="#/contact"
              className={`mt-6 inline-block px-6 py-3 bg-${COLORS.brandGreen} text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-md no-underline`}
            >
              Partner With Us Today
            </a>
          </div>
        </div>
      </SectionContainer>
    </>
  );
};

export default WhyChooseUsPage;
