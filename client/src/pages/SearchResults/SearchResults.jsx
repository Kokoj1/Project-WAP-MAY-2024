import { useParams } from "react-router-dom";

export default function() {

  const { query } = useParams();

  // Search logic

  return (
    <>
      <p>Showing results for {query}</p>
    </>
  );
}