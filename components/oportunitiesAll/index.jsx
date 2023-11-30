import React from 'react';
import { useState } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-all.module.css';
import OportunitiesCard from '../../components/oportunitiesCard';
import OportunitiesHistory from '../../components/oportunitiesHistory';

const OportunitiesAll = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const oportunities = [
    {
      hot: 'cold',
      state: false,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
    },
    {
      hot: 'cold',
      state: false,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
    },
    {
      hot: 'hot',
      state: true,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
    },
  ];

  return (
    <>
      <div className={styles.oportunidades}>
        <div className={styles['card-container']}>
          {oportunities.map((oportunity, i) => (
            <OportunitiesCard
              key={i}
              hot={oportunity.hot}
              state={oportunity.state}
              image={oportunity.image}
              name={oportunity.name}
              location={oportunity.location}
              type={oportunity.type}
              followingDate={oportunity.followingDate}
            ></OportunitiesCard>
          ))}
        </div>
      </div>
      <div className={styles['wrap-right']}>
        <OportunitiesHistory></OportunitiesHistory>
      </div>
    </>
  );
};

export default OportunitiesAll;
