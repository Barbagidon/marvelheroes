import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";
import Error from "../components/error/Error";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;

    case "loading":
      return <Spinner />;

    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <Error />;
    default:
      throw new Error("Unexpected process");
  }
};

export default setContent;
