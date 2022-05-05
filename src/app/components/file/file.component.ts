import { IFolder, IFile } from "./../shared/interface";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
})
export class FileComponent implements OnInit {
  @Input()
  fileName?: string;
  @Input()
  set selectedFolder(value: IFolder | undefined) {
    this._selectedFolder = value;
    this.searchInput$.next("");
  }
  get selectedFolder(): IFolder | undefined {
    return this._selectedFolder;
  }

  private _selectedFolder?: IFolder;

  @Output()
  saveData = new EventEmitter<null>();

  searchInput$ = new BehaviorSubject<string>("");

  constructor() {}

  ngOnInit(): void {
    this.searchInput$
      .pipe(debounceTime(250))
      .subscribe((value) => console.log(value));
  }

  filteredFiles$ = this.searchInput$.pipe(
    debounceTime(250),
    map((searchInput: string) => {
      if (!this.selectedFolder) {
        return [];
      }
      if (searchInput === "") {
        console.log(searchInput);
        return this.selectedFolder.files;
      }
      return this.selectedFolder.files.filter((file: IFile) =>
        file.name.includes(searchInput)
      );
    })
  );

  onSearchInputChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      const newValue = target.value;
      this.searchInput$.next(newValue);
    }
  }

  onDeleteFile(index: number) {
    this.selectedFolder?.files.splice(index, 1);
    this.saveData.emit(null);
  }
}
