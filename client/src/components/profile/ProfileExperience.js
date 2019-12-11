import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({exp}) => {
  const {company, title, to, from, description} = exp;
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p><Moment format="DD/MM/YYYY">{from}</Moment> - {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : ' Now'}</p>
      <p><strong>Position: </strong>{title}</p>
      <p><strong>Description: </strong>{description}</p>
    </div>
  );
};

ProfileExperience.propTypes = {
  exp: PropTypes.object
};

export default ProfileExperience;