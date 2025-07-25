"use client";
interface DetailsErrorProps {
  error: Error;
}

const DetailsError = ({ error }: DetailsErrorProps) => {
  return <p>Could not fetch movie details. {error.message}</p>;
};

export default DetailsError;
