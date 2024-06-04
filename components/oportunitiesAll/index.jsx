import React from 'react';
import { useState, useEffect } from 'react';
import { openPopUp } from '../../redux/popUpOportunity';
import styles from './oportunities-all.module.css';
import OportunitiesCard from '../../components/oportunitiesCard';
import OportunitiesHistory from '../../components/oportunitiesHistory';
import { useDispatch, useSelector } from 'react-redux';
import { changeOpportunitySelected } from '../../redux/opportunitySelectedSlice';
import { changeUnitSelected } from '../../redux/unitSelectedSlice';
import { useRouter } from 'next/router';

const OportunitiesAll = ({
  oppList,
  setOppIsSelected,
  refreshFlag,
  setRefreshFlag,
  id,
}) => {
  // const { id } = useSelector((state) => state.userState);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [opportunitySelected, setOpportunitySelected] = useState(-1);
  const [oppSelectedObject, setOppSelectedObject] = useState({});
  const [opacityCards, setOpacityCards] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;
  const URLHash = asPath.split('#')[1];
  console.log('Lista de oportunidades:', oppList);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (URLHash) {
      const recentOppCreated = oppList.find(
        (opportunity) => Number(opportunity.idSaleOp) === Number(URLHash)
      );
      if (recentOppCreated) {
        const indexOpp = oppList.indexOf(recentOppCreated);
        handleItemClick(
          indexOpp,
          URLHash,
          recentOppCreated.idProperty,
          recentOppCreated.idProject,
          recentOppCreated,
          true
        );
        setOpacityCards((prevState) => true);
      }
    }
  }, [oppList]);

  useEffect(() => {
    console.log('UpdateIndex');
    setSelectedItem((prevState) => -1);
  }, [refreshFlag]);

  const [propsHistory, setPropsHistory] = useState({
    opportunitySelected,
    oppSelectedObject,
    setRefreshFlag: () => {
      setRefreshFlag();
    },
    setSelectedItemOpp: () => {
      setSelectedItem();
    },
    setOppIsSelected: () => {
      setOppIsSelected();
    },
  });

  const getUnitSelected = async (idProperty, projectId) => {
    console.log('id de la propiedad:', idProperty);
    console.log('id del proyecto:', projectId);
    const response = await fetch('/api/units', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        projectId,
        page: 1,
        rows: 100,
      }),
    });
    console.log('Unidades:', response);

    const units = await response.json();
    console.log('Unidadesaaaa:', units);

    const unitSelected = units.find((unit) => unit.idProperty === idProperty);

    console.log('Unidad seleccionada:', unitSelected);

    dispatch(changeUnitSelected(unitSelected));
  };

  const handleItemClick = (
    index,
    oppId,
    idProperty,
    projectId,
    opp,
    activeWithHash = false
  ) => {
    if (selectedItem === index && !activeWithHash) {
      setSelectedItem(-1);
      dispatch(changeOpportunitySelected(-1));
      setOppIsSelected(false);
      setOpportunitySelected(-1);
      setOppSelectedObject({});
      setOpacityCards((prevState) => false);
    } else {
      setSelectedItem(index);
      dispatch(changeOpportunitySelected(oppId));
      setOppIsSelected(true);
      setOpportunitySelected(oppId);
      getUnitSelected(idProperty, projectId);
      setOppSelectedObject(opp);
      if (!activeWithHash) {
        setOpacityCards((prevState) => false);
      }
    }
  };

  console.log('elemento seleccionado', selectedItem);

  function ClientById(array, clientId) {
    console.log('Clientes:', array);
    console.log('Clientes:', clientId);
    console.log(
      'Cliente encontrado:',
      array.find((elem) => elem.idCli === clientId)
    );
    return array.find((elem) => elem.idCli === clientId);
  }

  const oportunities = [
    {
      state: false,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'cold',
      progress: 0.4,
    },
    {
      state: false,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'warm',
      progress: 0.6,
    },
    {
      state: true,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'hot',
      progress: 0.8,
    },

    {
      closed: true,
      estimatedProgress: 0.85,
      image: '/images/perfil-img.jpeg',
      name: 'Fontana Campestre',
      location: 'Fontana Campestre',
      type: 'TIPO 1 - 302',
      followingDate: '23/05/23',
      temperature: 'hot',
      progress: 0.35,
    },
  ];

  return (
    <>
      <div className={styles.oportunidades}>
        <div className={styles['card-container']}>
          {console.log('')}
          {oppList && oppList.length > 0
            ? oppList.map(
                (oportunity, i) =>
                  Object.keys(oportunity).length > 3 &&
                  (oportunity.stageCycleSaleOp === 'Oportunidad' ||
                    oportunity.stageCycleSaleOp === 'Prospecto' ||
                    oportunity.stageCycleSaleOp === 'Separacion') && (
                    <div
                      style={{
                        opacity: opacityCards
                          ? Number(URLHash === oportunity.idSaleOp)
                            ? '1'
                            : '0.6'
                          : '1',
                      }}
                      className={styles['card-unit-list']}
                      key={oportunity.idSaleOp}
                      onClick={() =>
                        handleItemClick(
                          i,
                          oportunity.idSaleOp,
                          oportunity.idProperty,
                          oportunity.idProject,
                          oportunity
                        )
                      }>
                      <OportunitiesCard
                        closed={oportunity.image}
                        estimatedProgress={oportunity.estimatedProgress}
                        state={selectedItem === i}
                        image={
                          oportunity.idClient.image &&
                          (oportunity.idClient.image[0] &&
                          oportunity.idClient.image[0] !== ''
                            ? `${oportunity.idClient.image[0].url}`
                            : '/images/defatult-2.jpg')
                        }
                        name={oportunity.nameCustomer}
                        location={oportunity.nameProject}
                        type={`Tipo ${oportunity.propertyType.propertyType} - ${oportunity.idProperty}`}
                        followingDate={oportunity.createdDate}
                        progress={oportunity.temperature / 100}
                        temperature={'cold'} // hot warm cold
                        opportunitySelected={opportunitySelected}
                        oppSelectedObject={oppSelectedObject}
                        setRefreshFlag={setRefreshFlag}
                        setSelectedItemOpp={setSelectedItem}
                        setOppIsSelected={setOppIsSelected}
                      />
                    </div>
                  )
              )
            : ''}
        </div>
      </div>
      <div className={styles['wrap-right']}>
        {selectedItem !== -1 && !isMobile && (
          <OportunitiesHistory
            opportunitySelected={opportunitySelected}
            oppSelectedObject={oppSelectedObject}
            setRefreshFlag={setRefreshFlag}
            setSelectedItemOpp={setSelectedItem}
            setOppIsSelected={setOppIsSelected}
            id={id}
          />
        )}
      </div>
    </>
  );
};

export default OportunitiesAll;
