import React from "react";
import Hero from "../components/Hero";
import SectionContainer from "../components/SectionContainer";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { COLORS } from "../constants";
import type { CoreValue, Service } from "../types";
import {
  LightBulbIcon,
  UsersIcon,
  ScaleIcon,
  CheckCircleIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "../components/IconComponents";
import aboutImage from "../assets/images/about.jpg";
import africaImage from "../assets/images/africa.jpg";
import moneyImage from "../assets/images/money.png";
const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default HomePage;
