import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  sorted_arrays: number[][];
  time_ns: number;
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent {
  @Input() apiUrl: string = ""; // Input property for API URL
  inputArrays: number[][] = [[3, 54, 56, 24, 36], [7, 5, 5, 6], [7, 23, 9]];
  sortedArrays: number[][] = [];
  timeNs: number = 0;

  constructor(private http: HttpClient) { }

  sortArrays() {
    const requestBody = { to_sort: this.inputArrays };

    this.http.post<ApiResponse>(this.apiUrl, requestBody).subscribe(
      (response) => {
        this.sortedArrays = response.sorted_arrays;
        this.timeNs = response.time_ns;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
