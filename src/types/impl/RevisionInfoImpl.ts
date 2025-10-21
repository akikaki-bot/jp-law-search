import { RawRevisionInfo } from "../base/RawLawResponse";
import { AmendmentType, IRevisionInfo, LawType, Mission, RepealStatus, RevisionStatus } from "../ILawResponse";
import { LawNum } from "../lawId";

export class RevisionInfoImpl implements IRevisionInfo {

    public lawRevisionId: `${string}_${string}_${string}`;
    public rawRevisionInfo: RawRevisionInfo;

    lawType: LawType;
    lawTitle: string;
    lawTitleKana: string;
    abbRev: string;
    category: string;
    updated: Date;
    amendmentPromulgateDate: Date;
    amendmentEnforcementDate: Date;
    amendmentEnforcementComment: string;
    amendmentScheduledEnforcementDate: Date;
    amendmentLawId: string;
    amendmentLawTitle: string;
    amendmentLawTitleKana: string;
    amendmentLawNum: LawNum;
    amendmentType: AmendmentType;
    repealStatus: RepealStatus;
    repealDate: Date;
    mission: Mission;
    currentRevisionStatus: RevisionStatus;

    constructor( rawRevisionInfo: RawRevisionInfo ) {
        this.rawRevisionInfo = rawRevisionInfo;

        this.lawRevisionId = rawRevisionInfo.law_revision_id;
        this.lawType = rawRevisionInfo.law_type;
        this.lawTitle = rawRevisionInfo.law_title;
        this.lawTitleKana = rawRevisionInfo.law_title_kana;
        this.abbRev = rawRevisionInfo.abbrev;
        this.category = rawRevisionInfo.category;
        this.updated = new Date(rawRevisionInfo.updated);
        this.amendmentPromulgateDate = new Date(rawRevisionInfo.amendment_promulgate_date);
        this.amendmentEnforcementDate = new Date(rawRevisionInfo.amendment_enforcement_date);
        this.amendmentEnforcementComment = rawRevisionInfo.amendment_enforcement_comment;
        this.amendmentScheduledEnforcementDate = new Date(rawRevisionInfo.amendment_scheduled_enforcement_date);
        this.amendmentLawId = rawRevisionInfo.amendment_law_id;
        this.amendmentLawTitle = rawRevisionInfo.amendment_law_title;
        this.amendmentLawTitleKana = rawRevisionInfo.amendment_law_title_kana;
        this.amendmentLawNum = rawRevisionInfo.amendment_law_num;
        this.amendmentType = rawRevisionInfo.amendment_type;
        this.repealStatus = rawRevisionInfo.repeal_status;
        this.repealDate = new Date(rawRevisionInfo.repeal_date);
        this.mission = rawRevisionInfo.mission;
        this.currentRevisionStatus = rawRevisionInfo.current_revision_status;
    }
}