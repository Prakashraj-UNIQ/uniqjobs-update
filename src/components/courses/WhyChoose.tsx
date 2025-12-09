import WhyCard from '../ui/cards/WhyCard'

import React from 'react';


interface CardData {
  title: string;
  description: string;
  icon: string;
}

interface WhyChooseProps {
  cardData: CardData[];
}

const WhyChoose: React.FC<WhyChooseProps> = ({ cardData }) => {
  return (
    <div className="bg-brandAccent">
      <h2 className="text-2xl md:text-5xl text-center font-bold pt-10">Why Choose UNIQ?</h2>
      <div className="grid  sm:grid-cols-2 xl:grid-cols-4 py-10 gap-4 px-4 sm:px-10 xl:px-25">
        {cardData.map((card, index) => (
          <WhyCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;