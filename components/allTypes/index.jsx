import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Button from "../button";
import TypeCard from "../type";
import { useSelector } from "react-redux";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const AllTypes = ({ setShowPopUpType, types, setCreateOportunity }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    })
  );
  const { user_rol } = useSelector((state) => state.user);
  const [getTypes, setGetTypes] = useState([]);
  useEffect(() => {
    setGetTypes(types);
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
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={getTypes} strategy={verticalListSortingStrategy}>
        <div className="outerTypes">
          <ul className="tipo">
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
      </SortableContext>
    </DndContext>
  );
};

export default AllTypes;
