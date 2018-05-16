// Used modules for this script.
var axios = require('axios');
var crypto = require('crypto');
var jsonfile = require('jsonfile');
var prompt = require('prompt');

//JSON files to be loaded using jsonfile module.
var config = jsonfile.readFileSync('config.json');
var listObject = jsonfile.readFileSync('resources/list.json');
var myEmailObject = jsonfile.readFileSync('resources/my-email.json');
var fewEmailObject = jsonfile.readFileSync('resources/few-email.json');
var campaignObject = jsonfile.readFileSync('resources/campaign.json');

// API Variables.
var accessToken = config.api_key;
var url = config.url;

// Script starts here.

// Prompts user if he/she wants to load default json data or input data manually for the new list.
prompt.start();
prompt.get([{
	name: 'answer',
	description: 'Do you want to load default json data for the List? Y/N',
	message: "Invalid input.",
	required: true,
	conform: function(value) {
		if(value.includes("y")) {
			return true;
		}if(value.includes("n")) {
			return true;
		}else {
			return false;
		}
	}
}], function(err, result) {
	if(result.answer.includes("y")) {
		console.log("Yes");
		createList(listObject);
	}if(result.answer.includes("n")) {
		console.log("No");
		prompt.start();
		prompt.get([{
			name: 'name',
			description: 'List Name',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'company',
			description: 'Company/Organization',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'address1',
			description: 'Address 1',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'address2',
			description: 'Address 2',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'city',
			description: 'City',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'state',
			description: 'State',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'country',
			description: 'Country',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'phone',
			description: 'Phone',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'zip',
			description: 'Zip/Postal Code',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'permission_reminder',
			description: 'Permission Reminder',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'from_name',
			description: 'Default From Name',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'from_email',
			description: 'Default From Email',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'subject',
			description: 'Default Subject',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		},{
			name: 'language',
			description: 'Default Language',
			message: "Invalid input.",
			required: true,
			conform: function(value) {
				if(value) {
					return true;
				}else {
					return false;
				}
			}
		}], function(err, result) {
			var inputObject = {
				name: result.name,
				contact: {
					company: result.company,
					address1: result.address1,
					address2: result.address2,
					city: result.city,
					state: result.state,
					country: result.country,
					phone: result.phone,
					zip: result.zip
				},
				permission_reminder: result.permission_reminder,
				campaign_defaults: {
					from_name: result.from_name,
					from_email: result.from_email,
					subject: result.subject,
					language: result.language
				},
				email_type_option: true
			}
			createList(inputObject);
		});
	}
});

// Function that creates a new List for the MailChimp account.
function createList(object) {
	axios({
		method: 'post',
		url: url + '/lists',
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
	    data: object
	})
	.then(function(response) {
		console.log('Succesfully created list with an ID#: ' + response.data.id);
		promptMyEmail(response.data.id);
	})
	.catch(function(error) {
		console.log(error);
	});
}

// Prompts user if he/she wants to load default json data or input data manually for the user's email.
function promptMyEmail(list_id) {
	prompt.start();
	prompt.get([{
		name: 'answer',
		description: 'Do you want to load default json data for your Email? Y/N',
		message: "Invalid input.",
		required: true,
		conform: function(value) {
			if(value.includes("y")) {
				return true;
			}if(value.includes("n")) {
				return true;
			}else {
				return false;
			}
		}
	}], function(err, result) {
		if(result.answer.includes("y")) {
			console.log("Yes");
			addMyEmail(list_id, myEmailObject);
		}if(result.answer.includes("n")) {
			console.log("No");
			prompt.start();
			prompt.get([{
				name: 'email_address',
				description: 'Email Address',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			},{
				name: 'FNAME',
				description: 'First Name',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			},{
				name: 'LNAME',
				description: 'Last Name',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			}], function(err, result) {
				var inputObject = {
					email_address: result.email_address,
					status_if_new: "subscribed",
					merge_fields: {
						FNAME: result.FNAME,
						LNAME: result.LNAME
					}
				}
				addMyEmail(list_id, inputObject);
			});
		}
	});
}

// Function that adds the user's email to the list.
function addMyEmail(list_id, object) {
	var hashed_email = crypto.createHash('md5').update(object.email_address.toLowerCase()).digest("hex");
	axios({
		method: 'put',
		url: url + '/lists/' + list_id + '/members/' + hashed_email,
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
	    data: object
	})
	.then(function(response) {
		console.log('Succesfully added your email to the list.');
		promptFewEmail(list_id);
	})
	.catch(function(error) {
		console.log(error);
	});
}

