import * as React from "react";

const GradesForm: React.SFC<any> = () => {
  return (
    <div className="grades-form">
      <div className="field-group">
        <div className="field">
          <label className="label is-small">NWEA Math percentile</label>
          <div className="control">

            <input className="input" type="number" />

          </div>
        </div>

        <div className="field">
          <label className="label is-small">NWEA Reading percentile</label>
          <div className="control">

            <input className="input" type="number" />

          </div>
        </div>
      </div>

      <div className="field-group">
        <div className="field fixed-width-small">
          <label className="label is-small">Math</label>
          <div className="control">
            <div className="select">

              <select>
                <option value="placeholder" disabled selected></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>

            </div>
          </div>
        </div>

        <div className="field fixed-width-small">
          <label className="label is-small">Reading</label>
          <div className="control">
            <div className="select">

              <select>
                <option value="placeholder" disabled selected></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>

            </div>
          </div>
        </div>

        <div className="field fixed-width-small">
          <label className="label is-small">Science</label>
          <div className="control">
            <div className="select">

              <select>
                <option value="placeholder" disabled selected></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>

            </div>
          </div>
        </div>

        <div className="field">
          <label className="label is-small">Social Studies</label>
          <div className="control">
            <div className="select">

              <select>
                <option value="placeholder" disabled selected></option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradesForm;
