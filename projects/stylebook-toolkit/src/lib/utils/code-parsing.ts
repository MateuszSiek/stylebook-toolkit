
export function extractHtml(text: string, selectId?: string): string | undefined {
  let regExp;
  if (selectId) {
    regExp = new RegExp(`<st-code-preview(.*?)${selectId}(.*?)>(.*?)</st-code-preview>`, 'gs');
  } else {
    regExp = new RegExp('<st-code-preview(.*?)>(.*?)</st-code-preview>', 'gs');
  }
  const htmlMatch = regExp.exec(text);
  return htmlMatch && htmlMatch[htmlMatch.length - 1];
}

export function extractHtmlComments(text: string, selectId?: string): string[] {
  const html = extractHtml(text, selectId);
  const regExp = new RegExp(`<!--((.|\n|\t|\r)*?)-->`, 'gs');
  return (html.match(regExp) || []).map((comment: string) => {
    return comment
      .replace('<!--', '')
      .replace('-->', '')
      .replace(/ +(?= )/g, '')
      .trim();
  });
}

export function extractTs(text: string): string | undefined {
  if (!text) return undefined;
  const regExp = new RegExp(`export (.*?)$`, 'gs');
  const tsMatch = regExp.exec(text);
  return tsMatch ? tsMatch[1] : text;
}
