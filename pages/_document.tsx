import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href='https://fonts.googleapis.com/css2?family=M+PLUS+1p&family=Noto+Sans+JP:wght@100;400;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
