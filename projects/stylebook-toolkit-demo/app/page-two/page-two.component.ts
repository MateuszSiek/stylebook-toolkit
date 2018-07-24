import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-two',
    templateUrl: './page-two.component.html',
    styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent {
    public browsers: string[] = ['Firefox', 'Chrome', 'Opera', 'Safari'];
    public cars: string[] = ['Volvo', 'Saab', 'BMW', 'Audi'];
}
