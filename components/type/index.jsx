// import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { changeTypeSelected } from "../../redux/typeSelectedSlice";
import { openPopUp } from "../../redux/popUpOportunity";

const TypeCard = ({ type, setCreateOportunity, index }) => {
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({ id: type.id });

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };
  const dispatch = useDispatch();
  return (
    <li
      id={type.id}
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      className={`itemDrag ${index === 0 ? "active" : ""}`}
      onPointerUp={(e) => {
        const itemsDrag = document.querySelectorAll(".itemDrag");
        itemsDrag.forEach((item) => {
          if (item.classList.contains("active")) {
            item.classList.remove("active");
          }
        });
        itemsDrag[index].classList.add("active");
        dispatch(changeTypeSelected(index));
      }}
    >
      <div className="draggable bg-ct" draggable={true}></div>
      <div className="maskDraggable"></div>
      <div className="tipo-unit">
        <div className="img-tipo">
          <img src={"/images/tipo-1.png"} />
        </div>
        <div className="tipo-info">
          <span className="tipo-title">{type.typeName}</span>
          <span className="valor">$120 millones - 160 millones</span>
          <div className="detalles">
            <img src="/images/cards/bed.png"  />
            <span>3-4</span>
            <img src="/images/cards/bath.png"  />
            <span>2-3</span>
          </div>
        </div>
        <div
          className="llave"
          onClick={() => {
            dispatch(openPopUp(true));
          }}
        ></div>
        <div className="caracteristicas-top-movil">
          <div className="caracteristicas-top">
            <div className="top-tabla">ID</div>
            <div className="top-tabla">Alcobas</div>
            <div className="top-tabla">Baños</div>
            <div className="top-tabla">Precio</div>
            <div className="top-tabla"></div>
          </div>

          <div className="info-tabla">
            <div className="detalle-tabla">202</div>
            <div className="detalle-tabla">3</div>
            <div className="detalle-tabla">2</div>
            <div className="detalle-tabla">$ 140 M</div>
            <div
              className="llave-tabla"
              onClick={() => setCreateOportunity(true)}
            ></div>
          </div>

          <div className="info-tabla">
            <div className="detalle-tabla">202</div>
            <div className="detalle-tabla">3</div>
            <div className="detalle-tabla">2</div>
            <div className="detalle-tabla">$ 140 M</div>
            <div
              className="llave-tabla"
              onClick={() => setCreateOportunity(true)}
            ></div>
          </div>

          <div className="info-tabla">
            <div className="detalle-tabla">202</div>
            <div className="detalle-tabla">3</div>
            <div className="detalle-tabla">2</div>
            <div className="detalle-tabla">$ 140 M</div>
            <div
              className="llave-tabla"
              onClick={() => setCreateOportunity(true)}
            ></div>
          </div>

          <div className="info-tabla">
            <div className="detalle-tabla">202</div>
            <div className="detalle-tabla">3</div>
            <div className="detalle-tabla">2</div>
            <div className="detalle-tabla">$ 140 M</div>
            <div
              className="llave-tabla"
              onClick={() => setCreateOportunity(true)}
            ></div>
          </div>

          <div className="info-tabla">
            <div className="detalle-tabla">202</div>
            <div className="detalle-tabla">3</div>
            <div className="detalle-tabla">2</div>
            <div className="detalle-tabla">$ 140 M</div>
            <div
              className="llave-tabla"
              onClick={() => {
                dispatch(openPopUp(true));
              }}
            ></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TypeCard;
