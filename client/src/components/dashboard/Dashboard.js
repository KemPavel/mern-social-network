import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import {deleteEducation, deleteExperience, deleteAccount} from '../../actions/profile';

const Dashboard = ({getCurrentProfile, deleteEducation, deleteExperience, deleteAccount, auth: {user}, profile: {loading, profile}}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    (loading && profile === null) ? <Spinner /> : <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {
        (profile === null) ?
          <Fragment>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create profile</Link>
          </Fragment> :
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} deleteExp={deleteExperience} />
            <Education education={profile.education} deleteEdu={deleteEducation} />
            <div className="my-2">
              <button className="btn btn-danger" onClick={deleteAccount}>
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment>
      }
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
  }),
  profile: PropTypes.shape({

  }),
  deleteEducation: PropTypes.func,
  deleteAccount: PropTypes.func,
  deleteExperience: PropTypes.func
};

export default connect(mapStateToProps, {getCurrentProfile, deleteEducation, deleteExperience, deleteAccount})(Dashboard);