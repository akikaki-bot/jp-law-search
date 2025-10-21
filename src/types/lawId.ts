

export type LawIdParam = RevisionId | LawId | LawNum;

export type LawId = string
export type LawNum = `${("明治" | "大正" | "昭和" | "平成" | "令和")}${string}`
export type RevisionId = `${string}_${string}_${string}`

export const a : RevisionId = `105DF0000000337_18721109_000000000000000`;