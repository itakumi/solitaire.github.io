TRUMPDATA = {
    card: [
        { type: 'C', count: 13 },
        { type: 'S', count: 13 },
        { type: 'H', count: 13 },
        { type: 'D', count: 13 }
    ],
    joker: 0
}
$(function(){
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
            // console.log(ans);
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
            // console.log(ans);
          }else{
            break;
          }
        }
      }
      return ans.substr(2);
    }
    $("#coltest>*>*").draggable({
      appendTo: "body",
      cancel: ".dummy",
      cursor: "move",
      drag: function(event, ui) {
          // dragの際に、一緒に動かす
          // console.log(event);
          // console.log(ui);
          // var targets=[ui.helper[0]];
          // // console.log(ui.helper[0]);
          // // console.log($(ui.helper[0]).nextAll($(this)));
          // // console.log("target一覧");
          // var id = ui.helper[0].id;
          // // console.log(id);
          // for (const target of $(ui.helper[0]).nextAll($(this))){
          //   // console.log(target);
          //   // console.log("id="+id);
          //   // console.log("targetid="+target.id);
          //   if ((id[0]==target.id[0]) && (Number(id.substr(2))-1==Number(target.id.substr(2)))){
          //     // console.log(target);
          //     // console.log("追加");
          //     targets.push(target);
          //     id=target.id;
          //   }
          // }
          // console.log(targets);
          // console.log("drag");
          // console.log(ui.helper[0].parentElement.children);
          // $('ui.helper[0].parentElement.children').css(ui.position);
          // $('ui.helper[0].parentElement.children').each(function(){
          // $(ui.helper[0].parentElement.children).each(function(){
          targets.forEach((elem, index) => {
            // var a=100;
            // console.log(ui.position);
            // console.log($(this).css("z-index");)
            // $(this).css("z-index", Number(100)++);
            // console.log(elem);
            // console.log($(elem)+"のposition");
            // console.log(ui.position);
            $(elem).css(ui.position);
            // $(this).css(ui.position);
          });
      },
      // start: function(event, ui){
      //   var a=10000;
      //   // console.log(event);
      //   // console.log(ui);
      //   console.log($(this)[0]);
      //   $(this).css("z-index", a++);
      //   // console.log(event.target.id);
      //   // event.dataTransfer.setData('text/plain', event.originalEvent.target.id)
      // },
      start: function(event,ui){
        targets=[ui.helper[0]];
        // console.log(ui.helper[0]);
        // console.log($(ui.helper[0]).nextAll($(this)));
        // console.log("target一覧");
        var id = ui.helper[0].id;
        // console.log(id);
        for (const target of $(ui.helper[0]).nextAll($(this))){
          // console.log(target);
          // console.log("id="+id);
          // console.log("targetid="+target.id);
          if ((id[0]==target.id[0]) && (Number(id.substr(2))-1==Number(target.id.substr(2)))){
            // console.log(target);
            // console.log("追加");
            targets.push(target);
            id=target.id;
          }
        }
        // console.log("targetsは1");
        // console.log(targets);

        // console.log(event);
        // console.log(event.originalEvent.target.id+"をセット");
        // event.originalEvent.target.id=event.originalEvent.target.id;
        var a=10;
        // console.log(ui.position);
        // console.log($(this).css("z-index"));
        targets.forEach((elem, index) => {
          // var a=100;
          // console.log(ui.position);
          // console.log($(this).css("z-index");)
          // $(this).css("z-index", Number(100)++);
          // console.log(elem);
          $(elem).css("z-index", a++);
          // $(this).css(ui.position);
        });
        // $(this).css("z-index", a++);
        // event.dataTransfer.setData("Text",event.target.id);
        // event.dataTransfer.setData("text/plain",event.target.id);
      },
      stop: function(event, ui){
        targets.forEach((elem, index) => {
          elem.style["z-index"]=null;
          elem.style.top=null;
          elem.style.left=null;
        });
      },
      // revert: true,
      snap: true,
      snapMode: "outer",
      // zIndex:10,
    });
    $("#coltest>*>*").droppable({
      accept:"#coltest>*>*",
      drop: function(event,ui){
        // console.log("dropped");
        // console.log($("#coltest"));
        // console.log(event.target);
        // console.log(ui.draggable[0]);
        console.log(ui.helper[0].id+" to "+event.target.id);
        // console.log(Number(ui.draggable[0].id.substr(2))+1);
        if (event.target.id=="dummy"){
          console.log("dummyへ");
          if (Number(ui.helper[0].id.substr(2))==13){
            var lasthtml=ui.helper[0].previousElementSibling;
            console.log("lasthtml");
            console.log(lasthtml);
            if (lasthtml!=null){
              $(ui.helper[0].previousElementSibling).droppable("enable");//前の要素
              $(ui.helper[0].previousElementSibling).draggable("enable");//前の要素
              while (true){
                console.log(lasthtml);
                console.log(lasthtml.previousElementSibling);
                // console.log(ui.helper[0].previousElementSibling.id.substr(2));
                // console.log(ui.helper[0].previousElementSibling.previousElementSibling.id.substr(2));
                if (lasthtml.previousElementSibling==null){
                  break;
                }
                if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2))){
                  console.log("まだいける");
                  console.log(lasthtml.previousElementSibling);
                  $(lasthtml.previousElementSibling).draggable("enable");
                  var lasthtml=lasthtml.previousElementSibling;
                }else{
                  break;
                }
              }
            }



            ui.helper[0].classList.add("card");
            event.target.parentElement.append(ui.helper[0]);
            $(ui.helper[0].parentElement.firstElementChild).droppable("disable");
            // $(ui.helper[0].previousElementSibling).droppable("enable");
          }
          // event.target.droppable("disable");
        }
        if ((ui.draggable[0].id[0]==event.target.id[0]) && (Number(ui.draggable[0].id.substr(2))+1==Number(event.target.id.substr(2)))){
          // console.log(event);
          // console.log(ui);
          // console.log(ui.draggable[0].parentElement.firstElementChild);
          // ui.draggable[0].parentElement.firstElementChild.setAttribute("droppable","enable");
          // console.log(ui.helper[0].previousElementSibling);//前の要素
          $(event.target).droppable("disable");
          var lasthtml=ui.helper[0].previousElementSibling;
          if (lasthtml!=null){
            $(ui.helper[0].previousElementSibling).droppable("enable");//前の要素
            $(ui.helper[0].previousElementSibling).draggable("enable");//前の要素
            while (true){
              console.log(lasthtml);
              // console.log(lasthtml.previousElementSibling);
              if (lasthtml.previousElementSibling==null){
                break;
              }
              if ((Number(lasthtml.id.substr(2))+1)==Number(lasthtml.previousElementSibling.id.substr(2))){
                // console.log("まだいける");
                // console.log(Number(lasthtml.id.substr(2)));
                // console.log(Number(lasthtml.previousElementSibling.id.substr(2)));
                // console.log(lasthtml.previousElementSibling);
                $(lasthtml.previousElementSibling).draggable("enable");
                var lasthtml=lasthtml.previousElementSibling;
              }else{
                console.log("条件満たさず");
                console.log(lasthtml.src.split("/").reverse()[0].split('.')[0]);
                if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){
                  console.log("backです");
                  lasthtml.src="Cards/"+lasthtml.id+".png";
                }
                console.log(lasthtml);
                break;
              }
            }
          }
          targets.forEach((elem, index) => {
            // var a=100;
            // console.log(ui.position);
            // console.log($(this).css("z-index");)
            // $(this).css("z-index", Number(100)++);
            // console.log(elem);
            // console.log($(elem)+"のposition");
            // console.log(ui.position);
            // $(elem).style.top=null;
            // $(elem).style.left=null;
            elem.classList.add("card");
            event.target.parentElement.append(elem);
            // elem.style["z-index"]=null;
            // elem.style.top=null;
            // elem.style.left=null;
            // $(elem).style({top:null,left:null});
            // $(this).css(ui.position);
          });
          console.log(ui.helper[0]);
          //つながっている最大と最小を求める
          currenthtml=ui.helper[0];
          console.log("max=");
          console.log(getmaxval(currenthtml));
          console.log("min=");
          console.log(getminval(currenthtml));
          if(getmaxval(currenthtml)==13 && getminval(currenthtml)==1){
            console.log("全て揃いました");
            console.log(currenthtml.parentElement.lastElementChild);
            currenthtml=currenthtml.parentElement.lastElementChild;
            for (let i=1; i<=13; i++){
              currenthtml=currenthtml.previousElementSibling;
              currenthtml.nextElementSibling.remove();
            }
            var completehtml=document.createElement('img');
            bottom=document.getElementById("completecard");
            completehtml.id="complete";
            completehtml.src="Cards/back.png";
            completehtml.classList.add("complete","bottom-0","img-thumbnail","rounded");
            bottom.append(completehtml);

          }
          // ui.draggable[0].classList.add("card");
          // event.target.parentElement.append(ui.draggable[0]);
          // console.log(ui.helper[0].parentElement.lastElementChild);
          // $(ui.helper[0].parentElement.lastElementChild).droppable("enable");
        }else{
          // console.log("targetsは");
          // console.log(targets);
          targets.forEach((elem, index) => {
            // var a=100;
            // console.log(ui.position);
            // console.log($(this).css("z-index");)
            // $(this).css("z-index", Number(100)++);
            // console.log(elem);
            // console.log($(elem)+"のposition");
            // console.log(ui.position);
            // $(elem).style.top=null;
            // $(elem).style.left=null;

            elem.style["z-index"]=null;
            elem.style.top=null;
            elem.style.left=null;
            // $(elem).style({top:null,left:null});
            // $(this).css(ui.position);
          });
        }
        // console.log(event);
        // ui.draggable[0].remove();
        // console.log(event.target.firstElementChild.id);
        // console.log(event);
      }
    });
    // $("#bottomtest>*>*").draggable("disable");
    // $("#bottomtest>*>*").droppable("disable");
    // console.log("全てのdummyをdisableへ");
    function init(){
      let data = document.querySelector('#coltest');
      for (let i=0;i<1;i++){
        for (let j=0;j<10;j++){
          var newhtml=document.createElement('img');
          var selectCard = shuffleCards[0];
          shuffleCards.splice(0, 1);
          // console.log('引いたカード', selectCard);
          // console.log(selectCard['type'])
          // console.log(selectCard['number'])
          newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
          // console.log(newhtml.id);
          console.log(i+"_"+j+"に追加");
          // console.log("Cards/"+String(newhtml.id)+".png")
          newhtml.src="Cards/"+String(newhtml.id)+".png";
          newhtml.classList.add("card","ui-droppable","img-thumbnail","rounded");
          data.children[j].append(newhtml);
          if (i==4 && j==4){
            console.log("break");
            break;
          }
        }
        // if (i==5){
        //   break;
        // }
      }
      $(".dummy").droppable("disable");
      // $("#coltest>*>img").droppable("disable");
      // $("#coltest>*>img").draggable("disable");
      // $("#coltest :last-child").droppable().droppable("enable");

    }
    init();
    $(".dummy").droppable("disable");
    $("#coltest>*>img").droppable("disable");
    $("#coltest>*>img").draggable("disable");
    $("#coltest :last-child").droppable().droppable("enable");
    let data = document.querySelector('#coltest');
    // console.log(data);
    // console.log(data.childElementCount);
    for (let i=0; i<data.childElementCount; i++){
      // var index=i;
      // var order = 'nth-child(' + index +')';
      // var data_child=document.querySelector('#coltest>:'+order);
      // console.log("data_child");
      // console.log(data_child);
      // console.log("i="+i);
      // console.log(data.children[i]);
      // console.log("childlen="+data.children[i].childElementCount);
      // console.log(data.children[1].children[1]);
      // console.log(data_child.childElementCount);
      // var num=data.children[i].children[data.children[i].childElementCount-1].id.substr(2);
      var lasthtml=data.children[i].children[data.children[i].childElementCount-1];
      // console.log(lasthtml);
      $(lasthtml).draggable("enable");
      for (let j=data.children[i].childElementCount-2;  j>0; j--){
        // console.log(data.children[i].children[j]);
        // console.log(Number(lasthtml.id.substr(2))+"と"+Number(data.children[i].children[j].id.substr(2)));
        if ((lasthtml.id[0]==data.children[i].children[j].id[0]) && (Number(lasthtml.id.substr(2))+1==Number(data.children[i].children[j].id.substr(2)))){
          $(data.children[i].children[j]).draggable("enable");
          lasthtml=data.children[i].children[j];
        }
      }
    }
});
