import { AmendmentType, LawNumEra, LawType, Mission, RepealStatus, RevisionStatus } from "../ILawResponse";
import { LawId, LawNum, RevisionId } from "../lawId";

export interface IRawLawResponse {
    total_count: number;
    count:       number;
    laws:        RawLaw[];
}

export interface RawLaw {
    law_info:              RawLawInfo;
    revision_info:         RawRevisionInfo;
    current_revision_info: RawRevisionInfo;
}

export interface RawRevisionInfo {
    law_revision_id:                      RevisionId;
    law_type:                             LawType;
    law_title:                            string;
    law_title_kana:                       string;
    abbrev:                               string;
    category:                             string;
    updated:                              Date;
    amendment_promulgate_date:            Date;
    amendment_enforcement_date:           Date;
    amendment_enforcement_comment:        null;
    amendment_scheduled_enforcement_date: null;
    amendment_law_id:                     LawId;
    amendment_law_title:                  string;
    amendment_law_title_kana:             null;
    amendment_law_num:                    LawNum;
    amendment_type:                       AmendmentType;
    repeal_status:                        RepealStatus;
    repeal_date:                          Date | null;
    remain_in_force:                      boolean;
    mission:                              Mission;
    current_revision_status:              RevisionStatus;
}

export interface RawLawInfo {
    law_type:          LawType;
    law_id:            LawId;
    law_num:           LawNum;
    law_num_era:       LawNumEra;
    law_num_year:      number;
    law_num_type:      LawType;
    law_num_num:       number;
    promulgation_date: Date;
}
