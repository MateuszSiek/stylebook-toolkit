import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public browsers: string[] = ['Firefox', 'Chrome', 'Opera', 'Safari'];
    public cars: string[] = ['Volvo', 'Saab', 'BMW', 'Audi'];
}
