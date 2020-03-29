// {
//     //    method to create a form post using ajax
//         let createComment=function()
//         {
//             let newCommentForm=$('#new-comment-form');
//             newCommentForm.submit(function(e)
//             {
//                 e.preventDefault();
    
//                 $.ajax({
//                     type:'comment',
//                     url:'/comments/create',
    
//                     // it converts the data into json
//                     data:newCommentForm.serialize(),
//                     success:function(data)
//                     {
//                      let newComment=newCommentDom(data.data.comment);
//                      $('#post-comments>ul').prepend(newComment);
//                     //   deleteComment($(' .delete-comment-button',newComment));
//                     console.log(data);
//                     },error:function(error)
//                     {
//                         console.log(error.responseText);
//                     }
//                 });
//             });
//         }
    
//         let newCommentDom=function(post)
//  {
//     // bactic `` is qa feature in es6

//     return $(`<li id="comment-${comment.id}">
//     <p>                                  
      
//      <div id="comment-del">    <small>
//                     <a class="delete-post-button" href="/comments/destroy/${ comment._id}"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9eG-dTn_okDl1n9PVbCo5oKw23LxlaPFaNUEt1M4EnF-KDW6D"width="30px";height="30px";></a>
//             </small>
//             </div>
            
//     </p>
//     <div id="comment-content">
//       ${ comment.content }</div>
//       <div id="comment-name">
//       ${ comment.user.name}
//     </div>
    
//           </p>
// </li>`)
// }

//         // method to delete the comment
//         createComment();
//     }
