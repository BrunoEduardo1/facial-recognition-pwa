 document.addEventListener("DOMContentLoaded", function(event) {

    $('#camButton').on('click', function() {
    	console.log("Abrir camera");

    	var header = "Conceda permissão a câmera";
		var content = '<div class="row">'+
						  '<div class="col-12 mx-auto text-center" id="videoDiv">'+
						    '<video id="video" class="img-thumbnail" width="400" height="260" autoplay muted></video>'+
						    '<div class="position-absolute d-flex" id="canvas"></div>'+
						  '</div>'+
						'</div>';
		var strSubmitFunc = "applyButtonFunc()";
		var btnText = "Just do it!";
		doModal('idMyModal', header, content, strSubmitFunc, btnText);

    	const video = document.getElementById('video');
    	
    	//Load models for face recognition net
		Promise.all([
		  faceapi.nets.tinyFaceDetector.loadFromUri('js/models/'),
		  faceapi.nets.faceLandmark68Net.loadFromUri('js/models/'),
		  faceapi.nets.faceRecognitionNet.loadFromUri('js/models/'),
		  faceapi.nets.faceExpressionNet.loadFromUri('js/models/')
		]).then(startVideo)

		video.addEventListener('play', () => {
		  const canvas = faceapi.createCanvasFromMedia(video)
		  document.getElementById('canvas').append(canvas)
		  // $('#videoDiv').append(canvas)
		  const displaySize = { width: video.width, height: video.height }
		  faceapi.matchDimensions(canvas, displaySize)
		  setInterval(async () => {
		    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
		    const resizedDetections = faceapi.resizeResults(detections, displaySize)
		    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
		    faceapi.draw.drawDetections(canvas, resizedDetections)
		    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
		    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
		  }, 3000)
		})
		
    });

    $('#uploadButton').on('click', function() {
    	console.log("Submeter arquivo");
    });
	function startVideo() {
	  navigator.getUserMedia(
	    { video: {} },
	    stream => video.srcObject = stream,
	    err => console.error(err)
	  )
	}
	function doModal(placementId, heading, content, strSubmitFunc, btnText)
	{
	    var html =   '<div class="modal fade" id="modalChoose" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">'+
					    '<div class="modal-dialog modal-dialog-centered" role="document">'+
					      '<div class="modal-content">'+
					        '<div class="modal-header">'+
					          '<h5 class="modal-title title" id="modalLongTitle">'+heading+'</h5>'+
					          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
					            '<span aria-hidden="true">&times;</span>'+
					          '</button>'+
					        '</div>'+
					        '<div class="modal-body">'+
					          	content+
					        '</div>'+
					        '<div class="modal-footer">'+
					          '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>'+
					          '<button type="button" class="btn btn-primary">Salvar</button>'+
					        '</div>'+
					      '</div>'+
					    '</div>'+
					  '</div>';
	    $("#"+placementId).html(html);
	    $("#modalChoose").modal();
	}


	function hideModal(){
	    $('#modalChoose').modal('hide');
	}

  });