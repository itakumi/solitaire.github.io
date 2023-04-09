var query = location.search;
var value = query.split('=');
// console.log(decodeURIComponent(value[1]));
mode=value[1];
console.log(mode);

if (mode=="spider_easy"){
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
      ],
      joker: 0
  }
}else if (mode=="spider_normal") {
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'H', count: 13 },
          { type: 'H', count: 13 },
          { type: 'H', count: 13 },
      ],
      joker: 0
  }
}else if (mode=="spider_hard") {
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'C', count: 13 },
          { type: 'D', count: 13 },
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'C', count: 13 },
          { type: 'D', count: 13 }
      ],
      joker: 0
  }
}else if (mode=="solitaire") {
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'C', count: 13 },
          { type: 'D', count: 13 }
      ],
      joker: 0
  }
}
$(function(){
    function check_distributable(){
      data = document.querySelector('#coltest');
      flag=true;
      for (let i=0;i<10;i++){
          if (data.children[i].childElementCount==1){
            flag=false;
            break;
          }
      }
      return flag;
    }
    currentdeck=0;
    if (mode=="solitaire"){
      $('#deck').on('click',function(){
        if (currentdeck==-1){
          $(this)[0].src="Cards/back.png";
          // $(this.nextElementSibling)[0].id='dummy';
          // $(this.nextElementSibling)[0].removeAttribute('src');
          $(this.nextElementSibling)[0].remove();
          var newhtml=document.createElement('img');
          newhtml.id='dummy';
          newhtml.classList.add("dummy","card","ui-droppable","ui-droppable-disabled");
          newhtml.style="margin-top: 20px; margin-left:40px;"
          console.log($(this)[0]);
          $(this)[0].parentElement.append(newhtml);
          currentdeck++;
          return;
        }
        // console.log("soliatire");
        console.log(shuffleCards);
        console.log(shuffleCards[currentdeck]);
        console.log(shuffleCards.length);
        // console.log($(this.nextElementSibling)[0]);
        $(this.nextElementSibling)[0].id=String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number']);
        $(this.nextElementSibling)[0].src="Cards/"+String($(this.nextElementSibling)[0].id)+".png";
        console.log($(this.nextElementSibling)[0].src);
        // $(this.nextElementSibling).classList.add("card","ui-droppable","rounded");
        // console.log("Cards/"+String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number'])+".png");
        // $(this.nextElementSibling)[0].src="Cards/"+String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number'])+".png";
        // newhtml.src="Cards/"+String(newhtml.id)+".png";
        currentdeck++;
        if (currentdeck==shuffleCards.length){
          console.log("ここまでで一通り");
          $(this)[0].src="";
          currentdeck=-1;
        }
      });
    }else{
      $('#decklist>*').on('click',function(){
        flag=check_distributable();
        if (flag){
          for (let i=0;i<10;i++){
            var newhtml=document.createElement('img');
            var selectCard = shuffleCards[0];
            shuffleCards.splice(0, 1);
            newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
            newhtml.src="Cards/"+String(newhtml.id)+".png";
            newhtml.classList.add("card","ui-droppable","rounded");
            data.children[i].append(newhtml);
          }
          console.log("山札配った後のdraggable_droppable_init()");
          draggable_droppable_init();
          //山札を一つ消去
          $('#decklist :last-child').remove();
        }else{
          alert("カードが無い列があります");
        }
      });
    }
    // $('#deck').on('click',function(){
    //   console.log("currentdeck="+currentdeck);
    //   if (mode=="solitaire"){
    //     if (currentdeck==-1){
    //       $(this)[0].src="Cards/back.png";
    //       // $(this.nextElementSibling)[0].id='dummy';
    //       // $(this.nextElementSibling)[0].removeAttribute('src');
    //       $(this.nextElementSibling)[0].remove();
    //       var newhtml=document.createElement('img');
    //       newhtml.id='dummy';
    //       newhtml.classList.add("dummy","card","ui-droppable","ui-droppable-disabled");
    //       newhtml.style="margin-top: 20px; margin-left:40px;"
    //       console.log($(this)[0]);
    //       $(this)[0].parentElement.append(newhtml);
    //       currentdeck++;
    //       return;
    //     }
    //     // console.log("soliatire");
    //     console.log(shuffleCards);
    //     console.log(shuffleCards[currentdeck]);
    //     console.log(shuffleCards.length);
    //     // console.log($(this.nextElementSibling)[0]);
    //     $(this.nextElementSibling)[0].id=String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number']);
    //     $(this.nextElementSibling)[0].src="Cards/"+String($(this.nextElementSibling)[0].id)+".png";
    //     console.log($(this.nextElementSibling)[0].src);
    //     // $(this.nextElementSibling).classList.add("card","ui-droppable","rounded");
    //     // console.log("Cards/"+String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number'])+".png");
    //     // $(this.nextElementSibling)[0].src="Cards/"+String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number'])+".png";
    //     // newhtml.src="Cards/"+String(newhtml.id)+".png";
    //     currentdeck++;
    //     if (currentdeck==shuffleCards.length){
    //       console.log("ここまでで一通り");
    //       $(this)[0].src="";
    //       currentdeck=-1;
    //     }
    //   }else{
    //     //山札を配る
    //     flag=check_distributable();
    //     if (flag){
    //       for (let i=0;i<10;i++){
    //         var newhtml=document.createElement('img');
    //         var selectCard = shuffleCards[0];
    //         shuffleCards.splice(0, 1);
    //         newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
    //         newhtml.src="Cards/"+String(newhtml.id)+".png";
    //         newhtml.classList.add("card","ui-droppable","rounded");
    //         data.children[i].append(newhtml);
    //       }
    //       console.log("山札配った後のdraggable_droppable_init()");
    //       draggable_droppable_init();
    //       //山札を一つ消去
    //       $('#decklist :last-child').remove();
    //     }else{
    //       alert("カードが無い列があります");
    //     }
    //   }
    // });
    function trump_init(trumpData) {
        var cards = [];
        for (var i = 0; i < trumpData['card'].length; i++) {
            var thistype = trumpData['card'][i];
            for (var j = 0; j < thistype['count']; j++) {
                cards.push({
                    type: thistype['type'],
                    number: j + 1
                });
            }
        }
        for (var i = 0; i < trumpData['joker']; i++) {
            cards.push({
                type: 'joker',
                number: i + 1
            });
        }
        return cards;
    }
    function sort_at_random(arrayData) {
        var arr = arrayData.concat();
        var arrLength = arr.length;
        var randomArr = [];
        for(var i = 0; i < arrLength; i++) {
            // 0～countArrの個数 の範囲から、数値をランダムに抽出
            var randomTarget = Math.floor(Math.random() * arr.length);
            // randomArrに数値を格納
            randomArr[i] = arr[randomTarget];
            // 同じ数値を再度使わないように、今回使った数値をcountArrから削除しておく
            arr.splice(randomTarget, 1);
        }
        return randomArr;
    }
    var ORIGINALCARDDATA = trump_init(TRUMPDATA);
    var shuffleCards = sort_at_random(ORIGINALCARDDATA);
    console.log(shuffleCards);
    function getmaxval(html){
      var tmp=html;
      ans=html.id;
      while(true){
        if (tmp.previousElementSibling==null){
          break;
        }else{
          if ((tmp.id[0]==tmp.previousElementSibling.id[0]) && (Number(tmp.id.substr(2))+1==Number(tmp.previousElementSibling.id.substr(2)))){
            tmp=tmp.previousElementSibling;
            ans=tmp.id;
          }else{
            break;
          }
        }
      }
      return ans.substr(2);
    }
    function getminval(html){
      var tmp=html;
      ans=html.id;
      while(true){
        if (tmp.nextElementSibling==null){
          break;
        }else{
          if ((tmp.id[0]==tmp.nextElementSibling.id[0]) && (Number(tmp.id.substr(2))-1==Number(tmp.nextElementSibling.id.substr(2)))){
            tmp=tmp.nextElementSibling;
            ans=tmp.id;
          }else{
            break;
          }
        }
      }
      return ans.substr(2);
    }
    function init(){
      var data = document.querySelector('#coltest');
      if (mode=="solitaire"){
        for (let i=0;i<7;i++){
          for (let j=0;j<7;j++){
            if (i>j){
              continue;
            }
            var newhtml=document.createElement('img');
            var selectCard = shuffleCards[0];
            shuffleCards.splice(0, 1);
            newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
            if (i==j){
              newhtml.src="Cards/"+String(newhtml.id)+".png";
            }else{
              newhtml.src="Cards/back.png";
            }
            // newhtml.classList.add("card","ui-droppable","rounded");
            newhtml.classList.add("card","ui-droppable","rounded","handle","fas","fa-arrows-alt-v");
            data.children[j].append(newhtml);
          }
        }
      }else{
        for (let i=0;i<6;i++){
          for (let j=0;j<10;j++){
            var newhtml=document.createElement('img');
            var selectCard = shuffleCards[0];
            shuffleCards.splice(0, 1);
            newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
            if (i==5){
              newhtml.src="Cards/"+String(newhtml.id)+".png";
            }else{
              newhtml.src="Cards/back.png";
            }
            // newhtml.classList.add("card","ui-droppable","rounded");
            newhtml.classList.add("card","ui-droppable","rounded","handle","fas","fa-arrows-alt-v");
            data.children[j].append(newhtml);
            if (i==4 && j==3){
              break;
            }
          }
        }
      }
    }
    init();
    draggable_droppable_init();
    function draggable_droppable_init(){
      $(".dummy").droppable().droppable("disable");
      $("#coltest>*>img").droppable().droppable("disable");
      $("#coltest>*>img").draggable().draggable("disable");
      $("#coltest :last-child").droppable().droppable("enable");
      // console.log($("#decklist")[0].children.length);
      if ($("#decklist")[0].children.length!=2 && mode=="solitaire"){
        var newhtml=document.createElement('img');
        newhtml.id='dummy';
        newhtml.classList.add("dummy","card","ui-droppable","ui-droppable-disabled");
        newhtml.style="margin-top: 20px; margin-left:40px;"
        // console.log($(this)[0]);
        $("#decklist")[0].append(newhtml);
      }

      // $("#coltest>*>*").draggable({
      $(".card").draggable({
        appendTo: "body",
        cancel: ".dummy",
        cursor: "move",
        drag: function(event, ui) {
            targets.forEach((elem, index) => {
              $(elem).css(ui.position);
            });
        },
        start: function(event,ui){
          targets=[ui.helper[0]];
          var id = ui.helper[0].id;
          for (const target of $(ui.helper[0]).nextAll($(this))){
            if (mode=="solitaire"){
              if (id[0]=="D"||id[0]=="H"){
                tmp1="Red";
              }else{
                tmp1="Black";
              }
              if (target.id[0]=="D"||target.id[0]=="H"){
                tmp2="Red";
              }else{
                tmp2="Black";
              }
              flag=(tmp1!=tmp2);
            }else{
              flag=(id[0]==target.id[0])
            }
            // if ((id[0]==target.id[0]) && (Number(id.substr(2))-1==Number(target.id.substr(2)))){
            if (flag && (Number(id.substr(2))-1==Number(target.id.substr(2)))){
              targets.push(target);
              id=target.id;
            }
          }
          var a=10;
          targets.forEach((elem, index) => {
            $(elem).css("z-index", a++);
          });
        },
        stop: function(event, ui){
          targets.forEach((elem, index) => {
            elem.style["z-index"]=null;
            elem.style.top=null;
            elem.style.left=null;
          });
        },
        snap: true,
        snapMode: "outer",
      });
      $("#coltest>*>*").droppable({
        // accept:"#coltest>*>*",
        drop: function(event,ui){
          console.log(ui.helper[0].id+" to "+event.target.id);
          if (event.target.id=="dummy"){

            if (mode!="solitaire" || (mode=="solitaire"&&Number(ui.helper[0].id.substr(2))==13)){//スパイダーソリティアは13でなくても一番上における
            // if (Number(ui.helper[0].id.substr(2))==13){
              var lasthtml=ui.helper[0].previousElementSibling;
              // if (lasthtml!=null && lasthtml.id!="dummy"){
              if (lasthtml!=null && lasthtml.id!="deck" && lasthtml.id!="dummy"){
                if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
                  lasthtml.src="Cards/"+lasthtml.id+".png";
                }
                // $(ui.helper[0].previousElementSibling).droppable("enable");//前の要素
                // $(ui.helper[0].previousElementSibling).draggable("enable");//前の要素
                // while (true){
                //   if (lasthtml.previousElementSibling==null){
                //     break;
                //   }
                //   if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2)) && lasthtml.src.split("/").reverse()[0].split('.')[0]!="back"){
                //     // $(lasthtml.previousElementSibling).draggable("enable");
                //     // var lasthtml=lasthtml.previousElementSibling;
                //   }else{
                //     if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
                //       lasthtml.src="Cards/"+lasthtml.id+".png";
                //     }
                //     break;
                //   }
                // }
              }
              targets.forEach((elem, index) => {
                elem.classList.add("card");
                event.target.parentElement.append(elem);
              });
              // $(ui.helper[0].parentElement.firstElementChild).droppable("disable");//dummyのdroppableをdisableへ
              console.log("13をdummyにおいたときのdraggable_droppable_init()");
              draggable_droppable_init();
              // ui.helper[0].previousElementSibling.src="Cards/"+lasthtml.id+".png";
            }
          }
          if (mode=="solitaire"){
            if (ui.draggable[0].id[0]=="D"||ui.draggable[0].id[0]=="H"){
              tmp1="Red";
            }else{
              tmp1="Black";
            }
            if (event.target.id[0]=="D"||event.target.id[0]=="H"){
              tmp2="Red";
            }else{
              tmp2="Black";
            }
            flag=(tmp1!=tmp2);
          }else{
            flag=(true);
          }
          // if ((ui.draggable[0].id[0]==event.target.id[0]) && (Number(ui.draggable[0].id.substr(2))+1==Number(event.target.id.substr(2)))){
          if (flag && Number(ui.draggable[0].id.substr(2))+1==Number(event.target.id.substr(2))){
            // $(event.target).droppable("disable");
            console.log("parentは");
            console.log(ui.helper[0].parentElement.id);
            var lasthtml=ui.helper[0].previousElementSibling;
            if (lasthtml!=null && lasthtml.id!="deck" && lasthtml.id!="dummy"){
              if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
                console.log("Cards/"+lasthtml.id+".png");
                lasthtml.src="Cards/"+lasthtml.id+".png";
              }
              // $(ui.helper[0].previousElementSibling).droppable("enable");//前の要素
              // $(ui.helper[0].previousElementSibling).draggable("enable");//前の要素
              // while (true){
              //   if (lasthtml.previousElementSibling==null){
              //     break;
              //   }
              //   if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2)) && lasthtml.src.split("/").reverse()[0].split('.')[0]!="back"){
              //     $(lasthtml.previousElementSibling).draggable("enable");
              //     var lasthtml=lasthtml.previousElementSibling;
              //   }else{
              //     if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
              //       lasthtml.src="Cards/"+lasthtml.id+".png";
              //     }
              //     break;
              //   }
              // }
            }
            targets.forEach((elem, index) => {
              elem.classList.add("card");
              elem.removeAttribute("style");
              event.target.parentElement.append(elem);
            });
            console.log("通常のdraggable_droppable_init()");
            draggable_droppable_init();
            currenthtml=ui.helper[0];
            if(getmaxval(currenthtml)==13 && getminval(currenthtml)==1){
              currenthtml=currenthtml.parentElement.lastElementChild;
              type=currenthtml.id[0];
              for (let i=1; i<=13; i++){
                currenthtml=currenthtml.previousElementSibling;
                currenthtml.nextElementSibling.remove();
              }
              currenthtml.src="Cards/"+currenthtml.id+".png";
              var completehtml=document.createElement('img');
              bottom=document.getElementById("completecard");
              completehtml.id="complete";
              // completehtml.src="Cards/back.png";
              completehtml.src="Cards/"+type+"_13.png";
              completehtml.classList.add("complete","rounded");
              bottom.append(completehtml);
              console.log("1から13まで揃った時のdraggable_droppable_init()");
              draggable_droppable_init();
            }
          }else{
            targets.forEach((elem, index) => {
              elem.style["z-index"]=null;
              elem.style.top=null;
              elem.style.left=null;
            });
          }
        }
      });
      data = document.querySelector('#coltest');
      for (let i=0; i<data.childElementCount; i++){
        var lasthtml=data.children[i].children[data.children[i].childElementCount-1];
        $(lasthtml).draggable("enable");
        for (let j=data.children[i].childElementCount-2;  j>0; j--){
          // console.log(data.children[i].children[j].src);
          if (data.children[i].children[j].src.split("/").reverse()[0].split('.')[0]=="back"){
            break;
          }
          if (mode=="solitaire"){
            if (lasthtml.id[0]=="D"||lasthtml.id[0]=="H"){
              tmp1="Red";
            }else{
              tmp1="Black";
            }
            if (data.children[i].children[j].id[0]=="D"||data.children[i].children[j].id[0]=="H"){
              tmp2="Red";
            }else{
              tmp2="Black";
            }
            flag=(tmp1!=tmp2);
          }else{
            flag=(lasthtml.id[0]==data.children[i].children[j].id[0])
          }
          // if ((lasthtml.id[0]==data.children[i].children[j].id[0]) && (Number(lasthtml.id.substr(2))+1==Number(data.children[i].children[j].id.substr(2)))){
          if ((flag) && (Number(lasthtml.id.substr(2))+1==Number(data.children[i].children[j].id.substr(2)))){
            $(data.children[i].children[j]).draggable("enable");
            lasthtml=data.children[i].children[j];
          }else{
            break;
          }
        }
      }
    }

});
