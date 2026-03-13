import React from "react";
import { Helmet } from "react-helmet";

const DEFAULT_DESCRIPTION =
  "Explore the breathtaking beauty of Pulau Seribu with RFA Wisata. Book your island adventure today and experience crystal clear waters, pristine beaches, and unforgettable memories. Best island tour packages in Indonesia.";

const SeoHelmet = ({ title, description = DEFAULT_DESCRIPTION }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RFA Wisata Pulau Seribu RSS"
        href="/rss.xml"
      />
    </Helmet>
  );
};

export default SeoHelmet;
