import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';

import {addLike, removeLike, deletePost} from '../../actions/post';

const PostItem = ({auth, post, addLike, removeLike, deletePost, showActions}) => {
  const {_id, text, name, avatar, user, likes, comments, date} = post;
  const onLikeHandler = () => {
    addLike(_id);
  };

  const onUnlikeHandler = () => {
    removeLike(_id);
  };

  const onDeletePostHandler = () => {
    deletePost(_id);
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
          showActions &&
          <Fragment>
            <button onClick={onLikeHandler} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span> {likes.length || ''}</span>
            </button>
            <button onClick={onUnlikeHandler} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion <span>{comments.length || ''}</span>
            </Link>
            {
              (!auth.loading && user === auth.user._id)  &&
              <button
                type="button"
                className="btn btn-danger"
                onClick={onDeletePostHandler}
              >
                <i className="fas fa-times"></i>
              </button>
            }
          </Fragment>
        }
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object,
  addLike: PropTypes.func,
  deletePost: PropTypes.func,
  removeLike: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem);