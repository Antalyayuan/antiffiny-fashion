
import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ 
    children, 
    className = '', 
    id,
    title,
    titleClassName = 'text-3xl md:text-4xl font-bold text-center mb-4',
    subtitle,
    subtitleClassName = 'text-lg text-slate-600 text-center mb-10 md:mb-12 max-w-2xl mx-auto'
}) => {
  return (
    <section id={id} className={`py-12 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && <h2 className={titleClassName}>{title}</h2>}
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
