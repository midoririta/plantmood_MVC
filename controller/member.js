module.exports = function (request, response, controllerName) {
    this.request  = request;
    this.response = response;
    this.viewPath = controllerName + "/";
	var mysql = require('mysql');
	
	
	var connection = mysql.createConnection({
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'member'
	});
	
	connection.connect(function(err) {
	// if (err) throw err;
    	if (err) {
    		console.log(JSON.stringify(err));
    		return;
    	}
    });
    
    this.signup = function() {
        this.response.render(this.viewPath +"signup.html", 
	        { userName: request.session.userName }
	    );
	}
    
	this.login = function () {
	    this.response.render(this.viewPath + "login.html", 
	        {	
	        	errorMessage: "", 
	        	id: "",
	        	password: "",
	        	userName: request.session.userName
	        }
	    );
	    
	}

	this.post_login = function () {

        var this_response = this.response;
        var this_viewPath = controllerName + "/";
        var this_request = this.request;

        connection.query('select * from  member_test;  ', [],
            function(err, rows) {
                
                for(var i in rows) {
                    var error = '';
                    
                    if (JSON.stringify(rows[i].name) !== JSON.stringify(this_request.body.txtID)) {
                        //console.log("帳號檢查");
                        error = "您輸入的帳號不正確<br>"+ JSON.stringify(rows[i].name);
                    }

                    if (JSON.stringify(rows[i].password) !== JSON.stringify(this_request.body.txtPassword)) {
                        //console.log("密碼檢查");
                        error = "您輸入的密碼不正確<br>";
                    }
                    
                    if (error == '') {
                        //登入
                        this_request.session.userName = this_request.body.txtID;
                        return this_response.redirect('/home/member');
                    }

                    else {
                        
                        //console.log("重新載入登入頁");
                        return this_response.render(this_viewPath + "login.html", {
                            request: this_request,
                            errorMessage: error,
                            // 將上次輸入的資料自動帶入
                            id: this_request.body.txtID,
                            password: "",
                            userName: ""

                        });
                    }

                }

            }

        )


    }

	this.logout = function () {
		delete request.session.userName;
	    response.redirect("/home/index");
	}
	
	
	
	
}
