import unidecode from "unidecode";

export const keywordAdvance = (query: any) => {
    const keyword: string = `${query.keyword}` || "";

    const keywordUnidecode: string = unidecode(keyword);
    const keywordReplaceWhiteSpace: string = keywordUnidecode.replace(/\s+/g, "-");

    const keywordRegexTitle: RegExp = new RegExp(keyword, "i"); // find keyword with title
    
    const keywordRegexSlug: RegExp = new RegExp(keywordReplaceWhiteSpace, "i"); // find keyword with slug

    return {keywordRegexTitle, keywordRegexSlug};
}