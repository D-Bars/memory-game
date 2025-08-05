import { GameStat } from "../../types/GameStat";

export const saveDataByKey = (key: string, dataArr: GameStat[]) =>{
    localStorage.setItem(key, JSON.stringify(dataArr));
}