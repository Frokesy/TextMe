import Head from "next/head";

const Meta = ({ title, keywords, desc }) => {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no"
      />
      <meta name="theme-color" content="#0fa84e" />
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" type="image/x-icon" href="/assets/messenger-green-icon.png"/>

      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="/assets/messenger-green-icon" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta property="twitter:image" content="/assets/messenger-green-icon.png" />

      <meta property="og:site_name" content="TextMe" />
      <meta property="og:site" content="" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content="" />
      <meta property="og:url" content="/assets/messenger-green-icon.png" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "TextMe",
  keywords: "conversation, chat, text, messaging, social, media",
  desc: "Connect with friends and the world around you on TextMe.",
};

export default Meta;