// Prompts user if he/she wants to load default json data or input data manually for other emails.
function promptFewEmail(list_id) {
	var answer;
	prompt.start();
	prompt.get([{
		name: 'answer',
		description: 'Do you want to load default json data for other Emails? Y/N',
		message: "Invalid input.",
		required: true,
		conform: function(value) {
			if(value.includes("y")) {
				return true;
			}if(value.includes("n")) {
				return true;
			}else {
				return false;
			}
		}
	}], function(err, result) {
		answer = result.answer;
		if(result.answer.includes("y")) {
			console.log("Yes");
			addFewEmail(list_id, fewEmailObject, answer);
		}if(result.answer.includes("n")) {
			console.log("No");
			inputFewEmail(list_id, answer)
		}
	});
}

// Prompts the user to input information of the member that will be added to the list.
function inputFewEmail(list_id, answer) {
	prompt.start();
	prompt.get([{
		name: 'email_address',
		description: 'Email Address',
		message: "Invalid input.",
		required: true,
		conform: function(value) {
			if(value) {
				return true;
			}else {
				return false;
			}
		}
	},{
		name: 'FNAME',
		description: 'First Name',
		message: "Invalid input.",
		required: true,
		conform: function(value) {
			if(value) {
				return true;
			}else {
				return false;
			}
		}
	},{
		name: 'LNAME',
		description: 'Last Name',
		message: "Invalid input.",
		required: true,
		conform: function(value) {
			if(value) {
				return true;
			}else {
				return false;
			}
		}
	}], function(err, result) {
		var inputObject = {
			email_address: result.email_address,
			status_if_new: "subscribed",
			merge_fields: {
				FNAME: result.FNAME,
				LNAME: result.LNAME
			}
		}
		addFewEmail(list_id, inputObject, answer);
	});
}

// Add some few valid emails to the list.
function addFewEmail(list_id, object, answer) {
	/*
		If the answer is yes, the script loads the default json data of few-email.json and all members will be added to the list.
	*/
	if(answer.includes("y")) {
		var req;
		object.forEach(function(element, index) {
			var hashed_email = crypto.createHash('md5').update(element.email_address.toLowerCase()).digest("hex");
			req = axios({
				method: 'put',
				url: url + '/lists/' + list_id + '/members/' + hashed_email,
				headers: { 
					'Cache-Control': 'no-cache',
					Authorization: 'Bearer ' + accessToken,
					'Content-Type': 'application/json'
				},
			    data: {
			    	email_address: element.email_address,
			    	status_if_new: element.status_if_new,
			    	merge_fields: element.merge_fields
			    }
			})
			.then(function(response) {
				console.log('Succesfully added ' + element.email_address + ' to the list.');
			})
			.catch(function(error) {
				console.log(error);
			});
		});

		req.then(function() {
			createSegment(list_id);
		});
	}else
	/*
		If the answer is no, the user is required to input data of members. After successful input of data,
		the user will be asked if he/she wants to add more members to the list.
	*/
	if(answer.includes("n")) {
		var hashed_email = crypto.createHash('md5').update(object.email_address.toLowerCase()).digest("hex");
		axios({
			method: 'put',
			url: url + '/lists/' + list_id + '/members/' + hashed_email,
			headers: { 
				'Cache-Control': 'no-cache',
				Authorization: 'Bearer ' + accessToken,
				'Content-Type': 'application/json'
			},
		    data: object
		})
		.then(function(response) {
			console.log('Succesfully added ' + object.email_address + ' to the list.');
			prompt.start();
			prompt.get([{
				name: 'answer',
				description: 'Do you want to add more Members to the List? Y/N',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value.includes("y")) {
						return true;
					}if(value.includes("n")) {
						return true;
					}else {
						return false;
					}
				}
			}], function(err, result) {
				if(result.answer.includes("y")) {
					console.log("Yes");
					inputFewEmail(list_id, answer);
				}if(result.answer.includes("n")) {
					console.log("No");
					createSegment(list_id);
				}
			});
		})
		.catch(function(error) {
			console.log(error);
		});
	}
}

/*
	Create a default segment for the list to be used by the campaign.
	
	I get an error when sending a generated campaign which is a "Your advanced segment is empty." error.

	The default solution for this type of error is to manually refresh the list via browser.

	That is why I've decided to generate a default segment using the MailChimp API and add
	it to the campaign programmatically.
*/ 
function createSegment(list_id) {
	axios({
		method: 'post',
		url: url + '/lists/' + list_id + '/segments',
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
	    data: {
	    	name: "Default Segment",
	    	options: {
	    		match: "any",
	    		conditions: [{
	    			field: "timestamp_opt", 
	    			op: "greater", 
	    			value: "last"
	    		}]
	    	}
	    }
	})
	.then(function(response) {
		console.log('Succesfully created a new segment with an ID#: ' + response.data.id + ' with a count of ' + response.data.member_count + ' recipient/s');
		promptCampaign(list_id, response.data.id);
	})
	.catch(function(error) {
		console.log(error.data.errors);
	});
}

