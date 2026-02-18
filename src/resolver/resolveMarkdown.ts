import { LawFullTextChildImpl, LawFullTextImpl } from "../types/impl/LawFullTextImpl";
import { MarkdownExportConfig } from "../types/IparamConfig/markdownExportConfig";


export const $resolveMarkdown = ( article : LawFullTextImpl, config ?: MarkdownExportConfig ) : string => {
    return new ProcessSchemaToMarkdown( article, config ).process();
}

class ProcessSchemaToMarkdown {
    constructor(
        private node: LawFullTextImpl,
        private config ?: MarkdownExportConfig
    ) {
        
    }

    public process() : string {
        return this.node.children.map(
            child => this.processChild( child )
        ).join("\n");
    }

    private processChild( child : string | LawFullTextChildImpl ) : string {
        if( typeof child === "string" ){
            return child;
        }

        switch( child.tag ){
            case "Law":
            case "LawBody":
            case "TOC":
            case "MainProvision":
            case "Chapter":
                return this.processAllChildren( child );
            
            case "TOCChapter":
                return this.processTOCChapter( child );

            case "LawNum":
                return this.normalText( child.children.join("") );
            case "LawTitle":
                return this.markdownLevel( child.children.join(""), 1 );
            case "EnactStatement":
            case "Preamble":
            break;
            case "Article":
                return this.processArticleChildren( child );
            case "ParagraphSentence":
                return this.processAllChildren( child );
            case "Paragraph":
                return this.processParagraphChildren( child );
            case "Sentence":
                return this.indentText( child.children.join(""), 1 );
            case "TOCLabel":
                return this.markdownLevel( this.processAllChildren( child ), 2 );
            case "TOCPreambleLabel":
                return this.markdownLevel( this.processAllChildren( child ), 3 );
            case "ChapterTitle":
                return this.markdownLevel( this.processAllChildren( child ), 3 );
            case "ArticleRange":
                return this.indentText( this.processAllChildren( child ), 1 );
            case "TOCSection":
            case "TOCSubsection":
            case "TOCDivision":
            case "TOCArticle":
            case "TOCSupplProvision":
            case "TOCAppdxTableLabel":
            break;

        }

    }

    private processTOCChapter( content: LawFullTextChildImpl ): string {
        const Label = content.children.find( child => 
            typeof child !== "string" && child.tag == "ChapterTitle"
        ) as LawFullTextChildImpl | undefined;
        if( this.config?.expmerimental_title_anchor_link ){
            return this.markdownLevel( this.processAllChildren( content ), 3 );
        }
        return `[${ Label.children.join("") }](#${ Label.children.join("").replace( /\s/g, "-" ) })`;
    }

    private processZenkakuNumber( content: string ) : string {
        const zenkakuNumbers = ["０","１","２","３","４","５","６","７","８","９"];
        const hankakuNumbers = ["0","1","2","3","4","5","6","7","8","9"];
        let result = content;
        zenkakuNumbers.forEach( (zenkaku, index) => {
            const hankaku = hankakuNumbers[ index ];
            result = result.split( zenkaku ).join( hankaku );
        } );
        return result;
    }
    
    private processParagraphChildren( node: LawFullTextChildImpl ): string {
        const ParagraphNum = node.children.find( child => 
            typeof child !== "string" && child.tag === "ParagraphNum"
        ) as LawFullTextChildImpl | undefined;

        const ParagprahSentence = node.children.find( child => 
            typeof child !== "string" && child.tag === "ParagraphSentence"
        ) as LawFullTextChildImpl | undefined;

        return `${ParagraphNum?.children.join("") ? `${this.processZenkakuNumber(ParagraphNum?.children.join(""))}. ` : "1."} ${ParagprahSentence?.children.map(
            sentence => this.processChild( sentence )
        ).join("\n")}`;

    }

    private processArticleChildren( node: LawFullTextChildImpl ): string {
        const Caption = node.children.find( child => 
            typeof child !== "string" && child.tag === "ArticleCaption"
        ) as LawFullTextChildImpl | undefined;

        const Title = node.children.find( child => 
            typeof child !== "string" && child.tag === "ArticleTitle"
        ) as LawFullTextChildImpl | undefined;

        const processedOthers = node.children.filter( child => 
            typeof child === "string" || ( typeof child !== "string" && child.tag !== "ArticleCaption" && child.tag !== "ArticleTitle" )
        ).map(
            child => this.processChild( child )
        ).join("\n");

        return `##### ${Title?.children.join("")} ${Caption?.children.join("") ?? ""}\n${processedOthers}`;
    }

    private processAllChildren( node: LawFullTextChildImpl ): string {
        return node.children.map(
            child => this.processChild( child )
        ).join("\n");
    }

    private markdownLevel( content: string, level : number = 1 ): string {
        return `${"#".repeat( level )} ${content}`;
    }

    private normalText( content: string ): string {
        return `${content}`;
    }

    private indentText( content: string, level : number = 1 ): string {
        return `${" ".repeat( level * 2 )}${content}`;
    }
}