import { RevisionId } from "../lawId";
import { RawLawInfo, RawRevisionInfo } from "./RawLawResponse";

export interface RawLawDataResponse {
    attached_files_info: AttachedFilesInfo;
    law_info:            RawLawInfo;
    revision_info:       RawRevisionInfo;
    law_full_text:       LawFullText;
}

export interface AttachedFilesInfo {
    image_data:     string;
    attached_files: AttachedFile[];
}

export interface AttachedFile {
    law_revision_id: RevisionId;
    src:             string;
    updated:         Date;
}

export interface LawFullText {
    tag:      string;
    attr:     LawFullTextAttr;
    children: LawFullTextChild[];
}

export interface LawFullTextAttr {
    Era:             string;
    Lang:            string;
    LawType:         string;
    Num:             string;
    Year:            string;
    PromulgateMonth: string;
    PromulgateDay:   string;
}

export interface LawFullTextChild {
    tag:      string;
    attr:     string;
    children: Array<LawFullTextChild | string>;
}

export interface PurpleChild {
    tag:      string;
    attr:     PurpleAttr | string;
    children: Array<FluffyChild | string>;
}

export interface PurpleAttr {
    Kana:       string;
    Abbrev:     string;
    AbbrevKana: string;
}

export interface FluffyChild {
    tag:      string;
    attr:     ChildAttrClass;
    children: TentacledChild[];
}

export interface ChildAttrClass {
    Delete: string;
    Hide:   string;
    Num:    string;
}

export interface TentacledChild {
    tag:       string;
    attr:      FluffyAttr | string;
    children?: string[];
}

export interface FluffyAttr {
    Hide:     string;
    Num:      string;
    OldStyle: string;
}

