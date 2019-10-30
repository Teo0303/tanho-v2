$.ajax({
			url: "./lang/rus.json",
			type: 'GET',
			data: '',
			crossOrigin: null,
			dataType: "json",
 			async:false,
			success:function(data){
					console.log(data)
			},
			error:function(xhr){
				console.log(xhr);
			} 
		});