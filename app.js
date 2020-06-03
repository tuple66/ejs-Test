//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];
const shortPosts = [];



const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// This renders the home screen and delivers the contents of the posts array (objects)
app.get("/", function(req,res){
  res.render("home",{
    newPost: posts,
  });

})




app.get("/about", function(req,res){
  res.render("about",{
  titleText:"About",
  paraText:aboutContent
  });

})

app.get("/contact", function(req,res){
  res.render("contact",{
    titleText:"Contact",
    paraText:contactContent
  });
})

app.get("/compose",function(req,res){
  res.render("compose",{
  titleText:"Compose",
  });
});

// This takes the post information and converts it into an object with keys of title and content
// This is new info is then pushed into the posts array and the hone screen called
app.post("/compose", function(req,res){
  const post = {
    title:req.body.blogTitle,
    content: req.body.blogText
  };
  posts.push(post);
  res.redirect("/");
});
  
app.get("/posts/:post", function(req,res){
  const requestedTitle = _.lowerCase(req.params.post);

  //This code iterates through the posts array and uses the variable post
  // this is then converted to lower case and has any formatting removed and is compared
  //against the requested page. when matched then new post screen is rendered and uses
  // the current post values and sends these across to the post screen
  posts.forEach (function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (requestedTitle === storedTitle) {
      res.render("post",{
        titleText:post.title,
        content:post.content,
      });
  } 
});
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
