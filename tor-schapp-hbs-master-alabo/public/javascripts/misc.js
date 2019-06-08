// Set Video Duration in proper place

function setDuration(indx) {
    // var vidTag = document.querySelectorAll('video');
    // vidTag.forEach((val,index) => {

    var dur = document.getElementById('video-' + indx).duration;
    duration = (dur / 60).toFixed(2);

    document.getElementById('vid-' + indx).textContent = duration + " mins";

    //});
}
/*
function playVideo(selectid) {
  let video = "";
  
  video = document.getElementById('videoid');
  
  let videotext = document.getElementById('videotitle');
  // pick the id element of the select tag as folder
  let folder = document.querySelector('select').id;
  // console.log(`x is ${x.id}`);
  
  let selected = selectid.value;
 
  videotext.innerText = selected.substring(0, selected.lastIndexOf('.'));
  selected = '/' + folder + '/' + selected;
  // console.log(`select id is ${selectid} selected is ${selected}`);
  // set text for video Title
  console.log(`selected id is ${selected} `); 
  // var source = document.createElement('source');
  
  //source.setAttribute('src', selected);
  
  // video.appendChild(source);
  video.src = selected;
 
  video.load();
  
  // document.getElementById(selectid).onclick = function(){
  video.play();
  let dur = video.duration;
  document.getElementById('vid-0').textContent = (dur/60).toFixed(0) + " mins";
  
  console.log(`current video url is ${video.currentSrc}`);
  // }
  
}


function playcVideo(selectid) {
  let video = "";
  console.log(`play value is ${selectid}`);

  video = document.getElementById('videoid');
  
  let videotext = document.getElementById('videotitle');
  // pick the id element of the select tag as folder
  let folder = document.querySelector('h5').id;
  // console.log(`x is ${x.id}`);
  
  let selected = selectid;
  
  videotext.innerText = selected.substring(0, selected.lastIndexOf('.'));
  selected = '/' + folder + '/' + selected;
  // console.log(`select id is ${selectid} selected is ${selected}`);
  // set text for video Title
  console.log(`selected url is ${selected} `); 
  var source = document.createElement('source');
  
  //source.setAttribute('src', encodeURI(selected));
  
  //video.appendChild(source);
  video.src = encodeURI(selected);
 
  video.load();
  
  // document.getElementById(selectid).onclick = function(){
  video.play();
  let dur = video.duration;
  document.getElementById('vid-0').textContent = (dur/60).toFixed(0) + " mins";
  document.getElementById('videoid').focus();
  // console.log(`current video src is ${video.currentSrc}`);
  
  // }
  
}
*/
function playMe(mpath) {
    mp4path = String(mpath);

    // btnid = mp4path;
    // console.log( 'path '+ mp4path)
    if (mp4path.indexOf('.mp4') > 0) {
        let cindex = mp4path.indexOf('videos'); // index of 'videos' in path
        let vidlen = 'videos'.length;
        let mp4len = mp4path.length;

        sublen = cindex + vidlen;
        console.log(`sublen ${sublen}`)

        // extract the mp4 file path from the full path
        // i.e /home/user1/videos/school/termone/primary/1/math.mp4 becomes
        // school/termone/primary/1/math.mp4
        let url = mp4path.substring(sublen, mp4len)
            // add thumbnail preview, #t=0.5 to url
        console.log(url)
            //   url = url + '#t=0.5';
            // create thumbnail file

        // thumbCreate(mp4path);

        // console.log(`url ${url}`)

        let video = document.getElementById('videoid');
        let videotext = document.getElementById('videotitle');
        let newvideotext = document.getElementById('v');

        videotext.innerText = url.substring(0, url.lastIndexOf('.'));
        let ar = url.split('/');
        let ner = ar[4];
        let net = ner.replace(/.mp4/g, "")
        let vidTexy = net.replace(/_/g, " ");

        // console.log('VALUE OF AR:', ar)
        // console.log('VALUE OF AR:', ner)
        // console.log('VALUE OF Net:', net)
        // console.log('VALUE OF VIDTEXy:', vidTexy)

        if (url.lastIndexOf('.')) {
            videotext.style.display = "none";
            newvideotext.innerHTML = vidTexy;
        } else {
            console.log("No video url found")
        }
        // video.src = encodeURI(url);
        video.src = url;

        video.load();
        video.focus();

        video.play()
            .then(() => {
                console.log('playing')
                    // save play incident touser record

                fpath = '/clicked?cpath=' + mp4path

                fetch(fpath, { method: 'POST' })
                    .then(function(response) {
                        if (response.ok) {
                            console.log('Click was recorded');
                            return;
                        }
                        throw new Error('Request failed in /clicked');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            })
            .catch((err) => {
                console.log('play failed ' + err)
            })
    }
}
// Handlebars helperS
// substr to decorate string

function thumbCreate(mp4file) {

    vpath = '/courses/videothumb?v=' + mp4file;
    console.log(vpath);
    fetch(vpath, { method: 'GET' })
        .then(function(response) {
            if (response.ok) {
                console.log('thumpnail was created');
                return;
            }

        })
        .catch(function(error) {
            console.log("Fetch error: ", error);
        });


}