


var params = {
    "api_key": "e1eee2b5677f408da40af8480a5fd5a8",
    //"LineCode": "RD"
    // Request parameters
};

function printError(msg){
    $('<h1>'+msg+'</h1>').appendTo('#rr');
}


function populateStations(lineCode){
    var params = {
        "api_key": "e1eee2b5677f408da40af8480a5fd5a8",
        "LineCode": lineCode
    };
    $.ajax({
        url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
        type: "GET",
    })
    .done(function(data) {
        var stations= data.Stations;
        for(var i=0;i<stations.length;i++){
            var StationName = stations[i].Name;
            var StationCode = stations[i].Code;
            $('#metro_station').append('<option value="'+StationCode+'">'+StationName+'</option>');
        }
    })
    .fail(function() {
        printError('Something went wrong. Check again later')
        $("#station_data").hide();
    });
}

function getStationInfo(selectedStationCode){
    var params = {
        "api_key": "e1eee2b5677f408da40af8480a5fd5a8",
         "LineCode": ""
      
    };
    $.ajax({
        url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
        type: "GET",
    })
    .done(function(data) {
        var Stations= data.Stations;
        for(var i=0;i<Stations.length;i++){
            var StationName = Stations[i].Name;
            var StationCode= Stations[i].LineCode1;
            var StationCity = Stations[i].Address.City;
            var StationState = Stations[i].Address.State;
            var StationStreet = Stations[i].Address.Street;
            var StationZip = Stations[i].Address.Zip;
            
            if(Stations[i].Code === selectedStationCode ){
                $('.station_title').html('<h1>'+StationName+'</h1>');
                $('.station_address').html ('<p>'+StationStreet+'<br> '+StationCity+' '+StationState+' '+StationZip+'</p>');
            
                $('.StationLineColor .rail-list').html('<li><span class="'+StationCode+'">'+StationCode+'</span></li>');
                
            };
      

          //  var trainColor;
          //  if(Stations[i].LineCode1 == 'RD'){
          //       trainColor = 'red';
          //   }
          //   else if(Stations[i].LineCode1 == 'GR'){
          //       trainColor = 'green';
          //   }
          // $('.stationColorWrapper').append('+trainColor+');
           // }
            
        }
    })
    .fail(function() {
        printError('Something went wrong. Check again later')
        $("#station_data").hide();
    });
}

function getStationData(stationCode){
    var params = {
        "api_key": "e1eee2b5677f408da40af8480a5fd5a8",
         "StationCodes": "All"
};
    // $('#station_data').hide();
    $.ajax({
        url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/"+stationCode+"?" + $.param(params),
        type: "GET",
    })
    .done(function(data) {
        $('#station_data tbody').empty();
        // $('h1').hide();
        var Trains = data.Trains;
        if(Trains == ''){
            printError('No trains available. Check again later');
            $("#station_data").hide();
        }
        
        for(i=0; i<Trains.length; i++){

            if(Trains[i].Line== 'RD'){
                trainColor = 'red';
            }
            else if(Trains[i].Line == 'GR'){
                trainColor = 'green';
            }
            else if(Trains[i].Line == 'BL'){
                trainColor = 'blue';
            }
            else if(Trains[i].Line == 'OR'){
                trainColor = 'orange';
            }
            else if(Trains[i].Line == 'SV'){
                trainColor = 'silver';
            }
            else if(Trains[i].Line == 'YL'){
                trainColor = 'yellow';
            }
            
            else{
                trainColor = '';
            }

            $('#station_data tbody').append('<tr><td class="'+trainColor+'"></td><td>'+Trains[i].Destination+'</td><td>'+Trains[i].Min+'</td></tr>');
        }

    })

    .fail(function() {
        // alert("error");
        printError('Something went wrong. Check again later')
        $("#station_data").hide();
    });
}



$(document).ready(function(){

    var selectedStationCode = '';

    $("#station_data").hide();
    $("#metro_station").hide();
    $('.station_info').hide();
    $('iframe').hide();
    // $(".aa").hide();

    // user select metro line
    $('.staionColor').on('click', function(){
        var stationColor = $(this).attr('id');
        $("#metro_station").html('<option value="Select Station">Select Station</option>').show();
        $('#station_data tbody').empty();
        // $('#station_data').hide();
        populateStations(stationColor);  
     });

    // user select station
    $('#metro_station').on('change', function(){
        $(".dropDown").show();
        selectedStationCode = $(this).val();
        getStationInfo(selectedStationCode);
        $('.station_info').show();
        $('iframe').show();
    });

    // $('.TrainIconWrapper .NextTrain').on('click', function(e){
    //     e.preventDefault();
    //     $("#station_data").show();
    //     getStationData(selectedStationCode);
    // });
     
    // 
      $('.TrainIconWrapper button').on('click', function(e){
        e.preventDefault();
        $('#myModal').show()
        $("#station_data").show();
        getStationData(selectedStationCode);
    });
   
   

//
        

    // $('#station_data').show();
    // var stationCode= $(this).val();
    // getStationData(stationCode);
    // var Station_line= $(this).css("id");
    // getStationColor(Station_line);
    
    // $(this).append('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d49574.807139200166!2d-77.46446060000001!3d39.051217599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1504324893600" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>');


         // getStationInfo();
        
    
});







