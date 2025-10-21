import { RawLawInfo } from "../base/RawLawResponse";
import { ILawInfo, LawNumEra, LawType } from "../ILawResponse";


export class LawInfoImpl implements ILawInfo {
    lawType: LawType;
    lawId: string;
    lawNum: `明治${string}` | `大正${string}` | `昭和${string}` | `平成${string}` | `令和${string}`;
    lawNumEra: LawNumEra;
    lawNumType: LawType;
    lawNumYear: number;
    lawNumNum: number;
    promulgationDate: Date;
    
    constructor( public rawLawInfo: RawLawInfo ){
        this.lawType = rawLawInfo.law_type;
        this.lawId = rawLawInfo.law_id;
        this.lawNum = rawLawInfo.law_num;
        this.lawNumEra = rawLawInfo.law_num_era;
        this.lawNumType = rawLawInfo.law_num_type;
        this.lawNumYear = rawLawInfo.law_num_year;
        this.lawNumNum = rawLawInfo.law_num_num;
        this.promulgationDate = new Date( rawLawInfo.promulgation_date );
    }
}