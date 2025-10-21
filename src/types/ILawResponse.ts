import { LawId, LawNum, RevisionId } from "./lawId";


export interface ILawResponse {
    totalCount: number;
    count: number
    nextOffset : number | null;
    laws : Law[];
}

/**
 * 法令ID単位の法令情報
 */
export interface Law {
    lawInfo : ILawInfo;
    revisionInfo : IRevisionInfo;
    currentRevisionInfo : IRevisionInfo;
}

/**
 * 取得した改正履歴における法令情報
 */
export interface IRevisionInfo {
    /**
     * 法令履歴ID
     * @example "105DF0000000337_18721109_000000000000000"
     */
    lawRevisionId: RevisionId
    /**
     * 法令種別
     */
    lawType: LawType
    /**
     * 法令名
     */
    lawTitle : string
    /**
     * 法令名（カナ）
     */
    lawTitleKana: string
    /**
     * 略式法令名
     */
    abbRev: string
    /**
     * 法令分野分類
     */
    category: string
    /**
     * 正誤等による更新日時
     */
    updated: Date
    /**
     * 改正公布日
     */
    amendmentPromulgateDate : Date
    /**
     * 改正施行日
     */
    amendmentEnforcementDate : Date	
    /**
     * 施行期日規定等の参考情報（この履歴に対応する改正の施行期日）
     */
    amendmentEnforcementComment : string
    /**
     * 擬似的な施行期日（実際の施行期日とは限らない）（この履歴に対応する改正の施行期日）
     */
    amendmentScheduledEnforcementDate: Date
    /**
     * 改正法令の法令ID（この履歴に対応する改正法令）
     */
    amendmentLawId: LawId
    /**
     * 改正法令名
     * @example 組織的な犯罪の処罰及び犯罪収益の規制等に関する法律等の一部を改正する法律
     */
    amendmentLawTitle: string
    /**
     * 改正法令名（カナ）
     * @example そしきてきなはんざいのしょばつおよびはんざいしゅうえきのきせいとうにかんするほうりつとうのいちぶをかいせいするほうりつ
     */
    amendmentLawTitleKana: string
    /**
     * 改正法令番号
     */
    amendmentLawNum: LawNum
    /**
     * 改正種別
     */
    amendmentType : AmendmentType
    /**
     * 廃止等の状態
     */
    repealStatus: RepealStatus
    /**
     * 廃止日
     * @nullable 廃止されていない場合はnull
     */
    repealDate : Date | null
    /**
     * 新規制定又は被改正法令（New）・一部改正法令（Partial）
     */
    mission : Mission;
    /**
     * 履歴の状態
     */
    currentRevisionStatus : RevisionStatus
} 

export type RevisionStatus = 
| "CurrentEnforced" 
| "UnEnforced"
| "PreviousEnforced"
| "Repeal"

export type Mission =
| "New"
| "Partial"

export type RepealStatus = 
| "None"
| "Repeal"
| "Expire"
| "Suspend"
| "LossOfEffectiveness"


export type AmendmentType = 1 | 3 | 8

/**
 * 改正履歴に依存しない法令情報
 */
export interface ILawInfo {
    /**
     * 法令種別
     */
    lawType : LawType;
    /**
     * 法令ID
     * @example "105DF0000000337"
     */
    lawId: LawId
    /**
     * 法令番号
     * @example "平成30年法律第28号"
     */
    lawNum: LawNum;
    /** 
     * 法令番号の元号
     */
    lawNumEra : LawNumEra;
    /**
     * 法令番号の法令種別
     */
    lawNumType: LawType;
    /**
     * 法令番号の年
     */
    lawNumYear : number;
    lawNumNum : number;
    promulgationDate : Date
}

export type LawNumEra =
| "Meiji"
| "Taisho"
| "Showa"
| "Heisei"
| "Reiwa"

export type LawType = 
| "Constitution" 
| "Act"
| "CabinetOrder"
| "ImperialOrder"
| "MinisterialOrdinance"
| "Rule"
| "Misc"