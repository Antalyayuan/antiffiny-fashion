import React from 'react';
import { COLORS } from '../constants';

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconWrapperClassName?: string;
  onClick?: () => void;
  image?: string;
}

const Card: React.FC<CardProps> = ({ 
    icon, 
    title, 
    description, 
    className = '', 
    titleClassName = `text-xl font-semibold text-${COLORS.brandBlue} mb-2`,
    descriptionClassName = `text-sm text-${COLORS.textSecondary}`,
    iconWrapperClassName = `mb-4 inline-flex items-center justify-center p-3 rounded-full bg-${COLORS.brandGreen} text-white`,
    onClick,
    image
}) => {
  const cardBaseClasses = `bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full flex flex-col`;
  const interactiveClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`${cardBaseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-lg mb-4" />}
      {icon && (
        <div className={iconWrapperClassName}>
          {React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: 'h-6 w-6' })}
        </div>
      )}
      <h3 className={titleClassName}>{title}</h3>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
};

export default Card;