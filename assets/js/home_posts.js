{
//    method to create a form post using ajax
    let createPost=function()
    {
        let newPostForm=$('#new-post-form');
        newPostForm.submit(function(e)
        {
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',

                // it converts the data into json
                data:newPostForm.serialize(),
                success:function(data)
                {
                 let newPost=newPostDom(data.data.post);
                 $('#posts-list-container>ul').prepend(newPost);
                //  console.log(req.body);
                  deletePost($(' .delete-post-button',newPost));

                //   call the create comment class
                new PostComments(data.data.post._id);

                 // CHANGE :: enable the functionality of the toggle like button on the new post
                 new ToggleLike($(' .toggle-like-button', newPost));

                 new Noty({
                     theme: 'relax',
                     text: "Post published!",
                     type: 'success',
                     layout: 'topRight',
                     timeout: 1500
                     
                 }).show();


                },error:function(error)
                {
                    console.log(error.responseText);
                }
            });
        });
 }
// method to create a post in DOM

let newPostDom=function(post)
{
    // change:: show the count of zero likes on this post
    // bactic `` is qa feature in es6
    return $(`<li id="post-${ post._id }">
        <p>
        <div id="post-container">
        <div id="del-image"> 
            <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id }"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9eG-dTn_okDl1n9PVbCo5oKw23LxlaPFaNUEt1M4EnF-KDW6D"width="55px";height="50px";></a>
            </small>
            </div>
            
      <div id="post-content">${ post.content}
            <br>
    </div>
    <div id="post-name">
      <small>
      <p> posted by: ${ post.user.name}</p>
     </small>  
    </div>
    <!-- change:: display the likes of this part ,if the user is logged in then show the link -->
<br>
<small>
                            
<a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
    0 Likes
</a>

</small>
        </p>   
        <div class="post-comments">
               
              <form action="/comments/create" method="POST">
                      <input type="text" name="content" placeholder =" comment here" required>
                      <input type="hidden" name="post" value="${post._id}">
                      <input type="submit" value="ADD COMMENT">
              </form>
            
              <div class="post-comments-list">
    
                      <ul id="post-comments-${post._id }">
                            
                   
                    </ul>
              </div>
        </div>
      </li>`)
}
// mehtod to del the post from DOM
let deletePost=function(deleteLink)
{
    $(deleteLink).click(function(e)
    {
        e.preventDefault();
        $.ajax({
    type:'get',
    url: $(deleteLink).prop('href'),
    success:function(data)
    {
        $(`#post-${data.data.post_id}`).remove();

    },error:function(error)
    {
        console.log(error.responseText);
    }
    });
    });
}


 // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
 let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        let postId = self.prop('id').split("-")[1]
        new PostComments(postId);
    });
}



createPost();
 convertPostsToAjax();
}