"use strict";
(function () {

  var url = 'https://api.lever.co/v0/postings/leverdemo?mode=json'

  function createJobs(_data) {
    for(i = 0; i < _data.length; i++) {
      var posting = _data[i] 
      var title = posting.text
      var description = posting.descriptionPlain 
      //Making each job description shorter than 250 characters
      var shortDescription = $.trim(description).substring(0, 250)
      .replace('\n', ' ') + "...";
      var location = posting.categories.location
      var commitment = posting.categories.commitment
      var team = posting.categories.team
      var link = posting.hostedUrl

      $('#jobs-container .jobs-list').append(
        '<div data-link="'+link+'" class="job '+team+' '+location+' '+commitment+'">' +
          '<h3 class="job__title" href="'+link+'"">'+title+'</h3>' +
          '<span class="job__location">'+location+'</span>' +
          '<p class="job__description">'+shortDescription+'</p>' +
          '<span class="btn btn--small btn--primary">Apply</span>' +
        '</div>'  
      );
    }
  }

  //Fetching job postings from Lever's postings API
  $.ajax({
    dataType: "json",
    url: url,
    success: function(data){
      createJobs(data);
    }
  });

  //Making each job description a link
  $("#jobs-container").on("click", ".job", function() {
      var link = $(this).data("link");
      window.location.href = link;
  });

}());