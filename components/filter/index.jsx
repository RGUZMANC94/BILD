import React, { useState } from "react";
import styles from "./filter.module.css";
import { Range, getTrackBackground } from "react-range";
import Button from "../button";

const Filter = ({ show, setShowFilter }) => {
  const [priceValues, setPriceValues] = useState([0, 3000000000]);
  const [floorValues, setFloorValues] = useState([1, 21]);
  const [sizeValues, setSizeValues] = useState([45, 1200]);

  const rangeSliders = [
    {
      type: "price",
      min: 0,
      max: 3000000000,
      step: 5000000,
    },
    {
      type: "floor",
      min: 1,
      max: 21,
      step: 1,
    },
    {
      type: "size",
      min: 45,
      max: 1200,
      step: 50,
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
            className={`${styles.filterGroup} ${styles.filterGroupUbication}`}
          >
            <label htmlFor={styles.labelFilter}>
              <span className={styles.labelText}>Ubicación:</span>
              <select
                value={0}
                defaultValue={0}
                className={styles.ubicationSelect}
              >
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
              className={`${styles.filterGroup} ${styles.filterGroupPrice}`}
            >
              <span className={`${styles.labelText} ${styles.labelTextRange}`}>
                {rangeSlider.type === "price" && "Precio"}
                {rangeSlider.type === "floor" && "Piso"}
                {rangeSlider.type === "size" && "Área"}:
              </span>
              <Range
                step={rangeSlider.step}
                min={rangeSlider.min}
                max={rangeSlider.max}
                values={
                  rangeSlider.type === "price"
                    ? priceValues
                    : rangeSlider.type === "floor"
                    ? floorValues
                    : sizeValues
                }
                onChange={(values) => {
                  switch (rangeSlider.type) {
                    case "price":
                      setPriceValues(values);
                      break;

                    case "floor":
                      setFloorValues(values);
                      break;
                    case "size":
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
                              : rangeSlider.type === "floor"
                              ? floorValues
                              : sizeValues,
                          colors: ["#ccc", "#548BF4", "#ccc"],
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
                      backgroundColor: "#2467ff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
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
                  {rangeSlider.type === "floor" && floorValues[0]}
                  {rangeSlider.type === "size" && sizeValues[0]}
                </div>
                <div className={`${styles.maxLabel}`}>
                  {rangeSlider.type === "price" &&
                    `$${priceValues[1]
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
                  {rangeSlider.type === "floor" && floorValues[1]}
                  {rangeSlider.type === "size" && sizeValues[1]}
                </div>
              </div>
            </div>
          ))}

          <div
            className={`${styles.filterGroup} ${styles.filterGroupDrops} flex j-sb a-s`}
          >
            <div className={`${styles.dropDownGrpup}`}>
              <label htmlFor={styles.labelFilter}>
                <span className={styles.labelText}>HABITACIONES:</span>
                <select
                  value={"default"}
                  defaultValue={"default"}
                  className={styles.ubicationSelect}
                >
                  <option value={"default"} selected>
                    3+
                  </option>
                  <option value={1}>4+</option>
                  <option value={2}>5+</option>
                  <option value={3}>6</option>
                </select>
              </label>
            </div>
            <div className={`${styles.dropDownGrpup}`}>
              <label htmlFor={styles.labelFilter}>
                <span className={styles.labelText}>BAÑOS:</span>
                <select
                  defaultValue={"default"}
                  value={"default"}
                  defaultValue={"default"}
                  className={styles.ubicationSelect}
                >
                  <option value={"default"} selected>
                    1+
                  </option>
                  <option value={1}>2+</option>
                  <option value={2}>3+</option>
                  <option value={2}>4+</option>
                </select>
              </label>
            </div>
          </div>

          <div className={`${styles.buttonsFilter} flex j-c a-c column`}>
            <Button
              buttonType="secondary"
              label="Filtrar"
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

export default Filter;
