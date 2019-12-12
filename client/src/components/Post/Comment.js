import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {deleteComment} from '../../actions/post';

const Comment = ({postId, comment, deleteComment, auth}) => {
  const {_id, text, name, avatar, user, date} = comment;
  const onDeleteHandler = () => {
    deleteComment(postId, _id);
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src={avatar}
            alt="avatar"
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {
          (!auth.loading && user === auth.user._id) &&
          <button className="btn btn-danger" onClick={onDeleteHandler} type="button">
            <i className="fas fa-times"></i>
          </button>
        }
      </div>
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.object,
  deleteComment: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(Comment);