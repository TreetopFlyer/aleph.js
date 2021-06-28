import React, { ComponentType } from 'react'
import { useDeno } from 'framework/react'
import { ServerStyleSheet, default as styled } from 'http://esm.sh/styled-components';

let sheet = false;
export function Doc(min:boolean, lang:string, tagsHead:Array<string>, tagsFoot:Array<string>, bodyClass:string | undefined, bodyContent:string):string
{
  return `
<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charSet="utf-8" />
    ${tagsHead.join(" ")}
    ${sheet ? sheet.styleTags() : `no styles`}
  </head>
  <body ${bodyClass ? `class=${bodyClass}` : ``}>
    <h1>formatter source</h1>
    ${bodyContent}
    ${tagsFoot.join(" ")}
  </body>
</html>
`;
}

const Sty = styled.div`
padding:20px;
background yellow;
color black;
`

export default function App({ Page, pageProps }: { Page: ComponentType<any>, pageProps: any }) {

  sheet = false;
  const api = useDeno(async () =>
  {
    sheet = new ServerStyleSheet();
  });


  let html = (
    <main>
      <head>
        <meta name="viewport" content="width=device-width" />
      </head>
      <Sty/>
      <Page {...pageProps} />
    </main>
  );
  if(sheet)
  {
    sheet.collectStyles(html);
    sheet.seal();
  }

  return html;
}
