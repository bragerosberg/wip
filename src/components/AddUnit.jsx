import moment from "moment";
import React, { useState } from "react";

import UnitDrink from "./UnitDrink";
import ValueOptions from "./value/ValueOptions";
import Button from "./Button";
import { colorPalette } from "../theme";
import "./AddUnit.css";

import {
  minutes,
  centiliters,
  percentages,
  beerPercentages,
  winePercentages,
  shotPercentages,
  beerCentiliters,
  wineCentiliters,
  shotCentiliters,
} from "../constants";
import custom from "../assets/custom.png";
import pils from "../assets/pils.png";
import vin from "../assets/vin.png";
import shot from "../assets/shot.png";
import { v4 } from "uuid";

const unitOptions = [
  { name: "pils", src: pils },
  { name: "shot", src: shot },
  { name: "vin", src: vin },
  { name: "custom", src: custom },
];

const AddUnit = ({ handleUnitUpdate }) => {
  const [activeUnit, setActiveUnit] = useState("pils");
  const [activeCl, setActiveCl] = useState(50);
  const [activePercentage, setActivePercentage] = useState(4);
  const [activeTime, setActiveTime] = useState({
    time: moment(new Date()).format("HH:mm"),
    nickname: "Nå",
    day: "i dag",
  });

  const getPercentagesSet = () => {
    if (activeUnit === "pils") return beerPercentages;
    if (activeUnit === "vin") return winePercentages;
    if (activeUnit === "shot") return shotPercentages;
    return percentages;
  };

  const getCentiliterSet = () => {
    if (activeUnit === "pils") return beerCentiliters;
    if (activeUnit === "vin") return wineCentiliters;
    if (activeUnit === "shot") return shotCentiliters;
    return centiliters;
  };

  const getTimeSet = () => {
    if (activeUnit === "custom") return false;
    return true;
  };

  const setDefaultValuesOnUnit = ({ cl, percentage }) => {
    setActiveCl(cl);
    setActivePercentage(percentage);
    setActiveTime({
      time: moment(new Date()).format("HH:mm"),
      nickname: "Nå",
      day: "i dag",
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    handleUnitUpdate({
      id: v4(),
      unitName: activeUnit,
      cl: activeCl,
      percentage: activePercentage,
      time: activeTime,
      day: moment(new Date()).format("DD-MM-YYYY"),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="unit__form">
      <div className="topContainer">
        {unitOptions.map(({ name, src }) => (
          <UnitDrink
            key={`${name}${src}`}
            setActiveUnit={setActiveUnit}
            activeUnit={activeUnit}
            setDefaultValuesOnUnit={setDefaultValuesOnUnit}
            name={name}
            illustration={src}
          />
        ))}
      </div>
      Centiliter
      <ValueOptions
        items={getCentiliterSet()}
        onClick={setActiveCl}
        currentValue={activeCl}
      />
      <label>
        Prosent
        <ValueOptions
          items={getPercentagesSet()}
          onClick={setActivePercentage}
          currentValue={activePercentage}
        />
      </label>
      <label>
        Tid
        <ValueOptions
          items={minutes}
          lastHour={getTimeSet()}
          hourNow={moment(new Date()).format("HH:mm")}
          onClick={setActiveTime}
          currentValue={activeTime}
        />
      </label>
      <div style={{ marginTop: 48 }}>
        <Button
          type="submit"
          onClick={() => {
            localStorage.removeItem("units");
            window.location.reload();
          }}
          color={colorPalette.white}
          borderColor={colorPalette.white}
          backgroundColor={colorPalette.royal}
        >
          Legg til +
        </Button>
      </div>
    </form>
  );
};

export default AddUnit;