import { Link } from 'react-router-dom';

function NotFoundView() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-primary text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Oops! Page not found.
        </h2>
        <p className="text-lg mb-6">
          We couldn't find the page you were looking for. It might have been
          moved or deleted.
        </p>
        <Link
          to="/"
          className="text-white bg-gradient-to-r from-orange-500 to-red-600 py-3 px-6 rounded-lg shadow-lg hover:bg-accent"
        >
          Go to Home
        </Link>
      </div>
    </section>
  );
}

export default NotFoundView;
