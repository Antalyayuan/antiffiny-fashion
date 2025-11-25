import React from "react";
import { COLORS } from "../constants";

interface PageHeaderProps {
	title: string;
	subtitle?: string;
	imageSeed?: string;
	image?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	subtitle,
	imageSeed = "abstract",
	image,
}) => {
	const imageUrl =
		image ||
		`https://picsum.photos/seed/${imageSeed}/1600/400`;

	return (
		<div
			className='relative bg-cover bg-center'
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			{/* Dark overlay */}
			<div
				className={`absolute inset-0 bg-${COLORS.brandDark} opacity-40`}
			></div>

			{/* Text content */}
			<div className='relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-white text-center'>
				<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3'>
					{title}
				</h1>
				{subtitle && (
					<p className='text-lg md:text-xl text-gray-200 max-w-2xl mx-auto'>
						{subtitle}
					</p>
				)}
			</div>
		</div>
	);
};

export default PageHeader;
