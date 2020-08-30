import { useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useAppState } from "../context/AppStateContext";
import { DragItem } from "../types/DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    item,
    // when we start dragging an item
    begin: () => {
      return dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: item,
      });
    },
    // when we release the item
    end: () => {
      return dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: undefined,
      });
    },
  });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return { drag };
};
