
      var score = 0;
      var countdown = 10;
      var timer = setInterval(function(){
       
        var gameOver = false;
          if(document.getElementById('butterfly') === null && gameOver !== true){
              var butterfly = document.createElement('img');
              butterfly.src = '/img/butterfly.svg';
              butterfly.style.width = 40 + 'px';
              butterfly.style.zIndex = 1000;
              var ancle = Math.floor(Math.random() * 80);
              butterfly.style.transform = "rotate(" + ancle + "deg)";
              
              
              butterfly.style.position = 'absolute';
              var x = Math.floor(Math.random() * window.innerWidth);
              var y = Math.floor(Math.random() * window.innerHeight);
                 
                 
              butterfly.style.top = y + 'px';
              butterfly.style.left = x + 'px';
                 
              butterfly.id = 'butterfly';
              document.body.appendChild(butterfly);
              }
          }, 10000);
    
      var disappear = setInterval(function(){
        if(document.getElementById('butterfly') !== null){
          document.body.removeChild(document.getElementById('butterfly'));
        }
      }, 11000); 
      
      document.body.addEventListener('click', function(e){
        
        
        if(e.target.id === 'butterfly'){
          e.target.parentNode.removeChild(e.target);
          score += 5;
          alert("嘿! 找到蝴蝶! 加五點");
          console.log('catch!');
          
          
        }
      })
