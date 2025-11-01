import { LawFullTextChildImpl, LawFullTextImpl } from "../types/impl/LawFullTextImpl";


export const $$resolveRawText = (rawText: string | LawFullTextChildImpl) => {
    if (typeof rawText === "string") {
        return rawText;
    } else {
        return {
            tag: rawText.tag,
            content: rawText.children.map(c => $$resolveRawText(c)).flat()
        }
    }
}

export const $resolveRawText = (rawText: LawFullTextImpl): TagOrContent[] => {
    return rawText.children.map(c => $$resolveRawText(c)).flat();
}

export type TagOrContent = { tag: string; content: (string | TagOrContent)[] };
