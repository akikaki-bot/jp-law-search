import { Client } from "../../client/client";
import { IRawLawResponse, RawLaw } from "../base/RawLawResponse";
import { ILawResponse } from "../ILawResponse";
import { LawImpl } from "./LawImpl";


export class LawResponseImpl implements ILawResponse {
    totalCount: number;
    count: number;
    nextOffset: number;
    laws: LawImpl[];

    constructor( public rawLawResponse: IRawLawResponse, private client: Client ){
        this.totalCount = rawLawResponse.total_count;
        this.count = rawLawResponse.count;
        this.nextOffset = this.count < this.totalCount ? this.count : null;

        this.laws = rawLawResponse.laws.map(( rawLaw : RawLaw ) : LawImpl => new LawImpl(
            rawLaw.law_info,
            rawLaw.revision_info,
            rawLaw.current_revision_info,
            this.client
        ));
    }
}


