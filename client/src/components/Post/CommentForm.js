import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from '../../actions/post';

const CommentForm = ({addComment, postId}) => {
  const [text, setText] = useState('');

  const onChangeHandler = (e) => {
    setText(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addComment(postId, {text});
    setText('');
  };


  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={onSubmitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          value={text}
          onChange={onChangeHandler}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func
};

export default connect(null, {addComment})(CommentForm);