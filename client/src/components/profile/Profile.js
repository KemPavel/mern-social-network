import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getProfileById} from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import GithubProfile from './GithubProfile';


const Profile = ({match, getProfileById, profile: {profile, loading}, auth}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {
        (profile === null || loading) ?
          <Spinner/> :
          <Fragment>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            {
              auth.isAuthenticated && !loading && auth.user._id === profile.user._id &&
              <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
            }
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {
                  (profile.experience && profile.experience.length) ?
                    <Fragment>
                      {profile.experience.map((exp) => <ProfileExperience key={exp._id} exp={exp} />)}
                    </Fragment> :
                    <h4>No Experience Credentials</h4>
                }
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {
                  (profile.education && profile.education.length) ?
                    <Fragment>
                      {profile.education.map((edu) => <ProfileEducation key={edu._id} edu={edu} />)}
                    </Fragment> :
                    <h4>No Education credentials</h4>
                }
              </div>
              {
                profile.githubusername &&
                <GithubProfile userName={profile.githubusername} />
              }
            </div>
          </Fragment>
      }
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  getProfileById: PropTypes.func,
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {getProfileById})(Profile);