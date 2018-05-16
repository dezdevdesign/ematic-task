# MailChimp API Scripts
A simple MailChimp API script.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
nodejs v8.x
```

### Installing

The first step to run the script properly is do these steps.
After installing nodejs, run the command:
```
npm install
```

Then change the credentials on the file:
```
config.json.example
```
After changing the credentials, remove the .example on the file name.

You can now run the script by executing the command:
```
nodejs app or nodejs app.js
```

After executing the command, you are going to answer some prompts and this will how it will look like.

```
nodejs app
prompt: Do you want to load default json data for the List? Y/N:  y
Yes
Succesfully created list with an ID#: 6070a8525d
prompt: Do you want to load default json data for your Email? Y/N:  y
Yes
Succesfully added your email to the list.
prompt: Do you want to load default json data for other Emails? Y/N:  y
Yes
Succesfully added karen02@gmail.com to the list.
Succesfully added jerome02@gmail.com to the list.
Succesfully added beverly02@gmail.com to the list.
Succesfully added ralph02@gmail.com to the list.
Succesfully added kimberly02@gmail.com to the list.
Succesfully created a new segment with an ID#: 1203 with a count of 6 recipient/s
prompt: Do you want to load default json data for the new Campaign? Y/N:  y
Yes
Succesfully created a new campaign with an ID#: 3e740fcedb
Succesfully updated campaign contents.
The campaign is ready to be sent. :)
prompt: Do you want to send Campaign (o_O)? Y/N:  y
Succesfully sent the campaign to all recipients.
```


## Authors

* **Edwin Melendez** - *Initial work* - [dezdevdesign](https://github.com/dezdevdesign)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
