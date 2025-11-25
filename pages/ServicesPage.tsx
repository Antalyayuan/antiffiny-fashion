
import React from 'react';
import PageHeader from '../components/PageHeader';
import SectionContainer from '../components/SectionContainer';
import type { Service, ServiceDetail } from '../types';
import { COLORS } from '../constants';
import { CurrencyDollarIcon, BriefcaseIcon, CogIcon, ChartBarIcon, UsersIcon } from '../components/IconComponents';

import loanImage from "../assets/images/business.jpeg";
import businessImage from "../assets/images/business.jpg";
import investmentImage from "../assets/images/fund.jpg";
import debtImage from "../assets/images/debt.jpg";
import consultancyImage from "../assets/images/consult.jpg";
import aboutImage from "../assets/images/aboutBg.jpg";

const servicesData: Service[] = [
	{
		id: "consumer-loans",
		icon: <CurrencyDollarIcon />,
		title: "Consumer Loans",
		description:
			"We offer consumer credit facilities that enable our clients to make essential high-value purchases, including electronics, home appliances, and work-related equipment without disrupting their cashflow.",
		image: loanImage,
		details: [
			{
				title: "Fixed Term Loans",
				content:
					"Short-term facilities to meet financial obligations at competitive interest rates.",
			},
			{
				title: "Structured Facilities",
				content:
					"Bespoke credit facilities are designed to meet unique cash flow and operational needs.",
			},
			{
				title: "Pay-Day Loans",
				content:
					"Credit facilities enable salary earners to leverage their cash flow to achieve more.",
			},
			{
				title: "Proof of Funds",
				content:
					"Numerous institutions and agencies ask for proof of funds for purposes such as education, migration, and medical travel. We offer our clients the opportunity to utilize their investment status, credit history, and partnership with ZZZ Financial Services Finance Company Limited to satisfy the Proof of Fund criteria set by different agencies. The ZZZ Financial Services Finance Company's proof of fund service provides flexibility to seize opportunities as they present themselves.",
			},
		],
	},
	{
		id: "business-finance",
		icon: <BriefcaseIcon />,
		title: "Business Finance Solutions",
		description:
			"We offer a range of solutions for MSMEs to manage working capital needs.",
		image: businessImage,
		details: [
			{
				title: "Asset Finance",
				content:
					"Finance Lease and Hire Purchase solutions for MSMEs to acquire necessary equipment & machinery.",
			},
			{
				title: "Project Finance",
				content:
					"Structured facilities to enable MSMEs to execute projects with clear cash flows & milestones.",
			},
			{
				title: "Debt Structuring",
				content:
					"Restructure existing credit facilities to optimize cash flow.",
			},
			{
				title: "Local & International Trade Finance",
				content:
					"Trade finance facility to enable businesses to harness viable opportunities without the constraint of funding.",
			},
			{
				title: "Warehouse Finance Receipts",
				content:
					"Offers dedicated or shared design teams for flexibility. (Note: Original text used. This finances goods held in a warehouse using warehouse receipts as collateral).",
			},
		],
	},
	{
		id: "debt-services",
		icon: <CogIcon />,
		title: "Debt Services",
		description:
			"We offer value-added credit-related solutions to businesses to manage debt exposures.",
		image: debtImage,
		details: [
			{
				title: "Debt Securitization",
				content:
					"Creation of investable instruments from existing credit facilities.",
			},
			{
				title: "Debt Administration",
				content:
					"This solution enables clients to empower ZZZ Financial Services to manage their finances.",
			},
			{
				title: "Debt Factoring",
				content:
					"Leverage receivables to unlock cash flow to meet business needs.",
			},
		],
	},
	{
		id: "fund-management",
		icon: <ChartBarIcon />,
		title: "Fund Management",
		description:
			"Our investment products provide flexible savings and investment options to enable individuals and businesses to gain competitive returns on idle funds.",
		image: investmentImage,
		details: [
			{
				title: "Fixed Placement",
				content:
					"Flexible Savings Option at Competitive Rates.",
			},
			{
				title: "Fund Management (Service)",
				content:
					"Leverage our team of professionals to manage and deploy your capital.",
			},
			{
				title: "Structured Facilities (Investment)",
				content:
					"Leverage investment positions to access credit facilities at competitive rates.",
			},
		],
	},
	{
		id: "consultancy",
		icon: <UsersIcon />,
		title: "Financial Consultancy",
		description:
			"Our team offers financial consultancy to MSMEs to optimize cash flow and finance needs.",
		image: consultancyImage,
		details: [
			{
				title: "MSME Consultancy",
				content:
					"Expert advice and strategies for Micro, Small, and Medium Enterprises.",
			},
			{
				title: "Loan Syndication",
				content:
					"Arranging and structuring syndicated loans for large financing needs.",
			},
			{
				title: "Covered Bonds",
				content:
					"Advisory on issuance and management of covered bonds.",
			},
		],
	},
];

const ServiceDetailCard: React.FC<ServiceDetail & { index: number }> = ({ title, content, image, index }) => (
  <div className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${index % 2 === 0 ? `bg-${COLORS.bgLight}` : `bg-${COLORS.bgWhite}`}`}>
    {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-md mb-4"/>}
    <h4 className={`text-xl font-semibold text-${COLORS.brandGreen} mb-2`}>{title}</h4>
    <p className={`text-${COLORS.textSecondary} text-sm text-justify`}>{content}</p>
  </div>
);


const ServicesPage: React.FC = () => {
  return (
		<>
			<PageHeader
				title='Our Services'
				subtitle='ZZZ Financial Services Finance Company Limited provides a range of Savings, Investment, and Credit solutions designed to help individuals, households, and businesses manage their cashflows effectively and achieve their financial goals.'
				imageSeed='services-banner'
				image={aboutImage}
			/>

			{servicesData.map(
				(serviceCategory, categoryIndex) => (
					<SectionContainer
						key={serviceCategory.id}
						title={serviceCategory.title}
						subtitle={serviceCategory.description}
						className={
							categoryIndex % 2 === 0
								? `bg-${COLORS.bgWhite}`
								: `bg-${COLORS.bgLight}`
						}
						id={serviceCategory.id}
					>
						{serviceCategory.image && (
							<div className='mb-12'>
								<img
									src={serviceCategory.image}
									alt={serviceCategory.title}
									className='w-full max-h-98 object-cover rounded-lg shadow-xl mx-auto'
								/>
							</div>
						)}
						{serviceCategory.details &&
							serviceCategory.details.length > 0 && (
								<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
									{serviceCategory.details.map(
										(detail, index) => (
											<ServiceDetailCard
												key={detail.title}
												{...detail}
												index={index}
											/>
										)
									)}
								</div>
							)}
					</SectionContainer>
				)
			)}
		</>
	);
};

export default ServicesPage;
