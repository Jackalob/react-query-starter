import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/Home";
import { RQSuperHeroesPage } from "./pages/RQSuperHeroes";
import { SuperHeroesPage } from "./pages/SuperHeroes";
import RQSuperHeroPage from "./pages/RQSuperHero";
import ParallelQueries from "./pages/ParallelQueries";
import DynamicParallel from "./pages/DynamicParallel";
import Test13Page from "./pages/Test.13";
import DependentQueries from "./pages/DependentQueries";
import PaginatedQueries from "./pages/PaginatedQueries";
import InfiniteQueries from "./pages/InfiniteQueries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
              <li>
                <Link to="/test-13">RQ Test. 13</Link>
              </li>
              <li>
                <Link to="/parallel">Parallel Queries</Link>
              </li>
              <li>
                <Link to="/dynamic-parallel">Dynamic Parallel</Link>
              </li>
              <li>
                <Link to="/dependent-queries">Dependent Queries</Link>
              </li>
              <li>
                <Link to="/paginated-queries">Paginated Queries</Link>
              </li>
              <li>
                <Link to="/infinite-queries">Infinite Queries</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/paginated-queries">
              <PaginatedQueries />
            </Route>
            <Route path="/infinite-queries">
              <InfiniteQueries />
            </Route>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes/:heroId">
              <RQSuperHeroPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/dynamic-parallel">
              <DynamicParallel heroId={[1, 3]} />
            </Route>
            <Route path="/dependent-queries">
              <DependentQueries email="vishwas@example.com" />
            </Route>
            <Route path="/parallel">
              <ParallelQueries />
            </Route>
            <Route path="/test-13">
              <Test13Page />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
