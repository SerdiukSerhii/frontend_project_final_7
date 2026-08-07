'use client';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};
const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div style={{ padding: 20, color: 'blue' }}>
      <h2>Something went wrong while loading notes</h2>

      <p>{error.message}</p>

      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorPage;
