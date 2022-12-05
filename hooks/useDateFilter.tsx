import { SearchInput } from "../pages/comments/commentList/[id]";
import { SearchBuilding } from "../pages/topPage/[companyId]";

const useDateFilter = (searhInput: SearchInput | SearchBuilding, createdAt: Date) => {
  let isSearchDate: boolean;

  if (searhInput.startDate === "" && searhInput.endDate === "") {
    isSearchDate = true;
  } else if (searhInput.startDate !== "" && searhInput.endDate !== "") {
    const searchStartDate = new Date(searhInput.startDate);
    const searchEndtDate = new Date(searhInput.endDate);
    isSearchDate = searchStartDate <= createdAt && createdAt <= searchEndtDate ? true : false;
  } else if (searhInput.startDate !== "") {
    const searchStartDate = new Date(searhInput.startDate);
    isSearchDate = searchStartDate <= createdAt ? true : false;
  } else {
    const searchEndtDate = new Date(searhInput.endDate);
    isSearchDate = createdAt <= searchEndtDate ? true : false;
  }
  return isSearchDate;
};

export default useDateFilter;
