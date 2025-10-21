import { LawId, LawIdParam, LawNum, RevisionId } from "../types/lawId";


export const ENDPOINTS = {
    /**
     *  指定条件に該当する法令データが返却されます。
     */
    LAWS: '/laws',
    /**
     * 法令ID（law_id）又は法令番号（law_num）を指定必須として、指定した法令の改正履歴が返却されます。
     * @param id 法令ID（law_id）又は法令番号（law_num）
     */
    LAWREVISIONS: ( id : LawId | LawNum ) => `/law_revisions/${id}`,
    /**
     * 法令ID（law_id）、法令番号（law_num）、法令履歴ID（law_revision_id）のいずれかを指定必須として、指定した法令の本文を取得します。
     * @param id 法令ID（law_id）、法令番号（law_num）、法令履歴ID（law_revision_id）
     */
    LAWDATA: ( id : LawIdParam ) => `/law_data/${id}`,
    /**
     * 法令履歴ID（law_revision_id）を指定必須パラメータとして、法令本文の添付ファイルを取得します。
     * @param id 法令履歴ID（law_revision_id）
     */
    ATTACHMENT: ( id : RevisionId ) => `/attachments/${id}`,
    /**
     * キーワード（keyword）を指定必須とし、法令本文内に指定したキーワード（keyword）を含む法令を取得します。
     */
    KEYWORD: "/keyword",
    /**
     * 法令ID（law_id）、法令番号（law_num）、法令履歴ID（law_revision_id）のいずれかと、ファイル種別（file_type）を指定必須として、
     * 法令本文をダウンロードすることができます。
     */
    LAWFILE: ( id: LawIdParam, fileType: string ) => `/law_files/${id}/${fileType}`,
}

export type Endpoints = keyof typeof ENDPOINTS;