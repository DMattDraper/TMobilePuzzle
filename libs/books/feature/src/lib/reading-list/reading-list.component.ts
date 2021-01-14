import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList, addToReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    let snackBarRef = this.snackBar.open('Removed ' + item.title + ' from reading list', 'Undo', { duration : 3000 });

    snackBarRef.onAction().subscribe(() => {
      this.undoRemove(item);
    });
  }

  undoRemove(book: Book){
    this.store.dispatch(addToReadingList({ book }));
  }
}
