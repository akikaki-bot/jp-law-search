import { RawLawInfo, RawRevisionInfo } from "../base/RawLawResponse";
import { Law } from "../ILawResponse";
import { LawInfoImpl } from "./LawInfoImpl";
import { RevisionInfoImpl } from "./RevisionInfoImpl";


export class LawImpl implements Law {
    lawInfo: LawInfoImpl;
    revisionInfo: RevisionInfoImpl;
    currentRevisionInfo: RevisionInfoImpl;
    
    constructor(
        lawInfo: RawLawInfo,
        revisionInfo: RawRevisionInfo,
        currentRevisionInfo: RawRevisionInfo
    ){
        this.lawInfo = new LawInfoImpl(lawInfo);
        this.revisionInfo = new RevisionInfoImpl(revisionInfo);
        this.currentRevisionInfo = new RevisionInfoImpl(currentRevisionInfo);
    }
}