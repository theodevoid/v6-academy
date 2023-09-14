import { remark } from 'remark';
import html from 'remark-html';

export const parseMarkdownToHTML = (rawMD: string) => {
  if (!rawMD) return;

  const processedContent = remark().use(html).processSync(rawMD);

  const contentHtml = processedContent.toString();

  return contentHtml;
};
