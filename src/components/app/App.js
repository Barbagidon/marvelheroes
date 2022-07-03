import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => {
  return import("../pages/SingleComicPage");
});
const SingleChar = lazy(() => {
  return import("../pages/SingleChar");
});

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Suspense fallback={<Spinner></Spinner>}>
          <main>
            <Routes>
              <Route path="/" element={<MainPage></MainPage>}></Route>
              <Route path="/comics" element={<ComicsPage />}></Route>
              <Route
                path="/comics/:comicId"
                element={<SingleComicPage />}
              ></Route>
              <Route path="*" element={<Page404 />}></Route>
              <Route
                path="/:name"
                element={<SingleComicPage createSingleChar={true} />}
              ></Route>
            </Routes>
          </main>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
