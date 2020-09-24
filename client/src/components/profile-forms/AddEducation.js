import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { withRouter } from "react-router-dom";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: ""
  });
  const [toDateDisable, settoDateDisable] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData;

  const onChangeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Add An Education</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or college or
        bootcamp that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmitHandler(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree"
            name="degree"
            required
            onChange={(e) => onChangeHandler(e)}
            value={degree}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School"
            name="school"
            required
            onChange={(e) => onChangeHandler(e)}
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field of study"
            name="fieldofstudy"
            onChange={(e) => onChangeHandler(e)}
            value={fieldofstudy}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            onChange={(e) => onChangeHandler(e)}
            value={from}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                settoDateDisable(!current);
              }}
            />{" "}
            Current Institution
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            onChange={(e) => onChangeHandler(e)}
            value={to}
            disabled={toDateDisable ? "disabled" : ""}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            onChange={(e) => onChangeHandler(e)}
            value={description}
          ></textarea>
        </div>
        <input
          type="submit"
          className="btn btn-primary my-1"
          onSubmit={(e) => onSubmitHandler(e)}
        />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
