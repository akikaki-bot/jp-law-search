import { Resolver } from "../../resolver";
import { LawFullText, LawFullTextAttr, LawFullTextChild } from "../base/RawLawDataResponse";
import { ILawFullText, ILawFullTextAttr, ILawFullTextChild } from "../ILawDataResponse";
import { LawType } from "../ILawResponse";
import { MarkdownExportConfig } from "../IparamConfig/markdownExportConfig";



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

    public toMarkdown( config ?: MarkdownExportConfig ): string {
        return Resolver.convertRawTextToMarkdown( this, config );
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

export type LawFullTextChildTags =
| "Law"
| "LawNum"
| "LawBody"
| "LawTitle"
| "EnactStatement"
| "Preamble"
| "TOC"
| "TOCLabel"
| "TOCPreambleLabel"
| "TOCPart"
| "TOCChapter"
| "TOCSection"
| "TOCSubsection"
| "TOCDivision"
| "TOCArticle"
| "TOCSupplProvision"
| "TOCAppdxTableLabel"
| "ArticleRange"
| "MainProvision"
| "Article"
| "ArticleRange"
| "Paragraph"
| "Item"
| "SubItem"
| "ChapterTitle"
| "ArticleCaption"
| "ArticleTitle"
| "ParagraphSentence"
| "Sentence"
| "Chapter"
| "ParagraphNum"
;

export class LawFullTextChildImpl implements ILawFullTextChild {
    tag: LawFullTextChildTags;
    attr: { AbbrKanaSeion?: string; };
    children: (string | LawFullTextChildImpl)[];
    
    constructor( rawChild : LawFullTextChild ){
        this.tag = rawChild.tag as LawFullTextChildTags;
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