import { OBJECT_STATUS_ID_IN_PROGRESS } from "../../settings/constants";
import { Tag } from "../Tag";

export default function Renderer({item, element}) {
  return item?.title === 'title' ? (
    <span>{element?.[item?.key]}</span>
  ) : item?.title === 'status' ? (
    <Tag
      color={element?.[item?.key] === OBJECT_STATUS_ID_IN_PROGRESS ? 'yellow' : 'blue'}
      value={element?.[item?.value]}
    />
  ) : item?.render ? (
    item.render(element)
  ) : (
    element?.[item?.key]
  )
}
