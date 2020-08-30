import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../context/AppStateContext";
import { CardDragItem } from "../types/DragItem";
import { useItemDrag } from "../utils/useItemDrag";
import { CardContainer } from "../styles";

interface CardProps {
  text: string;
  index: number;
  id: string;
  columnId: string;
}

export const Card = ({ text, id, index, columnId }: CardProps) => {
  const { dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }
      console.log("item", item);
      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn },
      });
      item.index = hoverIndex;
      item.columnId = targetColumn;
    },
  });
  drag(drop(ref));

  return <CardContainer ref={ref}>{text}</CardContainer>;
};
