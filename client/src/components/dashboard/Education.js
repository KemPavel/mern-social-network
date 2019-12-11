import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const Education = ({education, deleteEdu}) => {
  const onDeleteHandler =() => {
    deleteEdu(education._id);
  };

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {' '}
        {(edu.to === null) ? " Now" : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
      </td>
      <td><button className="btn btn-danger" onClick={onDeleteHandler}>Delete</button></td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
        <tr>
          <th>School</th>
          <th className="hide-sm">Degree</th>
          <th className="hide-sm">Years</th>
          <th />
        </tr>
        </thead>
        <tbody>
        {educations}
        </tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      school: PropTypes.string,
      degree: PropTypes.string,
      from: PropTypes.string,
      to: PropTypes.string
    })
  ),
  deleteEdu: PropTypes.func
};

export default Education;