(function (){
  'use strict';

  $(document).ready(init);

  var selected;
  var moveTarget;
  //var totalPieces;

  function init(){
    $('#board').on('click', 'td.valid.player.current', select);
    $('#board').on('click', 'td.valid:not(.player)', move);
    setBoard();
  }

  function setBoard(){
    var $red = $('td.valid[data-y=0], td.valid[data-y=1], td.valid[data-y=2]');
    var $white = $('td.valid[data-y=5], td.valid[data-y=6], td.valid[data-y=7]');

    for(var i=0; i < $red.length; i++){
      var $wPiece = $('<img>').attr('src', './media/white.png');
      var $rPiece = $('<img>').attr('src', './media/red.png');

      $($red[i]).append($rPiece);
      $($red[i]).addClass('player').addClass('red');

      $($white[i]).append($wPiece);
      $($white[i]).addClass('player').addClass('white').addClass('current');
    }

    //totalPieces = $('.player').length;
  }

  function select(){
    if(selected){
      selected.removeClass('selected');
    }

    var $target = $(this).addClass('selected');
    selected = $target;
  }

  function move(){
    moveTarget = $(this);

    var finalX = moveTarget.data('x');
    var finalY = moveTarget.data('y');

    var initialX = selected.data('x');
    var initialY = selected.data('y');

    var vector = [];
    vector.push(finalX - initialX);
    vector.push(finalY - initialY);

    if(Math.abs(vector[0]) + Math.abs(vector[1]) === 4){
      if(direction()){
        var avgX = average(selected.data('x'), moveTarget.data('x'));
        var avgY = average(selected.data('y'), moveTarget.data('y'));
        var $deadPiece = $('td[data-x=' + avgX + '][data-y=' + avgY +']');

        if($deadPiece.hasClass('player') && !$deadPiece.hasClass('current')){

          $deadPiece.empty();
          $deadPiece.removeClass('player');
          movePiece();
          endTurn();
        }
      }
    }else if(Math.abs(vector[0]) + Math.abs(vector[1]) === 2){
      if(direction()){
        movePiece();
        endTurn();
      }
    }
  }

  function direction(){
    if(selected.hasClass('king')){
      return true;
    }

    if(selected.hasClass('white')){
      if(moveTarget.data('y') < selected.data('y')){
        return true;
      }else{
      return false;
      }
    }else{
      if(moveTarget.data('y') > selected.data('y')){
        return true;
      }
      return false;
    }
  }

  function average(x,y){
    return (x+y)/ 2;
  }

  function movePiece(){
    if(!moveTarget.hasClass('player')){
      var $token = selected.find('img');
      selected.empty();
      moveTarget.append($token);

      selected.removeClass('selected').removeClass('player').removeClass('current');
      moveTarget.addClass('player').addClass('current');

      if(selected.hasClass('white')){
        selected.removeClass('white');
        moveTarget.addClass('white');
        if(moveTarget.data('y') === 0){
          moveTarget.addClass('king');
          moveTarget.empty();
          moveTarget.append($('<img>').attr('src', './media/white-crown.png'));
        }
      } else{
        selected.removeClass('red');
        moveTarget.addClass('red');
        if(moveTarget.data('y') === 7){
          moveTarget.addClass('king');
          moveTarget.empty();
          moveTarget.append($('<img>').attr('src', './media/red-crown.png'));
        }
      }

      if(selected.hasClass('king')){
        selected.removeClass('king');
        moveTarget.addClass('king');
      }
    }
  }

  function endTurn(){
    // var numPieces = $('.player').length;
    //
    // if(numPieces !== totalPieces){
    //   totalPieces = numPieces;
    //   return;
    // }

    //debugger;
    var $currentPlayer = $('td.player.current');
    var $otherPlayer = $('td.player');

    $otherPlayer.addClass('current');
    $currentPlayer.removeClass('current');
  }
})();
