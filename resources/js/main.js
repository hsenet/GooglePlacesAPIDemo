$(document).ready(function(){
		$("#list-view").click(function() {
			$(".pre-loader").removeClass("hide");
			$(".searchresultsmap").fadeOut("slow").addClass("hide");
			$(".searchresultslist").fadeIn("slow").removeClass("hide");	
			showresults($('#search-input').val());	
			$("#map-view").removeClass("selected");
			$(this).addClass("selected");

		});
		$("#map-view").click(function() {
			$(".pre-loader").removeClass("hide");
			$(".searchresultslist").fadeOut("slow").addClass("hide");
			$(".searchresultsmap").fadeIn(1200).removeClass("hide");
			showresults($('#search-input').val());	
			$("#list-view").removeClass("selected");
			$(this).addClass("selected");
			
		});	
		var map;
		var service;
		var infowindow;		
		function showresults(searchstring) {
			  var singapore = new google.maps.LatLng(1.352083,103.819836);
			
			  map = new google.maps.Map(document.getElementById('map'), {
				  mapTypeId: google.maps.MapTypeId.ROADMAP,
				  center: singapore,
				  zoom: 11
				});
			
			  var request = {
				location: singapore,
				radius: 500,
				query: searchstring
			  };
			
			  service = new google.maps.places.PlacesService(map);
			  service.textSearch(request, callback);
		}
			
		function callback(results, status) {
			  var listhtml="";
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
				$(results).each(function(index,result) {
					if(index<=10) {
						createMarker(result);
						listhtml += "<li>" + result.formatted_address + "</li>";
					}
				});
				var locations = 10;
				if($(results).length < 10 ) {
					locations = $(results).length;
				}
				$("#locationindex").html(locations);
			  } else {
				  listhtml += "<li> Your query returned no results </li>";
			  }
			  
			  $(".pre-loader").addClass("hide");
			  $("#searchresultslist ul").html(listhtml);
			 
		}
		function createMarker(place) {
			var placeLoc = place.geometry.location;
			var marker = new google.maps.Marker({
			  map: map,
			  position: place.geometry.location
			});
	
			google.maps.event.addListener(marker, 'click', function() {
			  infowindow.setContent(place.name);
			  infowindow.open(map, this);
			});
      }
		
		$("#place-search").on("click",function() {
			var searchInput = $('#search-input').val();
			if(searchInput =='' || searchInput == 'Please enter a location') {
				 $('#search-input').val("Please enter a location").addClass("searcherror");
			} else {
				$(".pre-loader").removeClass("hide");
				if($("#searchresults").hasClass("hide")) {
					$(".search").animate({ marginTop: '50px'},800, function(){
						$("#searchresults").fadeIn(1400).removeClass("hide");
					});
				}
				showresults($('#search-input').val());
			}
		});
		$('#search-input').on("click",function() {
			$(this).val("").removeClass("searcherror");
		});
		$("#search-input").keypress(function (e) {
			if(e.which == 13) {
				var searchInput = $('#search-input').val();
				if(searchInput =='' || searchInput == 'Please enter a location') {
					 $('#search-input').val("Please enter a location").addClass("searcherror");
				} else {
					$(".pre-loader").removeClass("hide");
					if($("#searchresults").hasClass("hide")) {
						$(".search").animate({ marginTop: '50px'},800, function(){
							$("#searchresults").fadeIn(1400).removeClass("hide");	
						});
					}
					showresults($('#search-input').val());
				}
			}
		});
	
});
