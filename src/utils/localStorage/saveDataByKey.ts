// import { GameStat } from "../../types/GameStat";

export const saveDataByKey = (key: string, dataArr: object) =>{
    localStorage.setItem(key, JSON.stringify(dataArr));
}