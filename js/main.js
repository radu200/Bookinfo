$(document).ready(() => {
  $('#searchForm').on('submit ', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();

  });
});

function getMovies(searchText){
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
            <a onclick="bookSelected('${book.id}')" class="btn btn-primary" href="#">Book Details</a>
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
function bookSelected(id){
  sessionStorage.setItem('bookId', id);
  window.location = 'book.html';
  return false;
  
}

function getBook(){
  let bookId = sessionStorage.getItem('bookId');
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