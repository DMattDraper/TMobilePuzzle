import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks,
  removeFromReadingList,
  getReadingList
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];

  userInput: string;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
    const snackBarRef = this.snackBar.open('Added ' + book.title + ' to reading list', 'Undo', { duration : 3000 });
    
    snackBarRef.onAction().subscribe(() => {
      this.undoAdd(book);
    });
  }

  undoAdd(book: Book){
    const readingList = this.store.select(getReadingList);
    
    readingList.subscribe({
      next: x => { 
        for(let i = 0; i < x.length; i++){
          if(x[i].title === book.title){
            const item = x[i];
            this.store.dispatch(removeFromReadingList({ item }));
          }
        } 
      }
    });
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    // if (this.searchForm.value.term) {
    //   this.store.dispatch(searchBooks({ term: this.searchTerm }));
    // } else {
    //   this.store.dispatch(clearSearch());
    // }
    this.store.dispatch(searchBooks({term: this.userInput}));
  }
}