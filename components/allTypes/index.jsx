// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Button from "../button";
import TypeCard from "../type";
import { useSelector } from "react-redux";
import Sortable from "sortablejs";
// import Script from "next/script";
// import $ from "jquery";
// import "jquery-ui.1.11.1/dist/jquery-ui";

// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   MouseSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

const AllTypes = ({ setShowPopUpType, types, setCreateOportunity }) => {
  // const sensors = useSensors(
  //   useSensor(MouseSensor, {
  //     activationConstraint: {
  //       distance: 8,
  //     },
  //   }),
  //   useSensor(TouchSensor, {
  //     activationConstraint: {
  //       delay: 200,
  //       tolerance: 6,
  //     },
  //   })
  // );
  const { user_rol } = useSelector((state) => state.user);
  const [getTypes, setGetTypes] = useState([]);
  useEffect(() => {
    setGetTypes(types);
    const sortable = new Sortable(document.getElementById("sortable"), {
      // group: "name",
      // sort: true,
      // delay: 0,
      // delayOnTouchOnly: false,
      // touchStartThreshold: 0,
      // disabled: false,
      // store: null,
      // animation: 0,
      // easing: "cubic-bezier(1, 0, 0, 1)",
      handle: ".draggable",
      // preventOnFilter: true,
      draggable: ".itemDrag",

      // dataIdAttr: "data-id",

      // ghostClass: "sortable-ghost",
      // chosenClass: "sortable-chosen",
      // dragClass: "sortable-drag",

      // swapThreshold: 1,
      // invertSwap: false,
      // invertedSwapThreshold: 1,
      // direction: "vertical",

      // forceFallback: false,

      // fallbackClass: "sortable-fallback",
      // fallbackOnBody: false,
      // fallbackTolerance: 0,

      // dragoverBubble: true,
      // removeCloneOnHide: true,
      // emptyInsertThreshold: 5,
    });
  }, []);

  const handleDragEnd = (event) => {
    console.log("drag end called");
    const { active, over } = event;
    if (active.id !== over.id) {
      setGetTypes((types) => {
        const activeIndex = types.indexOf(types[active.id - 1]);
        const overIndex = types.indexOf(types[active.id - 1]);

        console.log(activeIndex);
        console.log(arrayMove(types, activeIndex, overIndex));
        return arrayMove(types, activeIndex, overIndex);
      });
    }
  };

  return (
    // <DndContext
    //   collisionDetection={closestCenter}
    //   onDragEnd={handleDragEnd}
    //   sensors={sensors}
    // >
    //   <SortableContext items={getTypes} strategy={verticalListSortingStrategy}>
    <>
      {/* <Script
        src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"
        onLoad={() => {
          console.log("Script has loaded");
          setTimeout(() => {
            console.log($("#sortable"));
          }, 1000);
        }}
      /> */}
      <div className="outerTypes">
        <ul className="tipo" id="sortable">
          {getTypes.map((type, index) => (
            <TypeCard
              id={type.typeId}
              setCreateOportunity={setCreateOportunity}
              key={index}
              index={index}
              type={type}
            />
          ))}
        </ul>
        {user_rol === "admin" && (
          <Button
            className={"align-center"}
            buttonType={"primary"}
            label="Agregar Tipo"
            iconImage={"/images/plus.svg"}
            clickFunction={() => setShowPopUpType(true)}
          />
        )}
      </div>
    </>
    //   </SortableContext>
    // </DndContext>
  );
};

export default AllTypes;
