(function($){
  var ListView = Backbone.View.extend({
    el: $('body'),

    events: {
      'click button#show': 'showModal'
    },

    initialize: function(){
      _.bindAll(this, 'showModal', 'initAutocomplete');
      this.render();
    },

    showModal: function(){
      $('#myModal').modal();
      this.hiddenModal();
      this.initAutocomplete();
    }, 

    hiddenModal: function(){
      $('#myModal').on('hidden', function () {
        $( "#city" ).val('');
      });
    },

    initAutocomplete: function(){
      $( "#city" ).autocomplete({
        source: function( request, response ) {
          $.ajax({
            url: "http://ws.geonames.org/searchJSON",
            dataType: "jsonp",
            data: {
              featureClass: "P",
              style: "full",
              maxRows: 12,
              name_startsWith: request.term
            },
            success: function( data ) {
              response( $.map( data.geonames, function( item ) {
                return {
                  label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
                  value: item.name
                }
              }));
            }
          });
        },
        minLength: 2,
        open: function() {
          $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
          $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
      });
    }

  });

  var listView = new ListView();
})(jQuery);