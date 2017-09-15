$(document).ready(() => {
  $('#searchForm').on('submit ', (e) => {
    let searchText = $('#searchText').val();
    getBooks(searchText);
    e.preventDefault();

  });
});

function getBooks(searchText){
 axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchText}`)
 .then((response) => {
      let books = response.data.items;
      let output ='';
      $.each(books, (index, book) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${book.volumeInfo.imageLinks.thumbnail}">
               <h6>${book.volumeInfo.authors}</h6>
            <a class="btn btn-primary" href="book.html?bookId=${book.id}">Book Details</a>
               </div>
          </div>
        `
      });

      $('#books').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}


  function getQueryVariable(variable)
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
     }


function getBook(){
  let bookId = getQueryVariable('bookId');
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`)
    .then((response) => {
      //console.log(response);
      let books = response.data.items;
    $.each(books, (index, book) => {
      let output =`
        <div class="row">
          <div class="col-md-4">
        <img src="${book.volumeInfo.imageLinks.thumbnail}">
          </div>
          <div class="col-md-8">
            <h4>${book.volumeInfo.title}</h4>
            <ul class="list-group">
              <li class="list-group-item"><strong>Author: </strong>${book.volumeInfo.authors} </li>
             <li class="list-group-item"><strong>Category: </strong>${book.volumeInfo.categories} </li>
             <li class="list-group-item"><strong>Publisher: </strong>${book.volumeInfo.publisher}, ${book.volumeInfo.publishedDate}  </li>
             <li class="list-group-item"><strong>langauge: </strong>${book.volumeInfo.language} </li>
             <li class="list-group-item"><strong>PageCount: </strong>${book.volumeInfo.pageCount} </li>

            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Description</h3>
            ${book.volumeInfo.description}
            <hr>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
            
          </div>
        </div>
      `
      $('#book').html(output);
    });
    })
    .catch((err) => {
      console.log(err);
    });
}