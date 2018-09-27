import React, { Component } from 'react';
import axios from 'axios';

import noImage from './../../assets/missing.png';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      author_pic: '',
      title: '',
      img: '',
      content: '',
      loading: true
    }
  }
  componentDidMount() {
    axios.get(`/api/post/${this.props.match.params.id}`)
      .then(res => {
        //console.log(res.data);
        setTimeout(() => this.setState({
          author: res.data[0].username,
          author_pic: res.data[0].profile_pic,
          title: res.data[0].title,
          img: res.data[0].img,
          content: res.data[0].content,
          loading: false
        }), 500)
      })
  }
  render() {
    let imgSrc = this.state.img ? this.state.img : noImage;
    return (
      <div className='Post content_box'>
        {!this.state.loading && this.state.title
          ?
          <div>
            <div className='post_header'>
              <h2 className='title'>{this.state.title}</h2>
              <div className='author_box'>
                <p>by {this.state.author}</p>
                <img src={this.state.author_pic} alt='author' />
              </div>
            </div>
            <div className='post_content_box'>
              <div className='post_img' style={{ backgroundImage: `url('${imgSrc}') ` }} alt='post' ></div>
              <p>{this.state.content}</p>
            </div>
          </div>
          :
          !this.state.loading
            ?
            <div className='oops_box'>
              <h2 className='title'>Oops!</h2>
              <p>Looks like this post doesn't exist anymore</p>
            </div>
            :
            <div className='load_box'>
              <div className='load_background'></div>
              <div className='load'></div>
            </div>
        }
      </div>
    )
  }
}

export default Post;