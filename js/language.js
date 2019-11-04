$.ajax({
			url: "./lang/rus.json",
			type: 'GET',
			data: '',
			crossOrigin: null,
			dataType: "json",
 			async:false,
			success:function(data){
					changeLanguage(data);
			},
			error:function(xhr){
				console.log(xhr);
			} 
});

changeLanguage(data){
	console.log(data);
}