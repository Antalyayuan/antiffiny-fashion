
import type { NavItem } from './types';

export const COLORS = {
  brandBlue: 'indigo-700',
//   brandGreen: 'emerald-600',
  brandGreen: '[#81D8D0]',
  brandAccentGreen: 'lime-500',
  brandDark: 'slate-800',
  textPrimary: 'slate-700',
  textSecondary: 'slate-500',
  bgLight: 'gray-50',
  bgWhite: 'white',
  footerBg: '[#217280]',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Our Products', path: '/products' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
  
  {
    label: "My Orders",
    path: "/orders",
  },
  { label: 'User', path: '/user' } 
  
];

export const COMPANY_INFO = {
	name: "ANTIFFANY",
	tagline: "Your surest partner to a wealthier future",
	ceoName: "Abubakar Bello",
	contactEmail: "annie.wang@davethan.tech",
	phoneNumbers: [
		"+44 012 3456 789",
	],
	address:
		"Wing B, 2nd Floor, ULO Plaza, No. 34 Sokode Crescent, Wuse Zone 5, Abuja.",
	vision:
		"To become the trusted leader in transformative financial services that actively create a wealthier and secure future for all.",
	mission:
		"To deliver personalized, transparent, and innovative financial solutions that empower individuals and businesses to achieve lasting prosperity.",
};

// Wing B, second floor, ULO Plaza, No. 34 Sokode Crescent, Wuse Zone 5, Abuja.
