import { ILawInfo, IRevisionInfo, LawType } from "./ILawResponse";
import { LawId, RevisionId } from "./lawId";




export interface ILawDataResponse {
    /**
     * 添付ファイル情報
     */
    attachedFilesInfo : IAttachedFilesInfo;
    /**
     * 履歴に依存しない法令（法令IDで特定される法令）のメタ情報
     */
    lawInfo: ILawInfo
    /**
     * 法令の履歴に関する情報
     */
    revisionInfo: IRevisionInfo;
    /**
     * 
     */
    lawFullText : ILawFullText;
}

/**
 * 添付ファイル情報
 */
export interface IAttachedFilesInfo {
    /**
     * 添付ファイルデータ（添付ファイルをフォルダ名pictに収集し、フォルダ全体をZip形式で圧縮したファイルをBase64でエンコードした文字列）
     */
    imageData : string;
    attachedFiles : IAttachedFile[];
}

/**
 * 添付ファイル情報
 */
export interface IAttachedFile {
    /**
     * 法令ID
     * @example "105DF0000000337_18721109_000000000000000"
     */
    lawRevisionId : RevisionId
    /**
     * 法令XML中のFig要素のsrc属性
     * @example ./pict/M06SE065-001.jpg
     */
    src : string;
    /**
     * 正誤等による更新日時
     */
    updated : Date
}

/**
 * 法令本文
 */
export interface ILawFullText {
    tag : string
    attr : ILawFullTextAttr
    children : ILawFullTextChild[]
}

export interface ILawFullTextAttr {
    lawId : LawId;
    LawType: LawType
}

export interface ILawFullTextChild {
    tag : string;
    attr: {
        AbbrKanaSeion?: string;
    }
    children : Array<ILawFullTextChild | string>;
}