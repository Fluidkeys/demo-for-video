$(document).ready(function() {

  $('.scan-results').hide();
  $('#report').hide();

  $('.btn').on('click', function() {
    var $this = $(this);
    var loadingText = $(this).data('loading-text');
    if ($(this).html() !== loadingText) {
      $this.attr('disabled', true);
      $this.data('original-text', $(this).html());
      $this.html(loadingText);
      $('.scan-results').show();
      $('.progress-bar').each(function() {

        var valueNow = $(this).attr('aria-valuenow');

        $(this).animate({
          width: valueNow + '%',
          percent: 100
        }, {
          duration: 6000,
          progress: function(a, p, n) {
            $(this)
              .css('width', (valueNow * p + '%'))
          }
        });

      });

      var i;
      var timesToAppear = [];
      var numberOfPeople = $("#people tbody tr").length

      var keyFor = {};

      for (i = 0; i < numberOfPeople; i++) { 
        timesToAppear.push(Math.floor(Math.random() * 6000) + 1);
        keyFor[i] = false;
      }

      timesToAppear.sort((a, b) => a - b);

      $("#people tbody tr").each(function(i) {
          $(this).delay(timesToAppear[i]).queue(function() {
            $(this).fadeIn(100);

            var tr = $(this);
            var counter = 0;
            var numberOfKeys = $(this).data('key-count');
            var div = $(this).find('.key-count');
            setTimeout(function(){
                var st = setInterval(function(){
                if (counter == 0) {
                  append = "key"
                } else {
                  append = "keys"
                }
                div.html(++counter + " " + append);
                if (counter == numberOfKeys){
                  tr.find('.status-text').html("Downloading " + append);
                  setTimeout(
                  function() 
                  {
                    tr.find('.status-text').html("Checking " + append + " against best practice");
                    setTimeout(
                    function() 
                    {
                      tr.find('.fa-spinner').hide();
                      tr.find('.status-text').html("Complete");
                      keyFor[i] = true;
                      console.log(keyFor);

                      for (var k in keyFor) {
                        if (keyFor[k] == false) {
                          $('#report').hide();
                          break;
                        } else {
                          $('#report').show();
                        }
                      }

                    }, numberOfKeys * 700);
                  }, numberOfKeys * 500);
                  clearInterval(st);
                }
              },500)
            });

            $(this).find('.status-text').html("Searching for keys");

            $(this).dequeue();
          });
      });

    }
    setTimeout(function() {
      $this.html($(this).data('finished-text'));
    }, 7000);

  });

  $('#test-results').hide()

  $('#view-test-button').click(function(){
    $("#test-results").toggle();
    if ($(this).data('pressed') == true) {
      $(this).data('pressed', false);
      $(this).html('<i class="fas fa-angle-down"></i> View test results</a>');
    } else {
      $(this).data('pressed', true);
      $(this).html('<i class="fas fa-angle-up"></i> Hide test results</a>');
    }
  });

})
