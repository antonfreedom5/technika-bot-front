export interface SuggestResponseModel {
  results: SuggestResult[];
}

export interface SuggestResult {
  title: SuggestText;
  subtitle: SuggestText;
  tags: string[];
}

export interface SuggestText {
  text: string;
  hl: SuggestHighlight[];
}

export interface SuggestHighlight {
  begin: number;
  end: number;
}
