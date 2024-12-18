import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    loginUrl = environment.api_url + '/api/login';

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(this.loginUrl, {username, password}).pipe(
            map(response => {
                return response.body;
            })
        );
    }

}