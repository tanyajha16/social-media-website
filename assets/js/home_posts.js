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
                  deletePost($(' .delete-post-button',newPost));
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


 createPost();
}
