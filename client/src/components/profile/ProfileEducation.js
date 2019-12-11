import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({edu}) => {
  const {school, degree, fieldofstudy, to, from, description} = edu;
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p><Moment format="DD/MM/YYYY">{from}</Moment> - {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : ' Now'}</p>
      <p><strong>Degree: </strong>{degree}</p>
      <p><strong>Field of study: </strong>{fieldofstudy}</p>
      <p><strong>Description: </strong>{description}</p>
    </div>
  );
};

ProfileEducation.propTypes = {
  edu: PropTypes.object
};

export default ProfileEducation;