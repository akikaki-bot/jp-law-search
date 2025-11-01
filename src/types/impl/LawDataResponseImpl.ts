import { Client } from "../../client/client";
import { RawLawDataResponse } from "../base/RawLawDataResponse";
import { IAttachedFilesInfo, ILawDataResponse, ILawFullText } from "../ILawDataResponse";
import { ILawInfo, IRevisionInfo } from "../ILawResponse";
import { AttachedFilesInfoImpl } from "./AttachedFilesInfoImpl";
import { LawFullTextImpl } from "./LawFullTextImpl";
import { LawInfoImpl } from "./LawInfoImpl";
import { RevisionInfoImpl } from "./RevisionInfoImpl";


export class LawDataResponseImpl implements ILawDataResponse {
    attachedFilesInfo: AttachedFilesInfoImpl;
    lawInfo: LawInfoImpl;
    revisionInfo: RevisionInfoImpl;
    lawFullText: LawFullTextImpl;
    
    constructor(
        public rawLawDataResponse : RawLawDataResponse,
        private client : Client
    ) {
        this.lawInfo = new LawInfoImpl( rawLawDataResponse.law_info );
        this.revisionInfo = new RevisionInfoImpl( rawLawDataResponse.revision_info );
        this.attachedFilesInfo = new AttachedFilesInfoImpl( rawLawDataResponse.attached_files_info );
        this.lawFullText = new LawFullTextImpl( rawLawDataResponse.law_full_text );
    }
}