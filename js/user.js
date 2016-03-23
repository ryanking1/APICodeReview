exports.User = function(data) {
  this.username = data.login;
  this.name = data.name;
  this.bio = data.bio;
  this.userURL = '<h1><a href="' + data.html_url + '">' + this.username + '</a></h1>';
  this.location = data.location;
  this.userImage = '<img src="' + data.avatar_url + '" alt="Avatar of ' + this.name + '" />';
  this.reposURL = data.repos_url;
};

//Personal API Key
//3a7233789c0beeffbbb5b4ff52b52615c1f0ea19
