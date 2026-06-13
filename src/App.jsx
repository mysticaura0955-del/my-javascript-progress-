import { useState } from "react";
import "./App.css";

function App() {
  const [title, settitle] = useState("");
  const [notes, setnotes] = useState("");
  const [showPreview, setshowPreview] = useState(false);
  const [task, settask] = useState([]);

  const submithandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !notes.trim()) return;
    const newtask = { id: Date.now(), heading: title, details: notes };
    const copyTask = [...task, newtask];
    settask(copyTask);
    console.log(copyTask);
    setnotes("");
    settitle("");
    setshowPreview(false);
  };
  const deletehandler = (index) => {
    const newtask = task.filter((item, i) => i !== index);
    settask(newtask);
  };
  const isFormEmpty = !title.trim() && !notes.trim();
  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <input
            type="text"
            placeholder="enter the heading"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />

          <textarea
            placeholder="write your notes"
            value={notes}
            onChange={(e) => {
              setnotes(e.target.value);
            }}
          ></textarea>

          <div>
            <button type="submit">Add Notes</button>
            <button
              type="button"
              disabled={isFormEmpty}
              onClick={() => setshowPreview(!showPreview)}
            >
              preview note
            </button>
          </div>
        </form>
        <div>
          {showPreview === true && (
            <div className="mresult">
              <h3>{title || "Unttitled"}</h3>
              <p>{notes || "no content..."}</p>
            </div>
          )}{" "}
        </div>

        <div id="result">
          {task.map((task, index) => {
            return (
              <div className="mresult" key={index}>
                <h3>{task.heading}</h3>
                <p>{task.details}</p>
                <button
                  className="delete-btn"
                  onClick={() => deletehandler(index)}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
