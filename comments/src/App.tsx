import React, { useEffect, useState } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  name: string;
  id: number;
  email: string;
  body: string;
};

type User = {
 id: number;
 name: string;
 phone: string;
 username: string;
 website: string;
 email: string;
};

const App = () => {
  const [postId, setPostId] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]); 
  const [post, setPost] = useState<Post>();
  const [user, setUser] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsReq = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const posts = await postsReq.json();
      setPosts(posts);
    }
    getPosts();
  }, []);
  
  useEffect(() => {
    const post = posts[postId-1];
    setPost(post);
  }, [postId, posts]);

  useEffect(() => {
    setUser(undefined);
    const getUser = async () => {
      const userReq = await fetch(`https://jsonplaceholder.typicode.com/users/${post?.userId}`);
      const user = await userReq.json();
      setUser(user);
    }
    getUser();
  }, [post]);

  useEffect(() => {
    setComments([]);
    const getComments = async (id: number) => {
      const commentsReq = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      const comments = await commentsReq.json();
      setComments(comments);
    } 
    if (post) {
      getComments(post?.id);
    }
  }, [post]);


  return (
      <div className="app">
          <div className="menu">
            Select Post:
            <select onChange={(e) => setPostId(Number(e.target.value))}>
              {posts.map((post) => (
                <option value={post.id}>{post.id}</option>
              ))}
            </select>
          </div>
        {post ? (
          <div className="postContainer">
            <div className="post">
              <div className="user">
                <div className="userUsername">{user?.username}</div>
                <div className="userEmail">({user?.email})</div>
              </div>
              <div className="title">
                {post?.title}
              </div>
              <div className="body">
                {post?.body}
              </div>
            </div>
            <div className="comments">
                {comments.map((comment) => (
                  <div className="comment">
                    <div className="commentHead">
                      <div className="commentName">{comment.name}</div>
                      <div className="commentEmail">{comment.email}</div>
                    </div>
                    <div className="commentBody">
                      {comment.body}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div>Post not found.</div>
        )}
      </div>
  );
}

export default App;
