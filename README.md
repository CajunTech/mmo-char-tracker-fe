# New World Character Tracker
![nwcharmain](https://user-images.githubusercontent.com/89054252/142974415-a463eb5d-66e8-44ba-bfd1-a907d81f033c.png)


Link to application - https://nw-char.surge.sh/
<br>

# Technologies used:</br>
React, Node.js, PostgreSQL, JavaScript, CSS (Bootstrap), Sequelize ORM, Amazon S3, Surge and Heroku for hosting
<br>

# Reason for application and approach:
New World is a game released by Amazon in October 2021. This application was designed to allow players of New World to keep character information, screenshots, etc. with the intent of having a site to display transmogs like many other MMOs once they are introduced to the game. I started out with a focus on authentication, encryption and JSON Web Tokens. I ran into issues with JSON Web Tokens and then began to leverage local storage (first time using) in an attempt to handle some form of user/state persistance on page revisits and refreshes. I was able to build in CRUD functionality for all three aspects (users, characters, images) of the current application and leveraged Amazon S3 for image storage. 
<br>
<br>
ERD:
<br>
![nwcharerd](https://user-images.githubusercontent.com/89054252/142975615-e42fecea-5bd7-44a9-b47b-12287eb62271.png)

</br>

User Stories:
- As a User I would like the ability to create account.
- As a User I would like the ability to login to application.
- As a User I would like the ability to edit my account details.
- As a User I would like the ability to delete account.
- As a User I would like the ability to create characters.
- As a User I would like the ability to edit my characters.
- As a User I would like the ability to delete my characters.
- As a User I would like the ability to easily view and access characters I have created.
- As a User I would like the ability to create images.
- As a User I would like the ability to edit my images.
- As a User I would like the ability to delete my images.
- As a User I would like the ability to easily view and access images I have created.
<br>

# Main features (* denotes first time using):
- User profile page showing user's characters and images
- Amazon S3 integration*
- Local Storage utilization*
<br>

User profile (contributed/favorite) sample:
<br>
![recipeshare_profile](https://user-images.githubusercontent.com/89054252/137161720-098786b3-b8fe-487f-aed3-28a6fbe44a62.png)
<br>
Code snippet of dynamic Favorite, Edit, and Delete button creation:
```js
      <% if (!isFavorite) { %>
        <form action="/recipes/<%=recipe.id%>/favorites?_method=PUT" method="POST">
        <input class="btn btn-primary" type="submit" value="Add to Favorites" />
        </form>
        <%}%>
      <% if (recipe.author === amAuthor || amAdmin === 'admin') { %>
    <a href='/recipes/<%=recipe.id%>/edit'><input class="btn btn-primary" type="button" value='Edit Recipe'/></a> 
    <form action="/recipes/<%=recipe.id%>?_method=DELETE" method="POST">
      <input class="btn btn-primary" type="submit" value="Delete Recipe" />
  </form> 
  <% } %>
  ```
  Code snippets of dynamic step creation of recipes (users are asked to press enter after each step when creating/editing a recipe):
  ```js
    let instruction = recipe.instructions.split('\n');
	let ingredient = recipe.ingredients.split('\n');
	res.render('recipes/show.ejs', {
		recipe,
		instruction,
		ingredient,
 ```
 ```js
 <h2>Ingredients:</h2>
<hr style="max-width:600px;">
<div>
  <ul>
  <% for (i=0; i<ingredient.length; i++) { %>
    <li style='list-style-type:none'><%= ingredient[i] %></li> 
    <% } %>
    </ul>
</div>
<h2>Instructions:</h2>
<hr style="max-width:600px;">
<div>
  <% for (i=0; i<instruction.length; i++) { %>
    <p><span style="font-weight: bold">Step <%=i+1%> :</span><%= instruction[i] %></p> 
    <% } %>
</div>
```
<br>

# Known issues:
- When working with a recipe that has text, but no link (missing \ or http:\\ at beginning) get a strange error in server console where a sequel statement ends with recipe.id = image field text. This does not occur when the text in image field begins with \ or http:\\ even if it is not a valid link. In this case the recipe.id = the actual integer recipe UID. All items continue to function fine in either instance.

<br>


# What's left:
- Allow users to logout of application.
- Allow admin to edit/delete users.
- Allow filtering by cuisine and recipe author.
- Add search functionality
- Add recipe rating system
- Replace password entry with asterisks on relative fields
</br>
</br>
</br>
</br>
</br>
This website may contain copyrighted material, the use of which may not have been specifically authorized by the copyright owner. The material contained in this website is distributed without profit for research and educational purposes.
This should constitute a ‘fair use’ of any such copyrighted material (referenced and provided for in section 107 of the US Copyright Law).
If you wish to use any copyrighted material from this site for purposes of your own that go beyond ‘fair use’, you must obtain expressed permission from the copyright owner.

