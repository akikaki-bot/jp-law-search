import { RawLawInfo, RawRevisionInfo } from "../base/RawLawResponse";
import { Law } from "../ILawResponse";
import { LawInfoImpl } from "./LawInfoImpl";
import { RevisionInfoImpl } from "./RevisionInfoImpl";
import { Resolver } from "../../resolver";
import { $currentLawStatus } from "../../resolver/currentLawStatus";
import { RevisedDistricts } from "../RevisedDistricts";
import { Client } from "../../client/client";
import { Error, isError } from "../APIResponse";
import { RawLawDataResponse } from "../base/RawLawDataResponse";
import { LawDataResponseImpl } from "./LawDataResponseImpl";


export class LawImpl implements Law {
    lawInfo: LawInfoImpl;
    revisionInfo: RevisionInfoImpl;
    currentRevisionInfo: RevisionInfoImpl;
    
    constructor(
        lawInfo: RawLawInfo,
        revisionInfo: RawRevisionInfo,
        currentRevisionInfo: RawRevisionInfo,
        private client: Client
    ){
        this.lawInfo = new LawInfoImpl(lawInfo);
        this.revisionInfo = new RevisionInfoImpl(revisionInfo);
        this.currentRevisionInfo = new RevisionInfoImpl(currentRevisionInfo);
    }

    get getCurrentRepealStatusText(): RevisedDistricts | false {
        return Resolver.resolveCurrentLawStatus( 
            this.currentRevisionInfo.amendmentType,
            this.currentRevisionInfo.mission,
            this.currentRevisionInfo.repealStatus
        );
    }

    async getFullLawData(): Promise<LawDataResponseImpl | Error> {
        console.log(this.currentRevisionInfo.lawRevisionId)
        const response = await this.client.httpClient.get<RawLawDataResponse>("LAWDATA", {}, this.currentRevisionInfo.lawRevisionId );
        if( isError( response ) ){
            return response;
        }
        return new LawDataResponseImpl(response, this.client );
    }
}