// Prompts user if he/she wants to load default json data or inpit data manually for the campaign.
function promptCampaign(list_id, segment_id) {
	prompt.start();
	prompt.get([{
		name: 'answer',
		description: 'Do you want to load default json data for the new Campaign? Y/N',
		message: "Invalid input.",
		required: true,
		conform: function(value) {
			if(value.includes("y")) {
				return true;
			}if(value.includes("n")) {
				return true;
			}else {
				return false;
			}
		}
	}], function(err, result) {
		if(result.answer.includes("y")) {
			console.log("Yes");
			createCampaign(list_id, segment_id, campaignObject);
		}if(result.answer.includes("n")) {
			console.log("No");
			prompt.start();
			prompt.get([{
				name: 'subject_line',
				description: 'Subject',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			},{
				name: 'preview_text',
				description: 'Preview Text',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			},{
				name: 'title',
				description: 'Title',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			},{
				name: 'from_name',
				description: 'From Name',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			},{
				name: 'reply_to',
				description: 'Reply To',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}
				}
			}], function(err, result) {
				var inputObject = {
					settings: {
						subject_line: result.subject_line,
						preview_text: result.preview_text,
						title: result.title,
						from_name: result.from_name,
						reply_to: result.reply_to
					}
				}
				createCampaign(list_id, segment_id, inputObject);
			});
		}
	});
}

// Create a campaign for a specific list.
function createCampaign(list_id, segment_id, object) {
	object.type = "regular";
	object.winner_criteria = "clicks";
	object.recipients = {};
	object.recipients.list_id = list_id;
	object.recipients.segment_opts = {};
	object.recipients.segment_opts.saved_segment_id = segment_id;
	axios({
		method: 'post',
		url: url + '/campaigns',
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
	    data: object
	})
	.then(function(response) {
		console.log('Succesfully created a new campaign with an ID#: ' + response.data.id);
		updateCampaignContent(response.data.id);
	})
	.catch(function(error) {
		console.log(error);
	});
}

// Update the content of the created campaign.
function updateCampaignContent(campaign_id) {
	axios({
		method: 'put',
		url: url + '/campaigns/' + campaign_id + '/content',
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
	    data: {
	    	html: ` <img src="https://cdn.foodbeast.com/wp-content/uploads/2017/07/krabby-patty.jpg" alt="crabby-patty-image" width="300px" height="250px">
                    <ul style="list-style:none;"><h2>List Of Ingredients:</h2>
	                      <li>Buns</li>
	                      <li>Patty</li>
	                      <li>Tomato</li>
	                      <li>Lettuce</li>
	                      <li>Ketchup</li>
                  	</ul>`
	    }
	})
	.then(function(response) {
		console.log('Succesfully updated campaign contents.');
		checkCampaign(campaign_id);
	})
	.catch(function(error) {
		console.log(error);
	});
}

// Checks if campaign is ready to be sent to the recipients.
function checkCampaign(campaign_id) {
	axios({
		method: 'get',
		url: url + '/campaigns/' + campaign_id + '/send-checklist',
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		}
	})
	.then(function(response) {
		if(response.data.is_ready) {
			console.log('The campaign is ready to be sent. :)');
			prompt.start();
			prompt.get([{
				name: 'answer',
				description: 'Do you want to send Campaign (o_O)? Y/N',
				message: "Invalid input.",
				required: true,
				conform: function(value) {
					if(value) {
						return true;
					}else {
						return false;
					}d
				}
			}], function(err, result) {
				if(result.answer.includes("y")) {
					sendCampaign(campaign_id);
				}
			});
		}else {
			console.log('The campaign is not ready to be sent. :(');
		}
	})
	.catch(function(error) {
		console.log(error);
	});
}

// Send created campaign to all recipients.
function sendCampaign(campaign_id) {
	axios({
		method: 'post',
		url: url + '/campaigns/' + campaign_id + '/actions/send',
		headers: { 
			'Cache-Control': 'no-cache',
			Authorization: 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		}
	})
	.then(function(response) {
		console.log('Succesfully sent the campaign to all recipients.');
	})
	.catch(function(error) {
		console.log(error);
	});
}