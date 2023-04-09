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
        // { type: 'C', count: 13 },
        // { type: 'H', count: 13 },
        // { type: 'D', count: 13 }
    ],
    joker: 0
}
$(function(){
    // document.getElementById('deck').onclick = function(){
    //   console.log("aaaa");
    // }
    $('#decklist>*').on('click',function(){
      //山札を配る
      for (let i=0;i<10;i++){
        var newhtml=document.createElement('img');
        var selectCard = shuffleCards[0];
        shuffleCards.splice(0, 1);
        // newhtml.id="S_"+String(selectCard['number']); //スパイダーソリティアなのでS統一
        newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
        // newhtml.src="Cards/"+String(newhtml.id)+".png";
        newhtml.src="Cards/"+String(newhtml.id)+".png";
        newhtml.classList.add("card","ui-droppable","img-thumbnail","rounded");
        data.children[i].append(newhtml);
      }
      draggable_droppable_init();
      console.log("bbbb");
      //山札を一つ消去
      $('#decklist :last-child').remove();
    });
    // function distribute_card(){
    //   console.log("aaa");
    // }
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
      for (let i=0;i<6;i++){
        for (let j=0;j<10;j++){
          var newhtml=document.createElement('img');
          var selectCard = shuffleCards[0];
          shuffleCards.splice(0, 1);
          // newhtml.id="S_"+String(selectCard['number']); //スパイダーソリティアなのでS統一
          newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
          // newhtml.src="Cards/"+String(newhtml.id)+".png";
          if (i==5){
            newhtml.src="Cards/"+String(newhtml.id)+".png";
          }else{
            newhtml.src="Cards/back.png";
          }
          newhtml.classList.add("card","ui-droppable","img-thumbnail","rounded");
          data.children[j].append(newhtml);
          if (i==4 && j==3){
            break;
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

      $("#coltest>*>*").draggable({
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
            if ((id[0]==target.id[0]) && (Number(id.substr(2))-1==Number(target.id.substr(2)))){
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
        accept:"#coltest>*>*",
        drop: function(event,ui){
          console.log(ui.helper[0].id+" to "+event.target.id);
          if (event.target.id=="dummy"){
            // console.log("dummyへ");
            if (Number(ui.helper[0].id.substr(2))==13){
              var lasthtml=ui.helper[0].previousElementSibling;
              // console.log("lasthtml");
              // console.log(lasthtml);
              if (lasthtml!=null){
                $(ui.helper[0].previousElementSibling).droppable("enable");//前の要素
                $(ui.helper[0].previousElementSibling).draggable("enable");//前の要素
                while (true){
                  // console.log(lasthtml);
                  // console.log(lasthtml.previousElementSibling);
                  if (lasthtml.previousElementSibling==null){
                    break;
                  }
                  if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2)) && lasthtml.src.split("/").reverse()[0].split('.')[0]!="back"){
                  // if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2))){
                    $(lasthtml.previousElementSibling).draggable("enable");
                    var lasthtml=lasthtml.previousElementSibling;
                  }else{
                    if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
                      // console.log("backです");
                      lasthtml.src="Cards/"+lasthtml.id+".png";
                    }
                    // console.log(lasthtml);
                    break;
                  }
                }
              }
              //ここをtargets全てにする
              targets.forEach((elem, index) => {
                elem.classList.add("card");
                event.target.parentElement.append(elem);
              });

              // ui.helper[0].classList.add("card");
              // event.target.parentElement.append(ui.helper[0]);
              $(ui.helper[0].parentElement.firstElementChild).droppable("disable");//dummyのdroppableをdisableへ
              ui.helper[0].previousElementSibling.src="Cards/"+lasthtml.id+".png";
            }
          }
          if ((ui.draggable[0].id[0]==event.target.id[0]) && (Number(ui.draggable[0].id.substr(2))+1==Number(event.target.id.substr(2)))){
            $(event.target).droppable("disable");
            var lasthtml=ui.helper[0].previousElementSibling;
            if (lasthtml!=null){
              $(ui.helper[0].previousElementSibling).droppable("enable");//前の要素
              $(ui.helper[0].previousElementSibling).draggable("enable");//前の要素
              while (true){
                // console.log(lasthtml);
                if (lasthtml.previousElementSibling==null){
                  break;
                }
                if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2)) && lasthtml.src.split("/").reverse()[0].split('.')[0]!="back"){
                  $(lasthtml.previousElementSibling).draggable("enable");
                  var lasthtml=lasthtml.previousElementSibling;
                }else{
                  // console.log("条件満たさず");
                  // console.log(lasthtml.src.split("/").reverse()[0].split('.')[0]);
                  if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
                    // console.log("backです");
                    lasthtml.src="Cards/"+lasthtml.id+".png";
                  }
                  // console.log(lasthtml);
                  break;
                }
              }
            }
            targets.forEach((elem, index) => {
              elem.classList.add("card");
              event.target.parentElement.append(elem);
            });
            // console.log(ui.helper[0]);
            currenthtml=ui.helper[0];
            // console.log("max=");
            // console.log(getmaxval(currenthtml));
            // console.log("min=");
            // console.log(getminval(currenthtml));
            if(getmaxval(currenthtml)==13 && getminval(currenthtml)==1){
              // console.log("全て揃いました");
              // console.log(currenthtml.parentElement.lastElementChild);
              currenthtml=currenthtml.parentElement.lastElementChild;
              for (let i=1; i<=13; i++){
                currenthtml=currenthtml.previousElementSibling;
                currenthtml.nextElementSibling.remove();
              }
              currenthtml.src="Cards/"+currenthtml.id+".png";
              var completehtml=document.createElement('img');
              bottom=document.getElementById("completecard");
              completehtml.id="complete";
              completehtml.src="Cards/back.png";
              completehtml.classList.add("complete","bottom-0","img-thumbnail","rounded");
              bottom.append(completehtml);
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
          if ((lasthtml.id[0]==data.children[i].children[j].id[0]) && (Number(lasthtml.id.substr(2))+1==Number(data.children[i].children[j].id.substr(2)))){
            $(data.children[i].children[j]).draggable("enable");
            lasthtml=data.children[i].children[j];
          }
        }
      }
    }

});
