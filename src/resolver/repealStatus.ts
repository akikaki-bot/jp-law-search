import { RepealStatus } from "../types/ILawResponse";



export function $resolveRepealStatus( repealStatus: RepealStatus ): string {
    switch ( repealStatus ) {
        case "Expire":
            return "失効";
        case "LossOfEffectiveness":
            return "実効性喪失";
        case "Suspend":
            return "停止";
        case "Repeal":
            return "廃止";
        case "None":
            return "現行";
        default:
            return "不明";
    }
}

