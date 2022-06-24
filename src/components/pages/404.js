import Error from "../error/Error";
import { Link } from "react-router-dom";

const Page404 = () => {
  <Error />;

  return (
    <div>
      <div>
        <Error />
        <p
          style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}
        >
          Page doesn't exist
        </p>
        <Link
          style={{
            display: "block",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
            marginTop: "30px",
          }}
          to="/"
        >
          Back to main page
        </Link>
      </div>
    </div>
  );
};

export default Page404;
