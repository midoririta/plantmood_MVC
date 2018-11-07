module.exports = function (request, response, controllerName) {
    this.request  = request;
    this.response = response;
    this.viewPath = controllerName + "/";
    
    var multer = require('multer');
    
    var mysql = require('mysql');
	
	var connection = mysql.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'member',
	});
	
	connection.connect(function(err) {
	// if (err) throw err;
    	if (err) {
    		console.log(JSON.stringify(err));
    		return;
    	}
    });
    
	this.index = function () {
	    this.response.render(this.viewPath + "index.html", 
	        { userName: request.session.userName }
	    );
	}
	
	this.member = function () {
	
		//未登入
		if (!request.session.userName) {
			response.redirect("/member/login");
			return;
		}
		
		//登入
		var this_response = this.response;
        var this_viewPath = controllerName + "/";
        var this_request = this.request;
        
		connection.query('select create_date, diary from member_diary where name = ?',[
			this_request.session.userName	
		], 
			
		function(err,rows){
			
			if(err){
				console.log(err);
			}
			else {
				return 	this_response.render(this_viewPath + "member.html",
				{
					diary: "",
					userName: this_request.session.userName,
					imgavatar: this_request.body.imgAvatar,
					pastwriteday: JSON.stringify(rows),
				
				});
			}
			
		})
	    
	}


	this.post_share = function () {
		
		this.response.render(this.viewPath + "share.html", 
	        {	userName: request.session.userName });
	
		
	    connection.query(
	    	
	    	'insert into member_diary set diary = ?,  name = ?, create_date = NOW()',[
	    	request.body.txtTextArea,
	        request.session.userName,
	        
		    ]);
		connection.query(    
		    'update member_diary set diary = REPLACE(diary, "\r\n", "<br />") ');
	}	

}
