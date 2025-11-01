import { LawFullText, LawFullTextAttr, LawFullTextChild } from "../base/RawLawDataResponse";
import { ILawFullText, ILawFullTextAttr, ILawFullTextChild } from "../ILawDataResponse";
import { LawType } from "../ILawResponse";


export class LawFullTextImpl implements ILawFullText {
    tag: string;
    attr: LawFullTextAttrImpl;
    children: LawFullTextChildImpl[];

    constructor(rawLawFullText: LawFullText) {
        this.tag = rawLawFullText.tag;
        this.attr = new LawFullTextAttrImpl(rawLawFullText.attr);
        this.children = rawLawFullText.children.map(child => {
            if (typeof child === "string") {
                return child;
            } else {
                return new LawFullTextChildImpl(child);
            }
        });
    }
}

export class LawFullTextAttrImpl implements ILawFullTextAttr {
    lawId: string;
    LawType: LawType;
    
    constructor( rawAttr : LawFullTextAttr ){
        this.lawId = rawAttr.Era; // 仮対応
        this.LawType = rawAttr.LawType as LawType;
    }
}

export class LawFullTextChildImpl implements ILawFullTextChild {
    tag: string;
    attr: { AbbrKanaSeion?: string; };
    children: (string | LawFullTextChildImpl)[];
    
    constructor( rawChild : LawFullTextChild ){
        this.tag = rawChild.tag;
        this.attr = { AbbrKanaSeion: (rawChild.attr as any).AbbrKanaSeion };
        this.children = rawChild.children.map(child => {
            if (typeof child === "string") {
                return child;
            } else {
                return new LawFullTextChildImpl(child);
            }
        });
    }
}