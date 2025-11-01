import { AmendmentType, Mission, RepealStatus } from "../types/ILawResponse";
import { RevisedDistricts } from "../types/RevisedDistricts";




export function $currentLawStatus( 
    amendmentType : AmendmentType,
    mission: Mission,
    repealStatus: RepealStatus
) : RevisedDistricts | false {
    if( amendmentType === 1 && mission === "New" ) {
        return "新規制定";
    }

    if( mission === "Partial" ) {
        return "一部改正";
    }

    if( amendmentType === 3 && mission === "New") {
        return "被改正法"
    }

    if( 
        amendmentType === 8 ||
        ["Repeal", "Expire", "LossOfEffectiveness"].includes( repealStatus )
    ){
        return "廃止"
    }

    return false
}