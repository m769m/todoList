import React from "react";
import PropTypes from "prop-types";

import "./NewTaskForm.css";

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
    };
  }

  updateDescription = (e) => {
    this.setState(() => ({
      description: e.target.value,
    }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { onAddTask } = this.props;
    const { description } = this.state;

    onAddTask(description);
    this.setState(() => ({
      description: "",
    }));
  };

  render() {
    const { description } = this.state;

    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>

        <input
          onChange={this.updateDescription}
          value={description}
          className="new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};
