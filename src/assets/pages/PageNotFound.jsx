import { Header } from '../components/Header';
import './PageNotFound.css';
import '../components/General.css';

export function PageNotFound() {
  return (
    <>
      <Header />

      <div className="not-found-page">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </>
  );
}
