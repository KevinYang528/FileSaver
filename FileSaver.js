var rfid;
var input="";
var output;
var key="";

function xor(n,m){
  var ans=new Array(n.length);
  for(var i=0;i<ans.length;i++){
    ans[i]=String.fromCharCode(n.charCodeAt(i)^m.charCodeAt(i%m.length));
  }
  ans=ans.join("");
  return ans;
}

function show(){
  input=document.getElementById("message").value;
  if(input!==""&&key!==""){
    output=xor(input,key);
    document.getElementById("message").value=output;
    document.getElementById("hint").innerHTML = "Success!Your text is converted successfully.";
  }
  else{
    document.getElementById("hint").innerHTML = "Error!Please try again!";
  }
}

function buzzer_music(m) {
  var musicNotes = {};
  musicNotes.notes = [];
  musicNotes.tempos = [];
  if (m[0].notes.length > 1) {
    for (var i = 0; i < m.length; i++) {
      if (Array.isArray(m[i].notes)) {
        var cn = musicNotes.notes.concat(m[i].notes);
        musicNotes.notes = cn;
      } else {
        musicNotes.notes.push(m[i].notes);
      }
      if (Array.isArray(m[i].tempos)) {
        var ct = musicNotes.tempos.concat(m[i].tempos);
        musicNotes.tempos = ct;
      } else {
        musicNotes.tempos.push(m[i].tempos);
      }
    }
  } else {
    musicNotes.notes = [m[0].notes];
    musicNotes.tempos = [m[0].tempos];
  }
  return musicNotes;
}

boardReady({device: 'a4kQK'}, function (board) {
  board.systemReset();
  board.samplingInterval = 250;
  buzzer = getBuzzer(board, 9);
  rfid = getRFID(board);
  rfid.read();
  rfid.on("enter",function(_uid){
    if(key===""){
      key=_uid;
      document.getElementById("hint").innerHTML = "Card detected,please enter your text.";
      buzzer.play(buzzer_music([  {notes:"C7",tempos:"8"}]).notes ,buzzer_music([  {notes:"C7",tempos:"8"}]).tempos );
    }
  });
});