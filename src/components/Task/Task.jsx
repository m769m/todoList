import React from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";

import "./Task.css";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    const { onDeleted, onToggleCompleted, onToggleEditing, updateDescription, time } = this.props;

    this.onDeleted = onDeleted;
    this.onToggleCompleted = onToggleCompleted;
    this.onToggleEditing = onToggleEditing;
    this.updateDescription = updateDescription;

    this.state = { date: time };

    this.addTick = (date) => formatDistanceToNow(date, { includeSeconds: true });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  keyUp = (e) => {
    if (e.code === "Enter") {
      this.updateDescription(e.target.value);
      this.onToggleEditing();
    }
  };

  tick() {
    this.setState(({ date }) => ({
      date,
    }));
  }

  render() {
    const { date } = this.state;
    const { description, completed, editing } = this.props;

    let classNames = "";
    let change = false;

    if (completed) {
      classNames += " completed";
      change = true;
    }

    if (editing) {
      classNames += " editing";
    }

    const Edit = <input onKeyUp={this.keyUp} defaultValue={description} type="text" className="edit" />;

    return (
      <li className={classNames}>
        <div className="view">
          <input defaultChecked={change} onClick={this.onToggleCompleted} className="toggle" type="checkbox" />

          <label>
            <span className="description">{description}</span>
            <span className="created">created {this.addTick(date)} ago</span>
          </label>

          <button onClick={this.onToggleEditing} className="icon icon-edit" />
          <button onClick={this.onDeleted} className="icon icon-destroy" />
        </div>

        {editing ? Edit : false}
      </li>
    );
  }
}

Task.propTypes = {
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};
