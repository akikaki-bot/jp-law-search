
import { $currentLawStatus } from "./currentLawStatus";
import { $resolveRawText } from "./lawFullText";
import { $resolveRepealStatus } from "./repealStatus";
import { $resolveMarkdown } from "./resolveMarkdown";

/**
 * 名前空間: 法令解釈用リゾルバ
 * 
 * 法令の各種コードやステータスを解釈するための関数群を提供します。
 */
namespace Resolver {
    /**
     * 廃止等の状態を日本語で解釈します。
     * 
     * @param repealStatus 廃止等の状態コード
     * @returns 日本語の解釈結果
     */
    export const resolveRepealStatus = $resolveRepealStatus;

    /**
     * 改正区分を判断する関数です。
     * 
     * @param amendmentType 改正区分コード
     * @param mission 新規制定又は被改正法令・一部改正法令
     * @param repealStatus 廃止等の状態コード
     * @returns 改正区分の解釈結果
     */
    export const resolveCurrentLawStatus = $currentLawStatus;

    /**
     * 法令全文のテキストをツリー形式に解釈します。
     * @param rawText 法令全文の生データ
     * 
     * @returns 
     * {
     *  tag: string;
     *  content: (string | { tag: string; content: any[] })[]
     * }
     */
    export const resolveRawText = $resolveRawText;
    /**
     * 法令全文をMarkdown形式に変換します。
     * @param rawText 法令全文の生データ
     * 
     * @returns Markdown形式の文字列
     */
    export const convertRawTextToMarkdown = $resolveMarkdown;
}

export { Resolver };