import { useState, useEffect } from 'react';

export default function TodoData() {
  const [todoID, setTodoID] = useState('');
  const [todoData, setTodoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoID.trim() === '') {
      alert('Please enter a todo ID');
      return;
    }
    setError(null);
    setTriggerFetch(true);
  };

  useEffect(() => {
    const fetchTodoData = async () => {
      if (!triggerFetch) return;

      setIsLoading(true);
      setTodoData(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${todoID}`
        );
        if (!response.ok) {
          throw new Error('Error! Please try again.');
        }
        const data = await response.json();
        setTodoData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setTriggerFetch(false);
      }
    };

    fetchTodoData();
  }, [triggerFetch, todoID]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
      <div className="container text-center">
        <h1 className="mb-4">Fetch Todo Data</h1>
        <form onSubmit={handleSubmit} className="mb-3">
          <h6>Enter a Todo ID </h6>
          <div className="w-50 mx-auto">
            <input
              type="text"
              id="todoID"
              className="form-control mb-3"
              value={todoID}
              onChange={(event) => setTodoID(event.target.value)}
              placeholder="e.g., 1"
            />
          </div>
          <button type="submit" className="btn btn-primary w-80">
            Fetch Todo Data
          </button>
        </form>
      </div>

      {isLoading && <p className="text-primary">Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      {todoData && (
        <div className="card w-80 mx-auto text-start mt-4">
          <div className="card-body">
            <h5 className="card-title">Todo ID: {todoData.id}</h5>
            <p className="card-text">Title: {todoData.title}</p>
            <p className="card-text">
              Completed: {todoData.completed ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
