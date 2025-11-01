import { AttachedFile, AttachedFilesInfo } from "../base/RawLawDataResponse";
import { IAttachedFile, IAttachedFilesInfo } from "../ILawDataResponse";
import { RevisionId } from "../lawId";


export class AttachedFilesInfoImpl implements IAttachedFilesInfo {
    imageData: string;
    attachedFiles: AttachedFileImpl[];
    
    constructor(
        public rawAttachedFilesInfo : AttachedFilesInfo
    ) {
        this.imageData = rawAttachedFilesInfo?.image_data;
        this.attachedFiles = rawAttachedFilesInfo?.attached_files.map( af => new AttachedFileImpl( af ) );
    }
}

export class AttachedFileImpl implements IAttachedFile {
    lawRevisionId: RevisionId;
    src: string;
    updated: Date;
    
    constructor(
        public rawAttachedFile : AttachedFile
    ) {
        this.lawRevisionId = rawAttachedFile.law_revision_id;
        this.src = rawAttachedFile.src;
        this.updated = new Date(rawAttachedFile.updated);
    }
}