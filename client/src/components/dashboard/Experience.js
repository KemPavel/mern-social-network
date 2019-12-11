import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Experience = ({experience, deleteExp}) => {
  const onDeleteHandler =() => {
    deleteExp(experience._id);
  };

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {' '}
        {(exp.to === null) ? " Now" : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
      </td>
      <td><button className="btn btn-danger" onClick={onDeleteHandler}>Delete</button></td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
        <tr>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th />
        </tr>
        </thead>
        <tbody>
          {experiences}
        </tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      company: PropTypes.string,
      title: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string
    })
  ),
  deleteExp: PropTypes.func
};

export default Experience;