import {useState, useEffect} from "react";

export function getEditorials() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4444/api/v1/book-reserve/editorials`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return {data, loading, error};
}

export function getEditorialById(editorialId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4444/api/v1/book-reserve/editorials/${editorialId}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);
  return {data, loading, error};
}
