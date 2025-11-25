
export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  details?: ServiceDetail[];
  image?: string;
}

export interface ServiceDetail {
  title: string;
  content: string;
  image?: string;
}

export interface CoreValue {
  image: string;
  title: string;
  }

export interface Product {
  name: string;
  image: string;
}

export interface WhyChooseUsPoint {
    title: string;
    description: string;
    icon?: React.ReactNode;
}
