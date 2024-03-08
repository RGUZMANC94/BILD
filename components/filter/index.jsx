import React, { use, useState, useEffect } from 'react';
import styles from './filter.module.css';
import { Range, getTrackBackground } from 'react-range';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProjects,
  setFilteredList,
  onFilter,
} from '../../redux/projectSlice';
const Filter = ({ show, setShowFilter }) => {
  const { id } = useSelector((state) => state.userState);
  const { projectsList } = useSelector((state) => state.projectState);

  const [minSize, setMinSize] = useState(
    projectsList.length > 0
      ? Math.min(...projectsList.map((project) => project.minSize))
      : 45
  );
  const [maxSize, setMaxSize] = useState(
    projectsList.length > 0
      ? Math.max(...projectsList.map((project) => project.maxSize))
      : 1200
  );
  const [minPrice, setMinPrice] = useState(
    projectsList.length > 0
      ? Math.min(...projectsList.map((project) => project.minPrice))
      : 45
  );
  const [maxPrice, setMaxPrice] = useState(
    projectsList.length > 0
      ? Math.max(...projectsList.map((project) => project.maxPrice))
      : 1200
  );
  // const [minFloor, setMinFloor] = useState(
  //   projectsList.length > 0
  //     ? Math.min(...projectsList.map((project) => project.minPrice))
  //     : 45
  // );
  // const [maxFloor, setMaxFloor] = useState(
  //   projectsList.length > 0
  //     ? Math.max(...projectsList.map((project) => project.maxPrice))
  //     : 1200
  // );

  const [rangeSliders, setReangeSlider] = useState([
    {
      type: 'price',
      min: minPrice,
      max: maxPrice,
      step: 800,
    },
    {
      type: 'floor',
      min: 1,
      max: 22,
      step: 1,
    },
    {
      type: 'size',
      min: minSize,
      max: maxSize,
      step: 5,
    },
  ]);

  const [firstRender, setFirstRender] = useState(true);
  const [priceValues, setPriceValues] = useState([minPrice, maxPrice]);
  const [floorValues, setFloorValues] = useState([1, 21]);
  const [sizeValues, setSizeValues] = useState([minSize, maxSize]);
  const [locationSelected, setLocationSelected] = useState('');
  const [bedSelected, setBedSelected] = useState(1);
  const [bathSelected, setBathSelected] = useState(1);

  useEffect(() => {
    if (firstRender) {
      if (projectsList.length) {
        setMinSize(Math.min(...projectsList.map((project) => project.minSize)));

        setMaxSize(Math.max(...projectsList.map((project) => project.maxSize)));

        setMinPrice(
          Math.min(...projectsList.map((project) => project.minPrice))
        );

        setMaxPrice(
          Math.max(...projectsList.map((project) => project.maxPrice))
        );

        const newRangeSliders = rangeSliders.map((range) => {
          switch (range.type) {
            case 'price':
              return {
                ...range,
                min: Math.min(
                  ...projectsList.map((project) => project.minPrice)
                ),
                max: Math.max(
                  ...projectsList.map((project) => project.maxPrice)
                ),
              };
            case 'floor':
              return { ...range, min: 1, max: 22 };
            case 'size':
              return {
                ...range,
                min: Math.min(
                  ...projectsList.map((project) => project.minSize)
                ),
                max: Math.max(
                  ...projectsList.map((project) => project.maxSize)
                ),
              };
            default:
              return range;
          }
        });
        const newPriceValues = [
          Math.min(...projectsList.map((project) => project.minPrice)),
          Math.max(...projectsList.map((project) => project.maxPrice)),
        ];
        const newFloorValues = [1, 22];
        const newSizeValues = [
          Math.min(...projectsList.map((project) => project.minSize)),
          Math.max(...projectsList.map((project) => project.maxSize)),
        ];
        setPriceValues([...newPriceValues]);
        setFloorValues([...newFloorValues]);
        setSizeValues([...newSizeValues]);
        setReangeSlider(newRangeSliders);
        setFirstRender(false);
      }
    }
  }, [projectsList]);

  const dispatch = useDispatch();

  const filterProjects = async () => {
    try {
      const response = await fetch('/api/filterProjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          minPrice: priceValues[0],
          maxPrice: priceValues[1],
          minFloor: floorValues[0],
          maxFloor: floorValues[1],
          minSize: sizeValues[0],
          maxSize: sizeValues[1],
          minBeds: bedSelected,
          maxBeds: 99,
          minBaths: bathSelected,
          maxBaths: 99,
          locationSelected,
          projectId: '',
          id,
        }),
      });
      if (!response.ok) {
        throw new Error('Bad response from server');
      }
      const leakedProjects = await response.json();
      console.log(leakedProjects);
      dispatch(
        setFilteredList(
          leakedProjects.filter((proj) => Object.keys(proj).length >= 3)
        )
      );
      dispatch(onFilter(true));
    } catch (error) {
      console.error('Error al Establecer filtro:', error);
    }
  };

  const clearFilter = () => {
    dispatch(onFilter(false));
    dispatch(setFilteredList([]));
  };

  const setFilter = () => {
    filterProjects();
    setTimeout(() => {
      setShowFilter(false);
    }, 500);
  };

  if (!projectsList.length) {
    return <></>;
  }

  return (
    <div className={`${styles.filterPopUp} ${show ? styles.active : ''}`}>
      <div
        className={styles.filterBackground}
        onClick={() => {
          setShowFilter(false);
        }}></div>
      <div className={styles.wrapperFilter}>
        <div
          className={`${styles.closeFilter} bg-ct`}
          onClick={() => {
            setShowFilter(false);
          }}></div>

        <div className={styles.filterGroups}>
          <div
            className={`${styles.filterGroup} ${styles.filterGroupUbication}`}>
            <label htmlFor={styles.labelFilter}>
              <span className={styles.labelText}>Ubicación:</span>
              <select
                onChange={(e) => {
                  setLocationSelected(e.target.value);
                }}
                value={0}
                defaultValue={0}
                className={styles.ubicationSelect}>
                <option value={0} disabled hidden selected></option>
                <option value={0}>Fontana Campestre</option>
                <option value={1}>La florida</option>
                <option value={2}>Campo alegre</option>
                <option value={3}>La florida II</option>
                <option value={4}>Fortaleza</option>
                <option value={5}>Fortaleza II</option>
              </select>
            </label>
          </div>

          {rangeSliders.map((rangeSlider, i) => (
            <div
              key={i}
              className={`${styles.filterGroup} ${styles.filterGroupPrice}`}>
              <span className={`${styles.labelText} ${styles.labelTextRange}`}>
                {rangeSlider.type === 'price' && 'Precio'}
                {rangeSlider.type === 'floor' && 'Piso'}
                {rangeSlider.type === 'size' && 'Área'}:
              </span>
              <Range
                step={rangeSlider.step}
                min={rangeSlider.min}
                max={rangeSlider.max}
                values={
                  rangeSlider.type === 'price'
                    ? priceValues
                    : rangeSlider.type === 'floor'
                      ? floorValues
                      : sizeValues
                }
                onChange={(values) => {
                  switch (rangeSlider.type) {
                    case 'price':
                      setPriceValues(values);
                      break;

                    case 'floor':
                      setFloorValues(values);
                      break;
                    case 'size':
                      setSizeValues(values);
                      break;
                  }
                }}
                renderTrack={({ props, children }) => (
                  <div
                    className={styles.rangeTrack}
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                    }}>
                    <div
                      ref={props.ref}
                      style={{
                        height: '5px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values:
                            rangeSlider.type === 'price'
                              ? priceValues
                              : rangeSlider.type === 'floor'
                                ? floorValues
                                : sizeValues,
                          colors: ['#fff', '#FF5567', '#fff'],
                          min: rangeSlider.min,
                          max: rangeSlider.max,
                          rtl: false,
                        }),
                        alignSelf: 'center',
                      }}>
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '15px',
                      width: '15px',
                      borderRadius: '50%',
                      backgroundColor: '#FF5567',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                )}
              />

              <div className={`${styles.labelsRangeSlider} flex j-sb a-c`}>
                <div className={`${styles.minLabel}`}>
                  {rangeSlider.type === 'price' &&
                    `$${priceValues[0]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
                  {rangeSlider.type === 'floor' && floorValues[0]}
                  {rangeSlider.type === 'size' && sizeValues[0]}
                </div>
                <div className={`${styles.maxLabel}`}>
                  {rangeSlider.type === 'price' &&
                    `$${priceValues[1]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
                  {rangeSlider.type === 'floor' && floorValues[1]}
                  {rangeSlider.type === 'size' && sizeValues[1]}
                </div>
              </div>
            </div>
          ))}

          <div
            className={`${styles.filterGroup} ${styles.filterGroupDrops} flex j-sb a-s`}>
            <div className={`${styles.dropDownGrpup}`}>
              <label htmlFor={styles.labelFilter}>
                <span className={styles.labelText}>HABITACIONES:</span>
                <select
                  defaultValue={'default'}
                  value={'default'}
                  onChange={(e) => {
                    setBedSelected(e.target.value);
                  }}
                  className={styles.ubicationSelect}>
                  <option value={'default'} selected>
                    1+
                  </option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                  <option value={6}>6+</option>
                </select>
              </label>
            </div>
            <div className={`${styles.dropDownGrpup}`}>
              <label htmlFor={styles.labelFilter}>
                <span className={styles.labelText}>BAÑOS:</span>
                <select
                  defaultValue={'default'}
                  value={'default'}
                  onChange={(e) => {
                    setBathSelected(e.target.value);
                  }}
                  className={styles.ubicationSelect}>
                  <option value={'default'} selected>
                    1+
                  </option>
                  <option value={2}>2+</option>
                  <option value={3}>3+</option>
                  <option value={4}>4+</option>
                  <option value={4}>4+</option>
                  <option value={5}>5+</option>
                  <option value={6}>6+</option>
                </select>
              </label>
            </div>
          </div>

          <div className={`${styles.buttonsFilter} flex j-c a-c column`}>
            <Button
              buttonType="secondary"
              label="Filtrar"
              classNameInherit="buttonsFilter"
              clickFunction={setFilter}
            />
            <Button
              buttonType="primary"
              label="Borrar"
              classNameInherit="buttonsFilter"
              className={styles['filter-buttons-bottom']}
              clickFunction={clearFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
