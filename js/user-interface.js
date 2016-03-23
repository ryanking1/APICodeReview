var gitHubKey = require('./../.env').gitHubKey;
var User = require('./../js/user.js').User;
var searchUsername = "";
var gitUser;

var findUser = function() {
  $.get('https://api.github.com/users/' + searchUsername + '?access_token=' + gitHubKey)

  .then(function(userData) {
    gitUser = new User(userData);
    $('#results').addClass('well');
    // $('#image').empty();
    $('#username').empty();
    // $('#image').append(gitUser.userImage);
    $('#username').append(gitUser.userURL);
    $('#name').text(gitUser.name);
    $('#location').text(gitUser.location);
    if(gitUser.bio) {
      $('#bio').text(gitUser.bio);
    }
    findRepos();
    console.log(userData);
  })

   .fail(function(error) {
    console.log(error.responseJSON.message);
  });
};

findRepos = function() {
   $.get(gitUser.reposURL + '?per_page=100&sort=updated', function(repoData) {
     console.log(repoData);
     $('.display-repos').empty();
     $('#info-toggle').show();
     $('.display-head').append('<tr><th>Language</th><th>Title</th><<th>Description</th>/tr>');
     for (var repo in repoData) {
       $('.display-repos').append('<tr><td class="language">' + repoData[repo].language + '</td><td><a href="' + repoData[repo].html_url + '">' + repoData[repo].name + '</a>' + '<td>' + repoData[repo].description + '</td></tr>');
     }
   })

   .fail(function(error) {
     console.log(error.responseJSON.message);
   });
};


$(document).ready(function() {
  $('#info-toggle').hide();
  $('#search').click(function(){
    searchUsername = $('#searchUser').val();
    findUser();
  });
});
