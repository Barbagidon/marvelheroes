import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import { Helmet } from "react-helmet";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list with our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner></AppBanner>
      <ComicsList></ComicsList>
    </>
  );
};

export default ComicsPage;
