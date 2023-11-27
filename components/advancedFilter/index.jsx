import React, { useState } from "react";
import styles from "./advanced-filter.module.css";
import { Range, getTrackBackground } from "react-range";
import Button from "../button";

const advancedFilter = ({ show, setShowFilter }) => {

  const [isChecked, setIsChecked] = useState(false);

  /*const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };*/

  const [priceValues, setPriceValues] = useState([0, 3000000000]);
  const [stateValues, setStateValues] = useState([1, 100]);
 

  const rangeSliders = [
    {
      type: "state",
      min: 1,
      max: 100,
      step: 1,
    },
    {
      type: "price",
      min: 0,
      max: 3000000000,
      step: 5000000,
    },
    
  ];

  return (
    <div className={`${styles.filterPopUp} ${show ? styles.active : ""}`}>
      <div
        className={styles.filterBackground}
        onClick={() => {
          setShowFilter(false);
        }}
      ></div>
      <div className={styles.wrapperFilter}>
        <div
          className={`${styles.closeFilter} bg-ct`}
          onClick={() => {
            setShowFilter(false);
          }}
        ></div>

        <div className={styles.filterGroups}>

          <div
            className={styles["filterGroup"]}
          >
            <div className={styles["topClearText"]}>Limpiar</div>

          </div>
          
          <div
            className={styles["filterGroup"]}
          >
              <div className={styles.advancedSearch}>
              <input
                className={styles.advancedSearchInput}
                type="text"
                placeholder="Buscar Proyecto"
              />
              <div
                className={`${styles.glass} bg-ct`}
                onClick={() => setShowFilter(true)}
              ></div>
            </div>
          </div>

          <div className={styles["advancedDropdownTop"]}>
            <div className={styles["advancedDropdownText"]}>TIPO DE OPORTUNIDAD:</div>
            <div className={styles["advancedIconSelect"]}></div>
          </div>

          <div
            className={styles["filterGroup"]}
          >
            <div className={styles["advancedCheckContainer"]}>
              

                <input
                  type="checkbox"
                  id="checkbox"
                  className={styles.checkboxInput}
                />
                <label htmlFor="checkbox" className={styles.checkboxLabel}></label>
                <div className={styles.checkboxText}>Abiertas</div>

                <input
                  type="checkbox"
                  id="checkbox2"
                  className={styles.checkboxInput}
                />
                <label htmlFor="checkbox2" className={styles.checkboxLabel}></label>
                <div className={styles.checkboxText}>Cerradas</div>
            </div>
          </div>

          <div
            className={styles["filterGroup"]}
          >
            
            <label className={styles.advancedLabelFilter}>
                <span className={styles.advancedLabelText}>PROYECTO:</span>
                <select
                  value={"default"}
                  defaultValue={"default"}
                  className={styles["advancedProjectSelect"]}
                >
                  <option value={"default"} selected>
                    Projecto 1
                  </option>
                  <option value={1}>Projecto 2</option>
                  <option value={2}>Projecto 3</option>
                </select>
              </label>

          </div>

          <div
            className={styles["filterGroup"]}
          >
            <div className={styles["advancedCheckContainer"]}>
              

                <input
                  type="checkbox"
                  id="checkbox3"
                  className={styles.checkboxInput}
                />
                <label htmlFor="checkbox3" className={styles.checkboxLabel}></label>
                <div className={styles.checkboxText}>Creación</div>

                <input
                  type="checkbox"
                  id="checkbox4"
                  className={styles.checkboxInput}
                />
                <label htmlFor="checkbox4" className={styles.checkboxLabel}></label>
                <div className={styles.checkboxText}>Cerradas</div>
            </div>
          </div>

          <div
            className={styles["filterGroup"]}
          >
            <div className={styles["advancedRangeInput"]}>
              <div className={styles["advancedRangeText"]}>FECHA EN QUE FUE AGREGADO:</div>
              <input
                  type="checkbox"
                  id="checkbox5"
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                  className={styles.checkboxInput}
                />
                <label htmlFor="checkbox5" className={styles.checkboxLabelSquare}></label>
                <div className={styles.checkboxText}>Cerradas</div>
            </div>
          </div>  

          <div
            className={styles["filterGroup"]}
          >
            
            {isChecked ? 

                <div className={styles["dualRange"]}>
                  <div className={styles.advancedDate}>
                    <input
                      className={styles.advancedDateInputDual}
                      type="date" 
                      id="startDate" 
                      name="trip-start" 
                    />
                  </div>

                  <div className={styles.advancedDate}>
                    <input
                      className={styles.advancedDateInputDual}
                      type="date" 
                      id="endDate" 
                      name="trip-start" 
                    />
                  </div>
              </div>

            : 
            
              <div className={styles.advancedDate}>
                <input
                  className={styles.advancedDateInput}
                  type="date" 
                  id="singleDate" 
                  name="trip-start" 
                />
              </div>
            }
          </div>

          {rangeSliders.map((rangeSlider, i) => (
            <div
              key={i}
              className={`${styles.filterGroup} ${styles.filterGroupPrice}`}
            >
              <span className={`${styles.labelText} ${styles.labelTextRange}`}>
                {rangeSlider.type === "state" && "ESTADO DE LA OPORTUNIDAD:"}
                {rangeSlider.type === "price" && "PRECIO"}:
              </span>
              <Range
                step={rangeSlider.step}
                min={rangeSlider.min}
                max={rangeSlider.max}
                values={
                  rangeSlider.type === "price"
                    ? priceValues
                    : stateValues
                }
                onChange={(values) => {
                  switch (rangeSlider.type) {
                    case "price":
                      setPriceValues(values);
                      break;

                    case "state":
                      setStateValues(values);
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
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values:
                            rangeSlider.type === "price"
                              ? priceValues
                              : stateValues,
                          colors: ["#ccc", "#FF5567", "#ccc"],
                          min: rangeSlider.min,
                          max: rangeSlider.max,
                          rtl: false,
                        }),
                        alignSelf: "center",
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "15px",
                      width: "15px",
                      borderRadius: "50%",
                      backgroundColor: "#FF5567",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                )}
              />

              <div className={`${styles.labelsRangeSlider} flex j-sb a-c`}>
                <div className={`${styles.minLabel}`}>

                  {rangeSlider.type === "price" &&
                    `$${priceValues[0]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                  {rangeSlider.type === "state" && 
                  
                      <div className={styles["rangeStateColdIcon"]}></div>
                  }

                </div>
                <div className={`${styles.maxLabel}`}>

                  {rangeSlider.type === "price" &&
                    `$${priceValues[1]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                  {rangeSlider.type === "state" && 
                  
                    <div className={styles["rangeStateHotIcon"]}></div>
                  }

                </div>
              </div>
            </div>
          ))}

          

          <div className={`${styles.advancedButtonsFilter} flex j-c a-c column`}>
            <Button
              buttonType="secondary"
              label="Buscar"
              className="buttonsFilter"
            />
            <Button
              buttonType="primary"
              label="Borrar"
              className="buttonsFilter"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default advancedFilter;
