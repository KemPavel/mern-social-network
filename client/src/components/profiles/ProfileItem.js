import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const ProfileItem = ({profile}) => {
  const {user, status, company, location, skills} = profile;
  const {_id, name, avatar} = user;
    return (
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="avatar" />
        <div>
          <h2>{name}</h2>
          <p>{status} {company && <span> at {company}</span>}</p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
        </div>
        <ul>
          {
            skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="text-primary"><i className="fas fa-check"></i> {skill}</li>
            ))
          }
        </ul>
      </div>
    );
};

ProfileItem.propTypes = {
  profile: PropTypes.shape({
    user: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string
    }),
    status: PropTypes.string,
    company: PropTypes.string,
    location: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string)
  })
};

export default ProfileItem;