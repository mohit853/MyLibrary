const express = require('express')
const router = express.Router()
const Author= require('../models/author')


// all authors 
router.get('/',async function(req,res){
  let searchOptions ;
  if(req.query.name !=null && req.query.name != ''){
    searchOptions = new RegExp(req.query.name ,'i')
  }
  
  try{
    const authors = await Author.find({name : searchOptions})
    
    res.render('authors/index',
    { 
      authors : authors,
      searchOptions : req.query
    })
  }catch{
    res.redirect('/')
  }
    
})

// display form of author
router.get('/new',function(req,res){
    return res.render('authors/new',{author : new Author()})
})

//create new author
router.post('/', async (req, res) => {
    const author = new Author({
      name: req.body.name
    })
    try {
      const newAuthor = await author.save()
      // res.redirect(`authors/${newAuthor.id}`)
      res.redirect(`authors`)
    } catch {
      res.render('authors/new', {
        author: author,
        errorMessage: 'Error creating Author'
      })
    }
  })



module.exports=router