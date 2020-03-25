const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//middleware1
// app.use(function(req, res, next){
//     console.log('middleware 1 called');
//     next();
// });

//middleware2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();
// });


//List of contacts
var contactList = [
    {
        name: "Eldhose",
        phone: "738318389"
    },
    {
        name: "Tony Stark",
        phone: "173982213"
    },
    {
        name: "Steve Rogers",
        phone: "918391023"
    }
]




app.get('/', function(req, res){
    
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }

        return res.render('home', {
            title: "My Contact List",
            contact_list: contacts
        });

    });
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('********', newContact);
        return res.redirect('back');
    });

});

app.get('/delete-contact/', function(req, res){
    //get the id from query in the url
    let id = req.query.id;

    //Find the contact in the database using id and delete
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    
});


app.listen(port, function(err){
    if(err){
        console.log("Error in running the server", err);
        return;
    }
    console.log("Express server is running on port:", port);
});