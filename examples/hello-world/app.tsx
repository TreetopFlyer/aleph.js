import React, { ComponentType } from 'react'
import { ServerStyleSheet } from 'http://esm.sh/styled-components';

const sheet = new ServerStyleSheet()
export function Doc(min:boolean, lang:string, tagsHead:Array<string>, tagsFoot:Array<string>, bodyClass:string | undefined, bodyContent:string):string
{
  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charSet="utf-8" />
    ${tagsHead.join(" ")}
    ${sheet.getStyleTags()}
  </head>
  <body ${bodyClass ? `class=${bodyClass}` : null}>
    <h1>formatter source</h1>
    ${bodyContent}
    ${tagsFoot.join(" ")}
  </body>
</html>
`;
}

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {
  let html = sheet.collectStyles(
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <Page {...pageProps} />
    </main>
  );
  sheet.seal();
  return html;
}
